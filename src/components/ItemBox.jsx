export default function ItemBox({ items }) {
  return (
    <div className="bg-gray-800 rounded-lg p-3 flex-1">
      <h3 className="text-teal-400 font-semibold mb-2">🎁 Items</h3>
      <div className="flex gap-2 overflow-x-auto">
        {items.map(item => (
          <div key={item.id} className="flex-shrink-0 bg-gray-700 rounded p-2 w-32">
            {item.images?.[0] && (
              <img 
                src={item.images[0]} 
                alt={item.name}
                className="w-full h-20 object-cover rounded mb-2"
              />
            )}
            <p className="text-white text-sm font-medium truncate">{item.name}</p>
            {item.description && (
              <p className="text-gray-400 text-xs truncate">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
