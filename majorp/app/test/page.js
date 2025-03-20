// import React from 'react'

// function test() {
//   return (
//     <div>
//       test
      
//       <iframe
//         width="560"
//         height="315"
//         src="https://www.youtube.com/embed/fhC0qYArZd4?si=siNDXhXjPQmdoSz_"
//         title="YouTube video player"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerpolicy="strict-origin-when-cross-origin"
//         allowfullscreen
//       >
//       </iframe>

//     </div>
//   )
// }

// export default test


"use client"; // Ensure this component is rendered only on the client side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` for App Directory in Next.js 13+
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false); // Flag to track if we're on the client side
  const router = useRouter(); // This should be used after the client has mounted

  useEffect(() => {
    // This effect will run only after the component is mounted on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem('token');
      if (token) {
        setUser(true); // User is logged in if there's a token
      } else {
        setUser(null); // No token means user is not logged in
      }
    }
  }, [isClient]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setUser(null); // Update state to reflect user logged out
    router.push('/'); // Redirect to homepage or login page after logout
  };

  if (!isClient) return null; // Prevent rendering anything until it's on the client side

  return (
    <nav>
      <ul>
        {!user ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
