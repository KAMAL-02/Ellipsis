import Link from "next/link"
import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="flex items-center text-white transition-all duration-300 ease-in-out hover:text-opacity-60"
      >
        <Image src="/AI-4.png" alt="Logo" width={40} height={40} />
        <span className="font-bold text-lg ml-2">ELLIPSIS</span>
      </Link>
    </div>
  )
}