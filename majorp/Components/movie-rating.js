"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function MovieRating({ initialRating = 0, readOnly = false, onRatingChange }) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingChange = (newRating) => {
    if (readOnly) return

    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <TooltipProvider key={star}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={cn("p-0.5 focus:outline-none", readOnly && "cursor-default")}
                onClick={() => handleRatingChange(star)}
                onMouseEnter={() => !readOnly && setHoverRating(star)}
                onMouseLeave={() => !readOnly && setHoverRating(0)}
                disabled={readOnly}
              >
                <Star
                  className={cn(
                    "w-5 h-5 transition-colors",
                    (hoverRating ? hoverRating >= star : rating >= star)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400",
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {star} Star{star !== 1 ? "s" : ""}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

