import Image from "next/image"
import { Play } from "lucide-react"
import SectionHeader from "./section-header"

export default function TrailersSection() {
  const trailers = [
    {
      id: 1,
      title: "Box Office: Mark Wahlberg's 'Arthur the King' Aims to Dethrone 'Dune 2' in Theaters",
      source: "Variety - Film News",
      duration: "2:34",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 2,
      title: "Deadpool & Wolverine: A fake or real story? Watch the new 'Marvel' trailer",
      source: "Marvel",
      duration: "3:15",
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <div className="mb-12">
      <SectionHeader title="Browse Trailers" viewAllLink="#" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trailers.map((trailer) => (
          <div key={trailer.id} className="relative group rounded-xl overflow-hidden">
            <div className="aspect-video relative">
              <Image src={trailer.image || "/placeholder.svg"} alt={trailer.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all" />

              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-sm font-medium line-clamp-2">{trailer.title}</h3>
                <p className="text-xs text-purple-200">{trailer.source}</p>
              </div>

              <div className="absolute right-3 bottom-3 bg-white/20 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-xs">{trailer.duration}</span>
              </div>

              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center
                                group-hover:bg-yellow-500 transition-all"
              >
                <Play className="w-6 h-6 text-white fill-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

