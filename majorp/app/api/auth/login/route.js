import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import Next.js cookies handler
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Store token in HTTP-only Cookie
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure in production
      path: "/",
      maxAge: 3600, // 1 hour
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
