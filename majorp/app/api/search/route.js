import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ movies: [] })
    }

    const client = await clientPromise
    const db = client.db("moviedb")

    // Search movies by title, cast, or director
    const movies = await db
      .collection("movies")
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { cast: { $regex: query, $options: "i" } },
          { director: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10)
      .toArray()

    return NextResponse.json({ movies })
  } catch (error) {
    console.error("Error searching movies:", error)
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
  }
}

