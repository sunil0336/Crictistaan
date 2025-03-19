"use client"

import { useState } from "react"
import { ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function ReviewFilter({ onFilterChange }) {
  const [sortBy, setSortBy] = useState("featured")
  const [ratingFilter, setRatingFilter] = useState(3)
  const [hideSpoilers, setHideSpoilers] = useState(false)

  const handleSortChange = (value) => {
    setSortBy(value)
    if (onFilterChange) {
      onFilterChange({ sortBy: value, ratingFilter, hideSpoilers })
    }
  }

  const handleRatingChange = (value) => {
    setRatingFilter(value)
    if (onFilterChange) {
      onFilterChange({ sortBy, ratingFilter: value, hideSpoilers })
    }
  }

  const handleSpoilerChange = (e) => {
    setHideSpoilers(e.target.checked)
    if (onFilterChange) {
      onFilterChange({ sortBy, ratingFilter, hideSpoilers: e.target.checked })
    }
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-black/40 border-none text-white hover:bg-black/60">
            <span>Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-purple-950 border-purple-800 text-white">
          <DropdownMenuItem onClick={() => handleSortChange("featured")} className="hover:bg-purple-900 cursor-pointer">
            Featured
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("newest")} className="hover:bg-purple-900 cursor-pointer">
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("highest")} className="hover:bg-purple-900 cursor-pointer">
            Highest Rating
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("lowest")} className="hover:bg-purple-900 cursor-pointer">
            Lowest Rating
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-black/40 border-none text-white hover:bg-black/60">
            <span className="mr-2">Rating:</span>
            <div className="flex">
              {[...Array(ratingFilter)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-purple-950 border-purple-800 text-white">
          {[1, 2, 3, 4, 5].map((stars) => (
            <DropdownMenuItem
              key={stars}
              onClick={() => handleRatingChange(stars)}
              className="hover:bg-purple-900 cursor-pointer"
            >
              <div className="flex">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="ml-2">& Up</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hide-spoilers"
          checked={hideSpoilers}
          onChange={handleSpoilerChange}
          className="rounded bg-transparent border-gray-600"
        />
        <label htmlFor="hide-spoilers" className="text-sm">
          Hide Spoilers
        </label>
      </div>
    </div>
  )
}

