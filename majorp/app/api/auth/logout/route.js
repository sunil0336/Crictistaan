import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
  response.cookies.set("token", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}


// for frintend
// const handleLogout = async () => {
//     await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
//     window.location.href = "/login"; // Redirect after logout
//   };
  