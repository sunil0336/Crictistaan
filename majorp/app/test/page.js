"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import SearchBar from "@/components/search-bar" // Restored correct import path
import UserMenu from "@/components/user-menu"
import ThemeToggle from "@/components/theme-toggle"

export default function HeaderEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [searchResults, setSearchResults] = useState([]) // Restored search feature
  const [isSearching, setIsSearching] = useState(false) // Restored search feature
  const [isClient, setIsClient] = useState(false) // Client-side check
  const router = useRouter()

  useEffect(() => {
    setIsClient(true) // Ensure code runs on the client
  }, [])

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem("token")
      setUser(token ? true : null) // Check user login state
    }
  }, [isClient])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    if (isClient) {
      router.push("/") // Redirect after logout
    }
  }

  const handleSearch = async (term) => {
    if (!term) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
      const data = await response.json()
      setSearchResults(data.movies)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tv-shows" }, // Restored correct path
    { name: "New Releases", path: "/new-releases" },
  ]

  return (
    <header className="bg-purple-900 py-3 px-4 sticky top-0 z-10 border-b border-purple-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-white">
              Crictistaan
            </Link>

            <nav className="hidden md:flex">
              <ul className="flex gap-6">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="text-white hover:text-yellow-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-[300px] relative">
              <SearchBar onSearch={handleSearch} /> {/* Restored Search Feature */}
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-purple-950 rounded-md shadow-lg z-20 max-h-[400px] overflow-y-auto">
                  <ul className="py-2">
                    {searchResults.map((movie) => (
                      <li key={movie._id}>
                        <Link
                          href={`/movies/${movie._id}`}
                          className="flex items-center px-4 py-2 hover:bg-purple-800"
                          onClick={() => setSearchResults([])}
                        >
                          <div className="w-8 h-12 bg-purple-800 rounded mr-2 flex-shrink-0">
                            {movie.poster && (
                              <img
                                src={movie.poster || "/placeholder.svg"}
                                alt={movie.title}
                                className="w-full h-full object-cover rounded"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{movie.title}</p>
                            <p className="text-xs text-gray-300">{movie.year}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <ThemeToggle />

            {user ? (
              <>
                <UserMenu user={user} />
                <button onClick={handleLogout} className="text-white hover:text-yellow-400">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-white hover:text-yellow-400">
                Login
              </Link>
            )}

            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} /> {/* Restored Search Feature */}
            </div>

            <nav>
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="block py-2 px-3 rounded-md text-white hover:bg-purple-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
