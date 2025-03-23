// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db"; // Your MongoDB connection function
// import { ObjectId } from "mongodb"; // Import ObjectId from mongodb

// export async function GET(request, { params }) {
//   try {
//     const { id } = params; // Extract movie ID from the route

//     if (!ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
//     }

//     const client = await connectDB(); // Establish connection to DB
//     const db = client.db(); // Get the database instance
//     const moviesCollection = db.collection("movies"); // Reference the "movies" collection

//     // Find the movie by its ObjectId
//     const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

//     if (!movie) {
//       return NextResponse.json({ error: "Movie not found" }, { status: 404 });
//     }

//     return NextResponse.json(movie);
//   } catch (error) {
//     // console.error("Error fetching movie:", error);
//     return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    await connectDB();

    // Extract params from the request
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extracts the last segment as `id`

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const client = await connectDB();
    const db = client.db();
    const moviesCollection = db.collection("movies");

    const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movie", details: error.message }, { status: 500 });
  }
}
