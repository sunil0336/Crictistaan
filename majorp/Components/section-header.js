import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function SectionHeader({ title, viewAllLink }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium flex items-center gap-2">
        <span className="w-1 h-5 bg-yellow-500 rounded-full"></span>
        {title}
      </h2>

      {viewAllLink && (
        <Link href={viewAllLink} className="flex items-center text-sm text-purple-200 hover:text-yellow-400">
          <span>See all</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

