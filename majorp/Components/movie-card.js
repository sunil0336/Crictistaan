"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
import { Bookmark, Plus, Star } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { FaStar } from "react-icons/fa";
import { Badge } from "./ui/badge";

export default function MovieCardEnhanced({ movie, variant = "default" }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter(); // Initialize router

  const toggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Function to handle movie click and navigate to movie details page
  const handleMovieClick = () => {
    router.push(`/movies/${movie._id}`); // Pass movie ID in URL
  };

  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-purple-800/50 hover:bg-purple-800 transition-all"
      onClick={handleMovieClick} // Navigate when clicked
    >
      <div className="aspect-[2/3] relative">
        <img
          src={movie.image || "/placeholder.svg"}
          alt={movie.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 flex flex-col justify-end z-10 transition-opacity duration-200">
            <h3 className="font-medium text-white text-lg">{movie.title}</h3>
            <div className="flex items-center mt-1 mb-2">
              <div className="flex items-center">
                <FaStar size={14} className="text-[#f5c518] fill-[#f5c518]" />
                <span className="ml-1 text-sm">{movie.rating}</span>
              </div>
              <span className="mx-2 text-xs">•</span>
              <span className="text-sm">{movie.year}</span>
            </div>
            <p className="text-sm text-gray-200 line-clamp-3">{movie.description}</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm">{movie.rating}</span>
          </div>
          <div className="flex flex-col text-xs text-purple-200">
            {movie.genre && <span>{movie.genre}</span>}
            {movie.language && <span>{movie.language}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
