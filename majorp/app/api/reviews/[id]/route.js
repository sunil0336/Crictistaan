import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    // Extract movie ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract last part of URL

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    // Ensure DB is connected
    const client = await connectDB();
    const db = client.db(); // Get the database instance
    const reviewsCollection = db.collection("reviews"); // Reference the "reviews" collection

    // Find reviews by movieId
    const reviews = await reviewsCollection
      .find({ movieId: new ObjectId(id) }) // Convert movieId to ObjectId for MongoDB query
      .toArray();

    if (!reviews.length) {
      return NextResponse.json({ error: "No reviews found for this movie" }, { status: 404 });
    }

    // Return the reviews as JSON
    return NextResponse.json(reviews, { status: 200 });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews", details: error.message }, { status: 500 });
  }
}
