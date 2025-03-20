"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added state for name
  const [email, setEmail] = useState(""); // Added state for email
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }), // Send name and email
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 my-2 bg-gray-700 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 my-2 bg-gray-700 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 my-2 bg-gray-700 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 my-2 bg-gray-700 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-md mt-2">
            Register
          </button>
        </form>

        <p className="mt-2 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}
