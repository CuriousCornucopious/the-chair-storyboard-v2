import React, { useState } from 'react';
import FrameCard from './FrameCard';

export default function ActColumn({ 
  act, 
  onFrameClick, 
  onStatusChange, 
  onAddFrame,
  onDeleteFrame,
  onDeleteAct,
  onReorderFrames,
  isExpanded,
  onToggleExpand
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const generatedCount = act.frames.filter(f => f.status !== 'PENDING').length;
  const totalCount = act.frames.length;
  
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      onReorderFrames(act.actNum, draggedIndex, toIndex);
    }
    setDraggedIndex(null);
  };
  
  return (
    <div className={`flex flex-col ${isExpanded ? 'w-96' : 'w-72'} transition-all duration-300`}>
      {/* Act Header - Clickable for summary toggle */}
      <div 
        onClick={onToggleExpand}
        className="bg-gray-800 rounded-t-lg p-4 cursor-pointer hover:bg-gray-750 transition-colors"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">ACT {act.actNum}: {act.actTitle}</h3>
            <p className="text-xs text-gray-400">{generatedCount}/{totalCount} frames</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete Act ${act.actNum}? This will remove all ${act.frames.length} frames.`)) {
                  onDeleteAct(act.actNum);
                }
              }}
              className="text-red-400 hover:text-red-300 text-xs"
              title="Delete Act"
            >
              🗑️
            </button>
            <span className="text-gray-400 text-xl">
              {isExpanded ? '▼' : '▶'}
            </span>
          </div>
        </div>
        
        {/* Summary - shown when expanded */}
        {isExpanded && act.summary && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-300 italic">{act.summary}</p>
            {act.mood && (
              <p className="text-xs text-purple-400 mt-2">🎭 {act.mood}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Frames List */}
      <div 
        className={`bg-gray-900 rounded-b-lg p-3 overflow-y-auto ${isExpanded ? 'max-h-[600px]' : 'max-h-[200px]'}`}
        onDragOver={(e) => e.preventDefault()}
      >
        {act.frames.map((frame, idx) => (
          <div 
            key={`${frame.frameNum}-${frame.frameSubNum || idx}`} 
            className="mb-3"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDrop={(e) => handleDrop(e, idx)}
            style={{ opacity: draggedIndex === idx ? 0.5 : 1 }}
          >
            <FrameCard 
              frame={frame} 
              actNum={act.actNum}
              onClick={onFrameClick}
              onStatusChange={onStatusChange}
              onDelete={() => {
                if (confirm(`Delete "${frame.title}"?`)) {
                  onDeleteFrame(act.actNum, frame.frameNum, frame.frameSubNum || null);
                }
              }}
            />
          </div>
        ))}
        
        <button
          onClick={() => onAddFrame(act.actNum)}
          className="w-full py-2 border-2 border-dashed border-gray-700 rounded-lg text-gray-500 hover:border-gray-500 hover:text-gray-400 transition-colors"
        >
          + Add Frame
        </button>
      </div>
    </div>
  );
}
