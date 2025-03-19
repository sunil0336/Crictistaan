import { Star } from "lucide-react"

export default function StarRatingDisplay({ rating, maxRating = 10, size = "md" }) {
  // Convert rating to a 5-star scale if it's out of 10
  const normalizedRating = maxRating === 10 ? rating / 2 : rating

  // Calculate full and half stars
  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  // Determine star size
  const starSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size]

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={`${starSize} text-yellow-400 fill-yellow-400`} />
      ))}

      {hasHalfStar && (
        <div className="relative">
          <Star className={`${starSize} text-gray-500`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${starSize} text-yellow-400 fill-yellow-400`} />
          </div>
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${starSize} text-gray-500`} />
      ))}
    </div>
  )
}

