export default function LoadingMovies({ title }) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <span className="w-1 h-5 bg-yellow-500 rounded-full"></span>
            {title}
          </h2>
        </div>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] bg-purple-800/50 rounded-xl mb-2"></div>
              <div className="h-4 bg-purple-800/50 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-purple-800/50 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  