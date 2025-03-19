import MovieCard from "./movie-card"
// import MovieCard from "./m"
import SectionHeader from "./section-header"

export default function MovieSection({ title, movies, viewAllLink }) {
  
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

