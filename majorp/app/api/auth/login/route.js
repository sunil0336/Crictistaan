import { connectDB } from "@/lib/db"; // Import your MongoDB connection function
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For generating JWT token

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your_jwt_secret_key"; // Set this in .env.local for production

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    // Connect to MongoDB
    const db = await connectDB();

    // Check if the user exists in the "users" collection
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      console.error("User not found:", username);
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401 }
      );
    }

    // Compare the hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.error("Password mismatch for user:", username);
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401 }
      );
    }

    // If user is found and password matches, generate JWT token
    const token = jwt.sign(
      { username: user.username, userId: user._id },
      JWT_SECRET,
      { expiresIn: "1h" } // Token will expire in 1 hour
    );

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token, // Send JWT token in response
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while processing login:", error.message);  // Log the error message
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }), // Include error message in response
      { status: 500 }
    );
  }
}
