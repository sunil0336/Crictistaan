"use client"

import { useState, useEffect } from "react"
import { X, Share, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MovieReviewForm from "@/components/movie-review-form"
import ReviewCard from "@/components/review-card"
import ReviewFilter from "@/components/review-filter"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

// This would normally come from a database or API
const getMovieById = (id) => {
  return {
    id,
    title: "Devara",
    year: "2024",
    rating: 8.2,
    reviews: [
      {
        id: 1,
        rating: 9,
        title: "R.I.P to the Rajamouli Curse,Tiger Reigns!!!",
        author: "Yashrajrao7",
        date: "27 Sep 2024",
        content:
          "Director excelled in presenting it and providing what the fans have been waiting for over the years fan service at it's finest. The film's directed by Koratala Siva strikes a balance of high-octane action with emotional depth & also showcasing his skill for blending mass elements with meaningful content. The action sequences are as epic as the ocean itself, with breathtaking visuals and mind-blowing fight choreography.",
        helpfulCount: 18,
        notHelpfulCount: 210,
      },
      {
        id: 2,
        rating: 7,
        title: "A Visual and Musical Extravaganza Elevated by NTR's Performance",
        author: "Rathod06",
        date: "20 Oct 2024",
        content:
          '"Devara" is a grand spectacle that immerses you in a visually stunning world, brought to life by breathtaking cinematography and accompanied by a mesmerizing musical score. At its heart lies Jr. NTR\'s extraordinary performance, showcasing his remarkable range and charisma. Anirudh Ravichander\'s music adds another layer of depth and emotion to the narrative, heightening the impact of key moments and enhancing the overall viewing experience. Each song is a masterpiece in its own right, leaving a lasting impression long after the film ends. Overall, "Devara" is a cinematic treat that leaves a lasting impression.',
        helpfulCount: 25,
        notHelpfulCount: 210,
      },
    ],
  }
}

export default function MovieReviewPage({ params }) {
  const [movie, setMovie] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedMovie = getMovieById(params.id)
    setMovie(fetchedMovie)
  }, [params.id])

  if (!movie) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  const handleFilterChange = (filters) => {
    console.log("Filters changed:", filters)
    // In a real app, this would filter the reviews
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <div className="bg-black/80 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-white hover:text-gray-300">
                <X className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-medium">
                {movie.title} <span className="text-gray-400">({movie.year})</span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-white">
                <Share className="w-5 h-5 mr-2" />
                Share
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-black">
                    <Plus className="w-5 h-5 mr-2" />
                    Review this title
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-purple-900 border-purple-700 text-white max-w-3xl">
                  <MovieReviewForm movieId={params.id} movieTitle={movie.title} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <h2 className="text-xl font-medium mb-6">User Reviews</h2>

          <ReviewFilter onFilterChange={handleFilterChange} />

          <div className="space-y-6">
            {movie.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <span className="sr-only">Previous page</span>
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "ghost"}
                size="sm"
                className={page === currentPage ? "bg-purple-700 hover:bg-purple-600" : "text-white"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <span className="px-2">...</span>

            <Button variant="ghost" size="sm" className="text-white" onClick={() => setCurrentPage(10)}>
              10
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              disabled={currentPage === 10}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 10))}
            >
              <span className="sr-only">Next page</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// These components are missing from the code
function ChevronLeft(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

