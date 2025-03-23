// lib/db.js
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client;
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ Using existing MongoDB connection");
    return client;
  }

  try {
    client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    isConnected = true;
    console.log("✅ MongoDB Connected");

    return client.db("test"); // Make sure you're connected to the "test" database
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if the connection fails
  }
};
