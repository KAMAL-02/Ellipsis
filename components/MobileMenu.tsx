import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

interface MobileMenuProps {
  menuOpen: boolean
}



export function MobileMenu({ menuOpen }: MobileMenuProps) {
  const { data: session } = useSession()
  return (
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {session ? (
           <button
           onClick={() => signOut()}
           className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
         >
           Logout
         </button>
        ):(
          <button
         onClick={() => (signIn())}
          className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
        >
          Signin
        </button>
        )}
        <Link
          href="/Analyze-code"
          className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
        >
          Analyze code
        </Link>
        <Link
          href="/PR-summary"
          className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
        >
          PR summary
        </Link>
        <Link
          href="/Repo-stats"
          className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
        >
          Repo stats
        </Link>
        <Link
          href="/user/profile"
          className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
        >
          Profile
        </Link>
      </div>
    </div>
  )
}