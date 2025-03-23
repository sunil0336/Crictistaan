import MovieCard from "./movie-card"
import SectionHeader from "./section-header"


export default function MovieSection({title, movies, viewAllLink }) {
  if (!movies || movies.length === 0) {
    return <div className="text-center py-8 text-gray-400">No movies found</div>
  }

  return (
        <div className="mb-12">
      <SectionHeader title={title} viewAllLink={viewAllLink} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

// import MovieCard from "./movie-card"
// import SectionHeader from "./section-header"

// export default function MovieSection({ title, movies, viewAllLink }) {
  
//   return (
//     <div className="mb-12">
//       <SectionHeader title={title} viewAllLink={viewAllLink} />

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   )
// }

