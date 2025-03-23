"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Filter, ChevronDown, X } from "lucide-react"
import Header from "@/Components/Header"
import MovieCardEnhanced from "@/Components/movie-card"
import { Button } from "@/Components/ui/button" 
import Pagination from "@/Components/pagination"

export default function MoviesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    genre: searchParams.get("genre") || "",
    language: searchParams.get("language") || "",
    year: searchParams.get("year") || "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    genres: [],
    languages: [],
    years: [],
  })
  const [pagination, setPagination] = useState({
    page: Number.parseInt(searchParams.get("page") || "1"),
    limit: 12,
    total: 0,
    pages: 0,
  })

  // Fetch filter options
  // useEffect(() => {
  //   async function fetchFilterOptions() {
  //     try {
  //       const res = await fetch("/api/filters")
  //       const data = await res.json()
  //       setFilterOptions(data)
  //     } catch (error) {
  //       console.error("Error fetching filter options:", error)
  //     }
  //   }

  //   fetchFilterOptions()
  // }, [])

  // Fetch movies based on filters
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams()
  
        if (filters.genre) queryParams.append("genre", filters.genre)
        if (filters.language) queryParams.append("language", filters.language)
        if (filters.year) queryParams.append("year", filters.year)
        queryParams.append("page", pagination.page.toString())
        queryParams.append("limit", pagination.limit.toString())
  
        const res = await fetch(`/api/movies?${queryParams.toString()}`)
        const data = await res.json()
  
        console.log(data); // Log the API response to debug
  
        if (res.ok) {
          setMovies(data.movies)
  
          // Only update pagination if data.pagination exists
          setPagination((prev) => ({
            ...prev,
            total: data.pagination?.total || 0,  // Fallback to 0 if pagination.total is missing
            pages: data.pagination?.pages || 1,  // Fallback to 1 if pagination.pages is missing
          }))
        } else {
          console.error("Failed to fetch movies:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false)
      }
    }
  
    fetchMovies()
  }, [filters, pagination.page, pagination.limit])
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    const queryParams = new URLSearchParams()

    if (filters.genre) queryParams.append("genre", filters.genre)
    if (filters.language) queryParams.append("language", filters.language)
    if (filters.year) queryParams.append("year", filters.year)
    queryParams.append("page", "1") // Reset to first page when applying filters

    router.push(`/movies?${queryParams.toString()}`)
    setShowFilters(false)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const clearFilters = () => {
    setFilters({
      genre: "",
      language: "",
      year: "",
    })
    router.push("/movies")
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page) => {
    const queryParams = new URLSearchParams(searchParams.toString())
    queryParams.set("page", page.toString())
    router.push(`/movies?${queryParams.toString()}`)
    setPagination((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Movies</h1>

          <Button
            variant="outline"
            className="border-purple-700 text-white hover:bg-purple-800"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showFilters && (
          <div className="bg-purple-800/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <select
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="w-full bg-purple-900 border border-purple-700 rounded-md p-2 text-white"
                >
                  <option value="">All Genres</option>
                  {filterOptions.genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                  className="w-full bg-purple-900 border border-purple-700 rounded-md p-2 text-white"
                >
                  <option value="">All Languages</option>
                  {filterOptions.languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Release Year</label>
                <select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="w-full bg-purple-900 border border-purple-700 rounded-md p-2 text-white"
                >
                  <option value="">All Years</option>
                  {filterOptions.years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="outline"
                className="border-purple-700 text-white hover:bg-purple-800"
                onClick={clearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>

              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Active filters display */}
        {(filters.genre || filters.language || filters.year) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.genre && (
              <div className="bg-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                Genre: {filters.genre}
                <button
                  className="ml-2"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, genre: "" }))
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.language && (
              <div className="bg-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                Language: {filters.language}
                <button
                  className="ml-2"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, language: "" }))
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.year && (
              <div className="bg-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                Year: {filters.year}
                <button
                  className="ml-2"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, year: "" }))
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-purple-800/50 rounded-xl mb-2"></div>
                <div className="h-4 bg-purple-800/50 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-purple-800/50 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCardEnhanced key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No movies found matching your filters</p>
            <Button
              variant="outline"
              className="mt-4 border-purple-700 text-white hover:bg-purple-800"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="mt-8">
            <Pagination currentPage={pagination.page} totalPages={pagination.pages} onPageChange={handlePageChange} />
          </div>
        )}
      </main>
    </div>
  )
}

