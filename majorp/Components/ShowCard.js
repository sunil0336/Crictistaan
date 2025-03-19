import { useState } from 'react'
import { FaPlus, FaCheck, FaStar } from 'react-icons/fa' // Example, replace with actual icon imports

function ShowCard({ show, isAdded, onAddShow }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-gradient-to-b from-[#2e0854] to-[#1a0836] transition-transform hover:scale-[1.02] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add button */}
      <button
        className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center ${isAdded ? "bg-[#f5c518] text-black" : "bg-[#1a1a1a]/70 text-white"} rounded-md z-20 transition-colors`}
        onClick={(e) => {
          e.stopPropagation()
          onAddShow()
        }}
      >
        {isAdded ? <FaCheck size={16} /> : <FaPlus size={16} />}
      </button>

      {/* Poster Image */}
      <div className="aspect-[2/3] bg-[#1a1a1a]/50 relative">
      <img src={show.image || "@/public/Componentsl/placeholder.svg"} alt={show.title} className="object-cover" />


        {/* Description Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 flex flex-col justify-end z-10 transition-opacity duration-200">
            <h3 className="font-medium text-white text-lg">{show.title}</h3>
            <div className="flex items-center mt-1 mb-2">
              <div className="flex items-center">
                <FaStar size={14} className="text-[#f5c518] fill-[#f5c518]" />
                <span className="ml-1 text-sm">{show.rating}</span>
              </div>
              <span className="mx-2 text-xs">•</span>
              <span className="text-sm">{show.year}</span>
            </div>
            <p className="text-sm text-gray-200 line-clamp-3">{show.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {show.platforms.map((platform) => (
                <span key={platform} className="text-xs px-1.5 py-0.5 bg-[#1a1a1a]/70 rounded-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-white mb-1">{show.title}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-0.5 rounded-sm bg-[#1a1a1a]/50 text-[#dfdfdf]">{show.genre}</span>
          <span className="text-xs px-2 py-0.5 rounded-sm bg-[#1a1a1a]/50 text-[#dfdfdf]">{show.language}</span>
        </div>
      </div>
    </div>
  )
}

export default ShowCard
