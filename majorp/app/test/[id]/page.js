// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";

// export default function MovieTestPage() {
//   const params = useParams(); // Get the dynamic route params
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchMovie() {
//       if (!params.id) return;

//       setLoading(true);
//       try {
//         const res = await fetch(`/api/movies/${params.id}`);
//         if (!res.ok) throw new Error("Failed to fetch movie");

//         const data = await res.json();
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching movie:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMovie();
//   }, [params.id]);

//   if (loading) return <p>Loading...</p>;

//   if (!movie) return <p>Movie not found</p>;

//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <p>{movie.plot}</p>
//       <p>Directed by: {movie.director}</p>
//       <p>Language: {movie.language}</p>
//       <p>Genres: {movie.genres.join(", ")}</p>
//       <p>Rating: {movie.rating}</p>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import { Star, Share, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MovieReviewPage() {
  const router = useRouter();
  const { id } = router.query; // Get movie ID from URL params

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      if (!id) return; // Ensure ID exists before fetching

      setLoading(true);
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            router.push("/404");
            return;
          }
          throw new Error("Failed to fetch movie");
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-white rounded-full"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link href="/movies">
            <Button>Back to Movies</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <Image src={movie.poster} alt={movie.title} width={300} height={450} className="rounded-md" />
      <p className="mt-4">{movie.plot}</p>
      <p className="mt-2"><strong>Director:</strong> {movie.director}</p>
      <p className="mt-2"><strong>Language:</strong> {movie.language}</p>
      <p className="mt-2"><strong>Genres:</strong> {movie.genres.join(", ")}</p>
      <p className="mt-2"><strong>Rating:</strong> ⭐ {movie.rating}</p>
    </div>
  );
}
