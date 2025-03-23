// pages/api/filters.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // Your MongoDB connection function

// Function to validate the input
const validateInput = (input) => {
  // If the input is not a valid number (like year), return null
  if (input && isNaN(input)) return null;
  return input;
};

export async function GET(request) {
  try {
    // Parse the search parameters from the request URL
    const { searchParams } = new URL(request.url);
    const genre = validateInput(searchParams.get("genre"));
    const language = validateInput(searchParams.get("language"));
    const year = validateInput(searchParams.get("year"));
    const limit = Number.parseInt(searchParams.get("limit") || "8");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Connect to the database
    const client = await connectDB();
    const db = client.db(); // Get the database instance
    const moviesCollection = db.collection("movies");

    // Build query based on filters
    const query = {};
    if (genre) query.genres = genre;
    if (language) query.language = language;
    if (year) query.year = Number.parseInt(year);

    // Log the query for debugging
    console.log("Querying movies with filters:", query);

    // Get movies with pagination
    const movies = await moviesCollection
      .find(query)
      .sort({ releaseDate: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Log the number of movies fetched
    console.log("Movies fetched:", movies.length);

    // Get total count for pagination
    const totalMovies = await moviesCollection.countDocuments(query);

    // Log the pagination info
    console.log("Pagination info:", {
      total: totalMovies,
      page,
      limit,
      pages: Math.ceil(totalMovies / limit),
    });

    // Prepare pagination data
    const pagination = {
      total: totalMovies,
      page,
      limit,
      pages: Math.ceil(totalMovies / limit),
    };

    // Return response with movies and pagination info
    return NextResponse.json({
      movies,
      pagination,
    });
  } catch (error) {
    // Enhanced error logging
    console.error("Error occurred while fetching movies:", error);

    // Check if the error is related to database connection or query issues
    if (error.name === "MongoNetworkError") {
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }

    // General fallback for other errors
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
