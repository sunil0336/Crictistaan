"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import StarRatingDisplay from "@/components/star-rating-display"

export default function ReviewCard({ review }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0)
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpfulCount || 0)
  const [userVote, setUserVote] = useState(null)

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // User is removing their vote
      if (voteType === "helpful") {
        setHelpfulCount(helpfulCount - 1)
      } else {
        setNotHelpfulCount(notHelpfulCount - 1)
      }
      setUserVote(null)
    } else {
      // User is changing their vote or voting for the first time
      if (userVote === "helpful" && voteType === "not-helpful") {
        setHelpfulCount(helpfulCount - 1)
        setNotHelpfulCount(notHelpfulCount + 1)
      } else if (userVote === "not-helpful" && voteType === "helpful") {
        setHelpfulCount(helpfulCount + 1)
        setNotHelpfulCount(notHelpfulCount - 1)
      } else if (voteType === "helpful") {
        setHelpfulCount(helpfulCount + 1)
      } else {
        setNotHelpfulCount(notHelpfulCount + 1)
      }
      setUserVote(voteType)
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="bg-black/40 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 bg-purple-700">
          <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.author}</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">{review.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <StarRatingDisplay rating={review.rating} maxRating={10} size="sm" />
              <span className="font-bold">{review.rating}</span>
              <span className="text-gray-400">/10</span>
            </div>
          </div>

          <h3 className="text-xl font-medium mb-3">{review.title}</h3>

          <p className="text-gray-200 mb-4">{review.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-300 hover:text-white ${userVote === "helpful" ? "bg-purple-800/50" : ""}`}
                onClick={() => handleVote("helpful")}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                <span>Helpful</span>
                {helpfulCount > 0 && <span className="ml-2">{helpfulCount}</span>}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`text-gray-300 hover:text-white ${userVote === "not-helpful" ? "bg-purple-800/50" : ""}`}
                onClick={() => handleVote("not-helpful")}
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                <span>Not helpful</span>
                {notHelpfulCount > 0 && <span className="ml-2">{notHelpfulCount}</span>}
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Flag className="w-4 h-4 mr-2" />
              <span>Report</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

