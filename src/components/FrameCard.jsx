import React from 'react';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const statusColors = {
  PENDING: { bg: '#888888', text: '#ffffff' },
  COPIED: { bg: '#007BFF', text: '#ffffff' },
  GENERATED: { bg: '#00D4AA', text: '#000000' },
  SHARED: { bg: '#9B59B6', text: '#ffffff' }
};

const promptStatusColors = {
  ready: { bg: '#22c55e', text: '#ffffff', label: 'READY' },
  draft: { bg: '#eab308', text: '#000000', label: 'DRAFT' },
  reference: { bg: '#3b82f6', text: '#ffffff', label: 'REF' }
};

const platformColors = {
  youtube: '#FF0000',
  tiktok: '#000000',
  facebook: '#1877F2',
  instagram: '#E1306C'
};

export default function FrameCard({ frame, actNum, onClick, onStatusChange, onDelete }) {
  const colors = statusColors[frame.status] || statusColors.PENDING;
  const promptColor = promptStatusColors[frame.promptStatus] || promptStatusColors.draft;
  
  const handleCopyPrompt = (e) => {
    e.stopPropagation();
    if (frame.prompt) {
      navigator.clipboard.writeText(frame.prompt);
      if (frame.status === 'PENDING') {
        onStatusChange(actNum, frame.frameNum, { status: 'COPIED' }, frame.frameSubNum || null);
      }
    }
  };

  const handleUpload = async (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      const filename = `frame-ACT${actNum}-frame${frame.frameNum}.png`;
      onStatusChange(actNum, frame.frameNum, { 
        status: 'GENERATED', 
        filename,
        imageUrl: base64 
      }, frame.frameSubNum || null);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  // Format frame number (handle sub-frames like 4.1, 4.2)
  const displayFrameNum = frame.frameSubNum 
    ? `${frame.frameNum}.${frame.frameSubNum}` 
    : frame.frameNum;

  return (
    <div 
      onClick={() => onClick(frame)}
      className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors border-2"
      style={{ borderColor: colors.bg }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-sm font-medium text-gray-200">{frame.title}</h4>
          <p className="text-xs text-gray-400">ACT {actNum} • Frame {displayFrameNum}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span 
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {frame.status}
          </span>
          <span 
            className="text-xs px-2 py-0.5 rounded-full font-medium text-center"
            style={{ backgroundColor: promptColor.bg, color: promptColor.text }}
          >
            {promptColor.label}
          </span>
        </div>
      </div>
      
      {frame.filename || frame.imageUrl ? (
        <div className="aspect-video bg-gray-900 rounded overflow-hidden">
          <img 
            src={frame.imageUrl || frame.filename} 
            alt={frame.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-900 rounded flex items-center justify-center">
          <span className="text-gray-600 text-sm">No image</span>
        </div>
      )}
      
      {frame.sharedLinks?.length > 0 && (
        <div className="flex gap-1 mt-2">
          {frame.sharedLinks.map((link, i) => (
            <span 
              key={i}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: platformColors[link.platform] || '#666' }}
            >
              {link.platform}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex gap-2 mt-2">
        <button 
          onClick={handleCopyPrompt}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          Copy Prompt
        </button>
        <label className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded cursor-pointer">
          Upload
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
        {onDelete && (
          <button 
            onClick={handleDeleteClick}
            className="text-xs bg-red-900 hover:bg-red-800 px-2 py-1 rounded ml-auto"
            title="Delete Frame"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
