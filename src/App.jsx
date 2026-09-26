import { useState, useCallback } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useStoryStorage, exportJSON, exportEDL } from './hooks/useStoryStorage';
import ActColumn from './components/ActColumn';
import FilterBar from './components/FilterBar';
import ExpandedFrame from './components/ExpandedFrame';
import Slideshow from './components/Slideshow';
import CharacterBox from './components/CharacterBox';
import ItemBox from './components/ItemBox';
import AddItemModal from './components/AddItemModal';

export default function App() {
  const { story, setStory, updateFrame, deleteFrame, deleteAct, insertFrame, insertAct, reorderFrames, getProgress } = useStoryStorage();
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedAct, setSelectedAct] = useState(null);
  const [statusFilter, setStatusFilter] = useState(['PENDING', 'COPIED', 'GENERATED', 'SHARED']);
  const [platformFilter, setPlatformFilter] = useState([]);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [expandedActs, setExpandedActs] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState(null);
  const [characterItemExpanded, setCharacterItemExpanded] = useState(false);
  
  const progress = getProgress();
  
  const toggleActExpanded = (actNum) => {
    setExpandedActs(prev => ({ ...prev, [actNum]: !prev[actNum] }));
  };
  
  const handleStatusChange = useCallback((actNum, frameNum, updates, frameSubNum = null) => {
    updateFrame(actNum, frameNum, updates, frameSubNum);
  }, [updateFrame]);
  
  const handleFrameClick = (frame, actNum) => {
    setSelectedFrame(frame);
    setSelectedAct(actNum);
  };
  
  const handleCloseExpanded = () => {
    setSelectedFrame(null);
    setSelectedAct(null);
  };
  
  const handleUpdateFrame = (actNum, frameNum, updates, frameSubNum = null) => {
    updateFrame(actNum, frameNum, updates, frameSubNum);
    setSelectedFrame(prev => prev ? { ...prev, ...updates } : null);
  };
  
  const handleStoryNameChange = (name) => {
    setStory(prev => ({ ...prev, name }));
  };
  
  const handleAddCharacter = (character) => {
    setStory(prev => ({
      ...prev,
      characters: [...(prev.characters || []), { ...character, id: `char-${Date.now()}` }]
    }));
  };
  
  const handleAddItem = (item) => {
    setStory(prev => ({
      ...prev,
      items: [...(prev.items || []), { ...item, id: `item-${Date.now()}` }]
    }));
  };
  
  // Filter frames
  const filteredActs = story.acts.map(act => ({
    ...act,
    frames: act.frames.filter(frame => {
      if (statusFilter.length && !statusFilter.includes(frame.status)) return false;
      if (frame.status === 'SHARED' && platformFilter.length) {
        const hasPlatform = frame.sharedLinks?.some(l => platformFilter.includes(l.platform));
        if (!hasPlatform) return false;
      }
      return true;
    })
  })).filter(act => act.frames.length > 0);
  
  // Export functions
  const handleExportJSON = () => {
    const blob = new Blob([exportJSON(story)], { type: 'application/json' });
    saveAs(blob, `${story.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`);
  };
  
  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.name && imported.acts) {
          setStory(imported);
          alert(`Imported "${imported.name}" successfully!`);
        } else {
          alert('Invalid storyboard file format');
        }
      } catch (err) {
        alert('Error reading file: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };
  
  const handleExportEDL = () => {
    const blob = new Blob([exportEDL(story)], { type: 'text/plain' });
    saveAs(blob, `${story.name.replace(/\s+/g, '-').toLowerCase()}.edl`);
  };
  
  const handleExportZIP = async () => {
    const zip = new JSZip();
    zip.file('project.json', exportJSON(story));
    
    const assets = zip.folder('assets');
    
    // Collect all image data promises
    const imagePromises = [];
    
    story.acts.forEach(act => {
      act.frames.forEach(frame => {
        if (frame.imageUrl) {
          if (frame.imageUrl.startsWith('data:')) {
            const base64Data = frame.imageUrl.split(',')[1];
            const binary = atob(base64Data);
            const array = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              array[i] = binary.charCodeAt(i);
            }
            assets.file(frame.filename || `frame-${act.actNum}-${frame.frameNum}.png`, array);
          } else if (frame.imageUrl.startsWith('blob:')) {
            // Add promise to array - will resolve with blob data
            imagePromises.push(
              fetch(frame.imageUrl)
                .then(res => res.blob())
                .then(blob => {
                  assets.file(frame.filename || `frame-${act.actNum}-${frame.frameNum}.png`, blob);
                })
                .catch(err => console.warn('Failed to fetch blob image:', err))
            );
          }
        }
      });
    });
    
    // Wait for all blob fetches to complete before generating zip
    if (imagePromises.length > 0) {
      await Promise.all(imagePromises);
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${story.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.zip`);
  };
  
  const openAddModal = (type) => {
    setAddModalType(type);
    setShowAddModal(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">🎬 Storyboard App</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSlideshow(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ▶ Preview
            </button>
            <button
              onClick={insertAct}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              + Add ACT
            </button>
            <div className="relative group">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Export ▼
              </button>
              <div className="absolute right-0 mt-1 w-40 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block z-10">
                <button
                  onClick={handleExportJSON}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-200"
                >
                  📄 Export JSON
                </button>
                <button
                  onClick={handleExportEDL}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-200"
                >
                  🎞️ Export EDL
                </button>
                <button
                  onClick={handleExportZIP}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-200"
                >
                  📦 Export ZIP
                </button>
                <button
                  onClick={() => {
                    if (confirm('Reset all data? This will clear localStorage and reload defaults.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                >
                  🔄 Reset Data
                </button>
              </div>
            </div>
            <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer">
              📂 Import
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>
        
        {/* Filter Bar */}
        <FilterBar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          platformFilter={platformFilter}
          onPlatformFilterChange={setPlatformFilter}
          progress={progress}
          storyName={story.name}
          onStoryNameChange={handleStoryNameChange}
        />
        
        {/* Character & Item Section - Collapsible */}
        {(story.characters?.length > 0 || story.items?.length > 0) && (
          <div className="mb-4">
            <button
              onClick={() => setCharacterItemExpanded(!characterItemExpanded)}
              className="text-gray-400 text-sm mb-2 flex items-center gap-1 hover:text-white"
            >
              {characterItemExpanded ? '▼' : '▶'} Characters & Items
            </button>
            
            {characterItemExpanded && (
              <>
                <div className="flex gap-4 mb-2">
                  {story.characters?.length > 0 && (
                    <CharacterBox characters={story.characters} />
                  )}
                  {story.items?.length > 0 && (
                    <ItemBox items={story.items} />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openAddModal('character')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    + Add Character
                  </button>
                  <button
                    onClick={() => openAddModal('item')}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    + Add Item
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* ACT Columns with Expandable Summaries */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {filteredActs.map(act => (
            <ActColumn
              key={act.actNum}
              act={act}
              isExpanded={expandedActs[act.actNum]}
              onToggleExpand={() => toggleActExpanded(act.actNum)}
              onFrameClick={(frame) => handleFrameClick(frame, act.actNum)}
              onStatusChange={handleStatusChange}
              onDeleteFrame={(actNum, frameNum, frameSubNum) => deleteFrame(actNum, frameNum, frameSubNum)}
              onDeleteAct={(actNum) => deleteAct(actNum)}
              onAddFrame={(actNum) => insertFrame(actNum)}
              onReorderFrames={(actNum, fromIndex, toIndex) => reorderFrames(actNum, fromIndex, toIndex)}
            />
          ))}
        </div>
        
        {/* Expanded Frame Modal */}
        {selectedFrame && selectedAct && (
          <ExpandedFrame
            frame={selectedFrame}
            actNum={selectedAct}
            onClose={handleCloseExpanded}
            onUpdate={handleUpdateFrame}
            onDelete={(actNum, frameNum, frameSubNum) => {
              deleteFrame(actNum, frameNum, frameSubNum);
              handleCloseExpanded();
            }}
          />
        )}
        
        {/* Slideshow */}
        <Slideshow
          story={story}
          isOpen={showSlideshow}
          onClose={() => setShowSlideshow(false)}
        />
        
        {/* Add Modal */}
        {showAddModal && (
          <AddItemModal
            type={addModalType}
            onClose={() => setShowAddModal(false)}
            onAdd={addModalType === 'character' ? handleAddCharacter : handleAddItem}
          />
        )}
      </div>
    </div>
  );
}
