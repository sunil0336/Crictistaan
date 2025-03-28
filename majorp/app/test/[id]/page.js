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


"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, Share, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MovieReviewForm from "@/Components/movie-review-form";
import ReviewCard from "@/Components/review-card";
import ReviewFilter from "@/Components/review-filter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function MovieReviewPage() {
  const router = useRouter();
  const params = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    sort: "newest",
    minRating: 0,
    hideSpoilers: false,
  });

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const res = await fetch(`/api/movies/${params.id}`);

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

    if (params.id) {
      fetchMovie();
    }
  }, [params.id, router]);

  useEffect(() => {
    async function fetchReviews() {
      setReviewsLoading(true);
      try {
        const res = await fetch(`/api/reviews/${params.id}`);
        const data = await res.json();
        console.log("Fetched Reviews Data:", data); // Debugging

        setReviews(data?.reviews || []); // Ensure reviews is an array
        setTotalPages(data?.pagination?.pages || 1); // Fix undefined error
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    }

    if (params.id) {
      fetchReviews();
    }
  }, [params.id, currentPage, filterOptions]);


  if (loading) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
      <Image src={movie.poster} alt={movie.title} width={300} height={450} className="rounded-lg mt-4" />
      <p className="text-gray-300 mt-2">{movie.description}</p>

      <h2 className="text-2xl font-semibold mt-6 text-white">Reviews</h2>
      <ReviewFilter filterOptions={filterOptions} onFilterChange={setFilterOptions} />
      {reviewsLoading ? (
        <p className="text-gray-300">Loading reviews...</p>
      ) : reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review._id} review={review} />)
      ) : (
        <p className="text-gray-400">No reviews yet. Be the first to review!</p>
      )}
      {/* <MovieReviewForm movieId={params.id} onReviewAdded={(newReview) => setReviews([newReview, ...reviews])} /> */}
    </div>
  );
}
