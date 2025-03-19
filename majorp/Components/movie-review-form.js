"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils"

export default function MovieReviewForm({ movieId, movieTitle }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [containsSpoilers, setContainsSpoilers] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      movieId,
      rating,
      title,
      review,
      containsSpoilers,
    })

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form
    setRating(0)
    setTitle("")
    setReview("")
    setContainsSpoilers(false)
  }

  if (submitted) {
    return (
      <div className="bg-purple-800/50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium mb-4">Thank you for your review!</h3>
        <p className="text-gray-300 mb-6">Your review has been submitted and will be visible after moderation.</p>
        <Button onClick={() => setSubmitted(false)} className="bg-purple-700 hover:bg-purple-600">
          Write another review
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-purple-800/50 rounded-lg p-6">
      <h3 className="text-xl font-medium mb-6">Review "{movieTitle}"</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Your Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={cn(
                    "w-6 h-6 transition-colors",
                    (hoverRating ? hoverRating >= star : rating >= star)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-500",
                  )}
                />
              </button>
            ))}
            {rating > 0 && <span className="ml-2 text-lg font-bold">{rating}/10</span>}
          </div>
        </div>

        <div>
          <label htmlFor="review-title" className="block text-sm font-medium mb-2">
            Review Title
          </label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your thoughts"
            className="bg-purple-900/50 border-purple-700 text-white placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <label htmlFor="review-content" className="block text-sm font-medium mb-2">
            Your Review
          </label>
          <Textarea
            id="review-content"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="bg-purple-900/50 border-purple-700 text-white placeholder:text-gray-400 min-h-[150px]"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="contains-spoilers"
            checked={containsSpoilers}
            onChange={(e) => setContainsSpoilers(e.target.checked)}
            className="rounded bg-transparent border-gray-600"
          />
          <label htmlFor="contains-spoilers" className="text-sm">
            This review contains spoilers
          </label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-black" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  )
}

