export default function CharacterBox({ characters }) {
  return (
    <div className="bg-gray-800 rounded-lg p-3 flex-1">
      <h3 className="text-purple-400 font-semibold mb-2">👤 Characters</h3>
      <div className="flex gap-2 overflow-x-auto">
        {characters.map(char => (
          <div key={char.id} className="flex-shrink-0 bg-gray-700 rounded p-2 w-32">
            {char.images?.[0] && (
              <img 
                src={char.images[0]} 
                alt={char.name}
                className="w-full h-20 object-cover rounded mb-2"
              />
            )}
            <p className="text-white text-sm font-medium truncate">{char.name}</p>
            {char.years && (
              <p className="text-gray-400 text-xs">{char.years}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
