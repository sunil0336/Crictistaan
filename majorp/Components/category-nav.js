export default function CategoryNav() {
    const categories = ["Movies", "TV Shows", "Documentaries", "Anime"]
  
    return (
      <div className="flex items-center justify-center gap-6 py-4 border-t border-b border-purple-800 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`text-sm font-medium px-2 py-1 ${index === 0 ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white"}`}
          >
            {category}
          </button>
        ))}
      </div>
    )
  }
  
  