"use client"

import { useState } from "react"
import Image from "next/image"
import { Bookmark, Plus, Star } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { FaStar } from "react-icons/fa"
import { Badge } from "./ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import MovieRating from "./movie-rating";

export default function MovieCardEnhanced({ movie, variant = "default" }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)


  const toggleBookmark = (e) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer rounded-xl overflow-hidden bg-purple-800/50 hover:bg-purple-800 transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* <div className={cn("relative", variant === "poster" ? "aspect-[2/3]" : "aspect-video")}> */}
          <div className="aspect-[2/3] relative">
          <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">

              {isHovered && (
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
                  <div className="mt-2 flex flex-wrap gap-1">
                    {movie.platforms.map((platform) => (
                                <span key={platform} className="text-xs px-1.5 py-0.5 bg-[#1a1a1a]/70 rounded-sm">
                                  {platform}
                                </span>
                              ))}
                  </div>
                </div>
              )}
            </div>

            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={toggleBookmark}
                className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <Bookmark className={cn("w-4 h-4", isBookmarked ? "text-yellow-400 fill-yellow-400" : "text-white")} />
              </button>
            </div>

            {movie.isNew && (
              <div className="absolute top-2 left-2">
                <Badge variant="default" className="bg-yellow-500 text-black">
                  New
                </Badge>
              </div>
            )}

            {variant === "default" && (
              <div className="absolute bottom-2 right-2">
                <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-none text-white">
                  {movie.duration || "2h 15m"}
                </Badge>
              </div>
            )}
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
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-purple-900 text-white border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-xl">{movie.title}</DialogTitle>
          <DialogDescription className="text-purple-200">
            {movie.genre} • {movie.language} • {movie.year || "2024"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 py-4">
          <div className="flex-shrink-0 w-1/3">
            <div className="aspect-[2/3] relative rounded-md overflow-hidden">
            <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="object-cover w-full" />

            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Rating</h4>
              <div className="flex items-center gap-2">
                <MovieRating initialRating={Math.floor(Number.parseFloat(movie.rating) / 2)} readOnly />
                <span className="text-sm">({movie.rating}/10)</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Overview</h4>
              <p className="text-sm text-purple-200">
                {movie.description || "No description available for this movie yet."}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Watch Trailer</Button>
              <Button variant="outline" className="border-white text-white hover:bg-purple-800">
                <Plus className="w-4 h-4 mr-1" /> Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



