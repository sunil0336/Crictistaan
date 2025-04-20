"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Correct import

import { Star, Share, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MovieReviewForm from "@/Components/movie-review-form"
import ReviewCard from "@/Components/review-card"
import ReviewFilter from "@/Components/review-filter"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function MovieReviewPage() {

  const router = useRouter()
  const params = useParams(); // Get params dynamically

  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterOptions, setFilterOptions] = useState({
    sort: "newest",
    minRating: 0,
    hideSpoilers: false,
  })

  // Fetch movie details
  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const res = await fetch(`/api/movies/${params.id}`);

        if (!res.ok) {
          if (res.status === 404) {
            router.push("/404");
            return;
          }
          throw new Error("Failed to fetch movie");
        }

        const data = await res.json();
        console.log("Fetched Reviews Data:", data);

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchMovie();
    }
  }, [params.id, router]);


  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      setReviewsLoading(true);
      try {
        const res = await fetch(`/api/reviews/${params.id}`);
        const data = await res.json();
        console.log("Fetched Reviews Data:", data); // Debugging

        setReviews(data?.reviews || []); // Ensure reviews is an array
        setTotalPages(data?.pagination?.pages || 1); // Fix undefined error
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    }

    if (params.id) {
      fetchReviews();
    }
  }, [params.id, currentPage, filterOptions]);

  const handleFilterChange = (newFilters) => {
    setFilterOptions(newFilters)
    setCurrentPage(1)
  }

  const handleReviewAdded = (newReview) => {
    // Refresh reviews after adding a new one
    setReviews((prevReviews) => [newReview, ...prevReviews])

    // Update movie rating in UI
    if (movie) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0) + newReview.rating
      const averageRating = totalRating / (reviews.length + 1)
      setMovie((prevMovie) => ({
        ...prevMovie,
        rating: averageRating,
      }))
    }
  }

  const handleClick = (url) => {
    window.location.href = url;  // Redirect to YouTube URL
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link href="/movies">
            <Button>Back to Movies</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <div className="bg-black/80 min-h-screen">
        {/* Movie Details Section */}
        <div className="relative">
          {movie.backdrop && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={movie.backdrop || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          )}

          <div className="container mx-auto px-4 py-8 relative">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/movies" className="text-white hover:text-gray-300">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
                  <Image
                    src={movie.poster || "/placeholder.svg?height=450&width=300"}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-sm bg-yellow-500 text-black px-2 py-0.5 rounded">{movie.releaseYear}</span>

                  {movie.runtime && <span className="text-sm text-gray-300">{movie.runtime.hours}h {movie.runtime.minutes}m</span>}

                  {movie.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{movie.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres &&
                    movie.genres.map((genre) => (
                      <Link
                        key={genre}
                        href={`/movies?genre=${encodeURIComponent(genre)}`}
                        className="text-sm bg-purple-800 hover:bg-purple-700 px-3 py-1 rounded-full"
                      >
                        {genre}
                      </Link>
                    ))}
                </div>

                <p className="text-gray-300 mb-6">{movie.plot || "No plot description available."}</p>

                <div className="mb-6">
                  {movie.director && (
                    <p className="mb-1">
                      <span className="text-gray-400">Director: </span>
                      <span>{movie.director}</span>
                    </p>
                  )}

                  {movie.cast && movie.cast.length > 0 && (
                    <p className="mb-1">
                      <span className="text-gray-400">Cast: </span>
                      <span>{movie.cast.join(", ")}</span>
                    </p>
                  )}

                  {movie.language && (
                    <p>
                      <span className="text-gray-400">Language: </span>
                      <span>{movie.language}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
                    onClick={() => handleClick(movie.youtube)}
                  >
                    Watch Trailer
                  </button>

                  <Button variant="outline" className="border-white text-white hover:bg-purple-800">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-black">
                        <Star className="w-4 h-4 mr-2" />
                        Write a Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-purple-900 border-purple-700 text-white max-w-3xl">
                      <MovieReviewForm movieId={params.id} movieTitle={movie.title} onReviewAdded={handleReviewAdded} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-medium mb-6">User Reviews</h2>

          <ReviewFilter onFilterChange={handleFilterChange} />

          {reviewsLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-black/40 rounded-lg p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-800 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-purple-800 rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-purple-800 rounded w-1/3 mb-4"></div>
                      <div className="h-3 bg-purple-800 rounded w-full mb-2"></div>
                      <div className="h-3 bg-purple-800 rounded w-full mb-2"></div>
                      <div className="h-3 bg-purple-800 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}

              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={i + 1 === currentPage ? "default" : "ghost"}
                    size="sm"
                    className={i + 1 === currentPage ? "bg-purple-700 hover:bg-purple-600" : "text-white"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-black/40 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-4">No reviews yet</h3>
              <p className="text-gray-300 mb-6">Be the first to review this movie!</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-black">
                    <Star className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-purple-900 border-purple-700 text-white max-w-3xl">
                  <MovieReviewForm movieId={params.id} movieTitle={movie.title} onReviewAdded={handleReviewAdded} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

