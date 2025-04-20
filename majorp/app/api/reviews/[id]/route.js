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

    // Connect to DB
    const client = await connectDB();
    const db = client.db();
    const reviewsCollection = db.collection("reviews");

    // Find all reviews for this movie
    const reviews = await reviewsCollection.find({ movieId: new ObjectId(id) }).toArray();

    if (!reviews.length) {
      return NextResponse.json({ reviews: [], pagination: { pages: 1 } }, { status: 200 });
    }

    // Pagination logic (Modify as needed)
    const reviewsPerPage = 5;
    const totalReviews = reviews.length;
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    // Return reviews with pagination info
    return NextResponse.json({
      reviews,
      pagination: {
        totalReviews,
        pages: totalPages || 1,
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews", details: error.message }, { status: 500 });
  }
}
