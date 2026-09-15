import { useState } from 'react';

export default function AddItemModal({ type, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [years, setYears] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    if (type === 'character') {
      onAdd({ name, description, years, images: [] });
    } else {
      onAdd({ name, description, images: [] });
    }
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold text-white mb-4">
          + Add {type === 'character' ? 'Character' : 'Item'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
              placeholder={type === 'character' ? 'Dolores Klugel' : 'Turquoise Chair'}
              autoFocus
            />
          </div>
          
          {type === 'character' && (
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-1">Years</label>
              <input
                type="text"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2"
                placeholder="1927-2026"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 h-24"
              placeholder={type === 'character' ? 'Rocketdyne 1965-1968, Apollo Program' : 'Mid-century modern, star base'}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
