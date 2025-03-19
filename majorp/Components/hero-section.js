import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative mt-6 mb-12 rounded-xl overflow-hidden">
      <div className="aspect-[21/9] relative">
        <Image
          src="/placeholder.svg?height=600&width=1400"
          alt="Interstellar movie"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 max-w-lg">
          <h1 className="text-3xl font-bold mb-2">Interstellar Re-Release</h1>
          <h2 className="text-xl font-medium mb-2">Tickets now Available for IMAX Screens All Across India!!</h2>
          <p className="text-purple-200 mb-4">Interstellar Re-releases in India on February 7</p>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="w-3 h-3 rounded-full bg-white/30"></button>
          <button className="w-3 h-3 rounded-full bg-white"></button>
          <button className="w-3 h-3 rounded-full bg-white/30"></button>
        </div>
      </div>

      <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex-shrink-0 bg-purple-800 rounded-lg p-4 w-[300px]">
            <div className="flex gap-4">
              <Image
                src="/placeholder.svg?height=120&width=80"
                alt="Movie poster"
                width={80}
                height={120}
                className="rounded-md"
              />
              <div className="flex-1">
                <div className="text-xs text-purple-300 mb-1">User review #{item}</div>
                <p className="text-sm line-clamp-4">
                  "Interstellar is a masterpiece that explores the depths of space and human emotion. The visuals are
                  stunning and the story is captivating from start to finish."
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

