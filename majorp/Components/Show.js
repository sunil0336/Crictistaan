"use client"

import { useState } from "react";
import Image from "next/image";
import ShowsSection from "./ShowsSection";
import ShowCard from "./ShowCard";

import { ChevronLeft, ChevronRight, Plus, SlidersHorizontal, Check, ChevronDown, Star, Search } from "lucide-react"

export default function Home() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("tv-shows")

  // State for added shows
  const [addedShows, setAddedShows] = useState([]);

  // State for filter categories
  const [categories, setCategories] = useState([
    { id: "genres", title: "Genres", isOpen: false },
    { id: "language", title: "Language", isOpen: false },
    { id: "release-year", title: "Release year", isOpen: false },
    { id: "rating", title: "Rating", isOpen: false },
    { id: "where-to-watch", title: "Where to watch", isOpen: false },
    { id: "keywords", title: "Keywords", isOpen: false },
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    genres: [],
    languages: [],
    yearRange: [1990, 2025],
    minRating: 0,
    platforms: [],
    searchKeyword: "",
  })

  // Critics Top Rated shows data
  const criticsTopRated = [
    {
      id: 1,
      title: "Breaking Bad",
      genre: "Action/Thriller",
      language: "English",
      image:
        "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
      description:
        "A high school chemistry teacher diagnosed with cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
      rating: 9.5,
      year: 2008,
      platforms: ["Netflix", "Amazon Prime"],
    },
    {
      id: 2,
      title: "Game of Thrones",
      genre: "Action/Drama",
      language: "English",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      description:
        "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
      rating: 9.2,
      year: 2011,
      platforms: ["HBO Max", "Disney+"],
    },
    {
      id: 3,
      title: "Friends",
      genre: "Sitcom",
      language: "English",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      description:
        "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
      rating: 8.9,
      year: 1994,
      platforms: ["Netflix", "HBO Max"],
    },
    {
      id: 4,
      title: "Brooklyn 99",
      genre: "Sitcom",
      language: "English",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_.jpg",
      description:
        "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.",
      rating: 8.4,
      year: 2013,
      platforms: ["Netflix", "Hulu"],
    },
  ]

  // Indian Shows data
  const indianShows = [
    {
      id: 5,
      title: "Breaking Bad",
      genre: "Action/Thriller",
      language: "Hindi",
      image:
        "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
      description:
        "A high school chemistry teacher diagnosed with cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
      rating: 9.5,
      year: 2008,
      platforms: ["Netflix", "Amazon Prime"],
    },
    {
      id: 6,
      title: "Scam 1992",
      genre: "Thriller",
      language: "English",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjgxZTMxNmEtZGRkOC00NDUyLTk5NWEtYzI3NDUxYjQ0N2JiXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_.jpg",
      description:
        "The story of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall.",
      rating: 9.3,
      year: 2020,
      platforms: ["SonyLIV", "Amazon Prime"],
    },
    {
      id: 7,
      title: "Little Things",
      genre: "Drama",
      language: "Hindi",
      image:
        "https://m.media-amazon.com/images/M/MV5BZWQzYWI3ZGMtYzgyYy00OWZkLWEwODYtNGNiMGZiNzQ3YzFkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      description:
        "A cohabiting couple in their 20s navigate the ups and downs of work, modern-day relationships and finding themselves in contemporary Mumbai.",
      rating: 8.2,
      year: 2016,
      platforms: ["Netflix"],
    },
    {
      id: 8,
      title: "Family Man",
      genre: "Thriller",
      language: "Hindi",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_.jpg",
      description:
        "A middle-class man who works for a special cell of the National Investigation Agency tries to protect the nation from terrorism while also keeping his family safe from his secret job.",
      rating: 8.7,
      year: 2019,
      platforms: ["Amazon Prime"],
    },
  ]

  // Additional shows (third row)
  const additionalShows = [
    {
      id: 9,
      title: "Breaking Bad",
      genre: "Action/Thriller",
      language: "Hindi",
      image:
        "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
      description:
        "A high school chemistry teacher diagnosed with cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
      rating: 9.5,
      year: 2008,
      platforms: ["Netflix", "Amazon Prime"],
    },
    {
      id: 10,
      title: "Scam 1992",
      genre: "Thriller",
      language: "English",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjgxZTMxNmEtZGRkOC00NDUyLTk5NWEtYzI3NDUxYjQ0N2JiXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_.jpg",
      description:
        "The story of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall.",
      rating: 9.3,
      year: 2020,
      platforms: ["SonyLIV", "Amazon Prime"],
    },
    {
      id: 11,
      title: "Little Things",
      genre: "Drama",
      language: "Hindi",
      image:
        "https://m.media-amazon.com/images/M/MV5BZWQzYWI3ZGMtYzgyYy00OWZkLWEwODYtNGNiMGZiNzQ3YzFkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      description:
        "A cohabiting couple in their 20s navigate the ups and downs of work, modern-day relationships and finding themselves in contemporary Mumbai.",
      rating: 8.2,
      year: 2016,
      platforms: ["Netflix"],
    },
    {
      id: 12,
      title: "Family Man",
      genre: "Thriller",
      language: "Hindi",
      image:
        "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_.jpg",
      description:
        "A middle-class man who works for a special cell of the National Investigation Agency tries to protect the nation from terrorism while also keeping his family safe from his secret job.",
      rating: 8.7,
      year: 2019,
      platforms: ["Amazon Prime"],
    },
  ]

  // All available genres, languages, and platforms for filters
  const allGenres = ["Action", "Thriller", "Drama", "Sitcom", "Comedy", "Romance", "Sci-Fi", "Fantasy"]
  const allLanguages = ["English", "Hindi", "Spanish", "Korean", "Japanese"]
  const allPlatforms = ["Netflix", "Amazon Prime", "Disney+", "HBO Max", "Hulu", "SonyLIV"]

  // Toggle show to watchlist
  const toggleAddShow = (id) => {
    setAddedShows((prev) => (prev.includes(id) ? prev.filter((showId) => showId !== id) : [...prev, id]))
  }

  // Toggle filter category
  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((category) => (category.id === id ? { ...category, isOpen: !category.isOpen } : category)),
    )
  }

  // Update filters
  const updateFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  // Toggle genre filter
  const toggleGenreFilter = (genre) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre) ? prev.genres.filter((g) => g !== genre) : [...prev.genres, genre],
    }))
  }

  // Toggle language filter
  const toggleLanguageFilter = (language) => {
    setFilters((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  // Toggle platform filter
  const togglePlatformFilter = (platform) => {
    setFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  // Scroll section horizontally
  const scrollSection = (sectionId, direction) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const scrollAmount = direction === "left" ? -400 : 400;
      section.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4b0082] to-[#2e0854] text-white">
      <div className="container mx-auto px-4 py-6">

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Filters */}
          <div className="w-full md:w-48 md:mr-6 mb-6 md:mb-0">
            <div className="flex items-center mb-6">
              <h3 className="text-[#a3a3a3] font-medium">Filters</h3>
              <SlidersHorizontal size={16} className="ml-2 text-[#a3a3a3]" />
            </div>

            {/* Filter Categories */}
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id}>

                  <h3>{category.title}</h3>
                  <button onClick={() => toggleCategory(category.id)}>
                    {category.isOpen ? 'Close' : 'Open'}
                  </button>
                  {/* You can render more content based on the isOpen state */}
                  {category.isOpen && <div>Category content here...</div>}

                  {/* Filter Options */}
                  {category.isOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      {category.id === "genres" && (
                        <div className="space-y-2">
                          {allGenres.map((genre) => (
                            <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.genres.includes(genre)}
                                onChange={() => toggleGenreFilter(genre)}
                                className="rounded text-[#f5c518] focus:ring-[#f5c518]"
                              />
                              <span className="text-sm">{genre}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {category.id === "language" && (
                        <div className="space-y-2">
                          {allLanguages.map((language) => (
                            <label key={language} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.languages.includes(language)}
                                onChange={() => toggleLanguageFilter(language)}
                                className="rounded text-[#f5c518] focus:ring-[#f5c518]"
                              />
                              <span className="text-sm">{language}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {category.id === "release-year" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{filters.yearRange[0]}</span>
                            <span>{filters.yearRange[1]}</span>
                          </div>
                          <input
                            type="range"
                            min="1990"
                            max="2025"
                            value={filters.yearRange[1]}
                            onChange={(e) =>
                              updateFilter("yearRange", [filters.yearRange[0], Number.parseInt(e.target.value)])
                            }
                            className="w-full accent-[#f5c518]"
                          />
                        </div>
                      )}

                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Critics Top Rated Section */}
            {/* <ShowsSection
              id="critics-top-rated"
              title="Critics Top Rated"
              shows={criticsTopRated}
              addedShows={addedShows}
              onAddShow={toggleAddShow}
              onScroll={scrollSection}
            /> */}

            {/* Indian Shows Section */}
            {/* <ShowsSection
              id="indian-shows"
              title="Indian Shows"
              shows={indianShows}
              addedShows={addedShows}
              onAddShow={toggleAddShow}
              onScroll={scrollSection}
            /> */}

            {/* Additional Shows (Third Row) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {additionalShows.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  isAdded={addedShows.includes(show.id)}
                  onAddShow={() => toggleAddShow(show.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
