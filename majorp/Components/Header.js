"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import SearchBar from "./searchbar"
import UserMenu from "./user-menu"
import ThemeToggle from "./theme-toggle"

export default function HeaderEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Mock user data - replace with actual auth logic
  const user = {
    name: "Sunil",
    email: "sunilrathod.0336@gmail.com",
    image: null,
  }

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
                <li>
                  <Link href="/" className="text-white hover:text-yellow-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="text-white hover:text-yellow-400">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/tv-shows" className="text-white hover:text-yellow-400">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/new-releases" className="text-white hover:text-yellow-400">
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link href="/top-rated" className="text-white hover:text-yellow-400">
                    Top Rated
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-[300px]">
              <SearchBar onSearch={(term) => console.log("Searching for:", term)} />
            </div>

            <ThemeToggle />

            <UserMenu user={user} />

            <button className="md:hidden text-white" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="mb-4">
              <SearchBar onSearch={(term) => console.log("Searching for:", term)} />
            </div>

            <nav>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 rounded-md text-white hover:bg-purple-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/movies"
                    className="block py-2 px-3 rounded-md text-white hover:bg-purple-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tv-shows"
                    className="block py-2 px-3 rounded-md text-white hover:bg-purple-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-releases"
                    className="block py-2 px-3 rounded-md text-white hover:bg-purple-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/top-rated"
                    className="block py-2 px-3 rounded-md text-white hover:bg-purple-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Top Rated
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

