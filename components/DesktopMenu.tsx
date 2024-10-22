import Link from "next/link"

export function DesktopMenu() {
  return (
    <div className="hidden md:block">
      <div className="flex justify-center items-baseline space-x-4">
        <Link
          href="/Analyze-code"
          className="text-white transition-all duration-300 ease-in-out hover:text-opacity-80 px-3 py-2 rounded-md text-base font-medium"
        >
          Analyze code
        </Link>
        <Link
          href="/PR-summary"
          className="text-white transition-all duration-300 ease-in-out hover:text-opacity-80 px-3 py-2 rounded-md text-base font-medium"
        >
          PR summary
        </Link>
        <Link
          href="/Repo-stats"
          className="text-white transition-all duration-300 ease-in-out hover:text-opacity-80 px-3 py-2 rounded-md text-base font-medium"
        >
          Repo stats
        </Link>
      </div>
    </div>
  )
}