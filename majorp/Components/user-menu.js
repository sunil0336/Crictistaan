"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, LogOut, Settings, Heart, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function UserMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    // Handle logout logic here
    setIsMenuOpen(false)
  }

  return (
    <div className="relative">
      {user ? (
        <>
          <button onClick={toggleMenu} className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
            {user.image ? (
              <Image
                src={user.image || "/placeholder.svg"}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-purple-950 ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="px-4 py-2 border-b border-purple-800">
                  <p className="text-sm font-medium text-white">{user.name || "User"}</p>
                  <p className="text-xs text-purple-300 truncate">{user.email || ""}</p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="mr-3 h-4 w-4 text-purple-300" />
                  Profile
                </Link>

                <Link
                  href="/watchlist"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="mr-3 h-4 w-4 text-purple-300" />
                  Watchlist
                </Link>

                <Link
                  href="/history"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Clock className="mr-3 h-4 w-4 text-purple-300" />
                  Watch History
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-purple-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="mr-3 h-4 w-4 text-purple-300" />
                  Settings
                </Link>

                <div className="border-t border-purple-800 mt-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-purple-800"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-purple-300" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-white border-white hover:bg-purple-800">
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-purple-900 text-white border-purple-700">
              <DialogHeader>
                <DialogTitle>Sign in to your account</DialogTitle>
                <DialogDescription className="text-purple-200">
                  Enter your email and password to access your account
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-purple-800 border-purple-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-purple-800 border-purple-700"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-purple-700" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-yellow-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
                  Sign In
                </Button>
                <div className="text-center text-sm">
                  <span className="text-purple-200">Don't have an account? </span>
                  <a href="#" className="text-yellow-400 hover:underline">
                    Sign up
                  </a>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}

