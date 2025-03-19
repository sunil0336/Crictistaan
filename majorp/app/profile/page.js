import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="max-w-3xl mx-auto bg-purple-950 rounded-3xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-32 h-32">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile picture"
                fill
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="space-y-2 mb-6">
                <p className="text-lg font-medium">Name: Chandler</p>
                <p className="text-gray-300">Email: Chandler@gmail.com</p>
              </div>

              <Button variant="outline" className="text-white border-white hover:bg-purple-800">
                Edit profile
              </Button>
            </div>

            <div className="self-end md:self-start mt-4 md:mt-0">
              <Button variant="ghost" className="text-white hover:bg-purple-800">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-500 rounded-full"></span>
              Recent Activity
            </h2>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-purple-800 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-8 h-8 rounded-full bg-purple-800 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recentMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                  <button className="absolute top-2 left-2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="mt-2">
                  <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm">{movie.rating}</span>
                    </div>
                    <button className="flex items-center text-sm text-gray-300 hover:text-yellow-400">
                      <Star className="w-4 h-4 mr-1" />
                      Rate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Section */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Reviewer"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Amar Singh Chandler, 2024</p>
                  <p className="text-xs text-gray-400">Posted by Loving Fan</p>
                </div>
              </div>

              <div className="prose prose-sm prose-invert max-w-xl">
                <p className="text-sm mb-2">
                  "Amar Singh Chandler" is a heartfelt tribute to a musical icon and a must-watch for anyone who loves
                  great storytelling and soul-stirring music.
                </p>
                <p className="text-sm mb-2">
                  Directed by Imtiaz Ali, this film is a masterful exploration of Amar Singh Chandler's life, his
                  complicated music, and the tragic events that ultimately led to his assassination.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 hidden md:block">
              <Image
                src="/placeholder.svg?height=180&width=120"
                alt="Movie poster"
                width={120}
                height={180}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Movie data
const recentMovies = [
  {
    id: 1,
    title: "Daaku Maharaj",
    rating: "8.9",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "Hi Nanna",
    rating: "8.9",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "Thalapathy 69",
    rating: "8.9",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    title: "Hit 3",
    rating: "8.9",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    title: "Ismart Shankar",
    rating: "8.9",
    image: "/placeholder.svg?height=400&width=300",
  },
]

