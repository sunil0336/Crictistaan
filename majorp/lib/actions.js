"use server"

export async function submitReview(formData) {
  // This would normally connect to a database
  const movieId = formData.get("movieId")
  const rating = formData.get("rating")
  const title = formData.get("title")
  const review = formData.get("review")
  const containsSpoilers = formData.get("containsSpoilers") === "on"

  console.log({
    movieId,
    rating,
    title,
    review,
    containsSpoilers,
    timestamp: new Date().toISOString(),
    userId: "user-123", // Would come from authentication
  })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}

