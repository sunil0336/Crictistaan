"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="search"
        placeholder="Search for movies, TV shows, actors..."
        className="bg-purple-800 text-white rounded-full py-1 pl-9 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder:text-purple-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />

      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <Button
        type="submit"
        size="sm"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full bg-yellow-500 text-black hover:bg-yellow-600"
      >
        <Search className="w-4 h-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

