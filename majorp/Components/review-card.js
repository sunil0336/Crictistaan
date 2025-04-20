"use client"

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRatingDisplay from "@/components/star-rating-display";

export default function ReviewCard({ review }) {
  const [helpfulCount, setHelpfulCount] = useState(review?.helpfulCount || 0);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review?.notHelpfulCount || 0);
  const [userVote, setUserVote] = useState(null);

  const handleVote = (voteType) => {
    setUserVote((prevVote) => {
      if (prevVote === voteType) {
        // Remove vote
        if (voteType === "helpful") setHelpfulCount((prev) => prev - 1);
        else setNotHelpfulCount((prev) => prev - 1);
        return null;
      } else {
        // Switch or add vote
        if (prevVote === "helpful") setHelpfulCount((prev) => prev - 1);
        if (prevVote === "not-helpful") setNotHelpfulCount((prev) => prev - 1);
        if (voteType === "helpful") setHelpfulCount((prev) => prev + 1);
        else setNotHelpfulCount((prev) => prev + 1);
        return voteType;
      }
    });
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
      : "N/A";
  };

  return (
    <div className="bg-black/40 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 bg-purple-700">
          <AvatarFallback>{getInitials(review?.author || "Anonymous")}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{review?.author || "Anonymous"}</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">{review?.date || "Unknown Date"}</span>
            </div>

            <div className="flex items-center gap-2">
              <StarRatingDisplay rating={review?.rating || 0} maxRating={10} size="sm" />
              <span className="font-bold">{review?.rating ?? "N/A"}</span>
              <span className="text-gray-400">/10</span>
            </div>
          </div>

          <h3 className="text-xl font-medium mb-3">{review?.title || "No Title Provided"}</h3>
          <p className="text-gray-200 mb-4">{review?.content || "No review content available."}</p>

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
  );
}
