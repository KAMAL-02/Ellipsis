"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { signIn, signOut, useSession } from "next-auth/react"
import { User, LogOut, LogIn} from "lucide-react"

export function UserMenu() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  console.log(session);

  const toggleUserMenu = () => {
    setUserMenuOpen((prevState) => !prevState)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <div className="ml-3 relative" ref={menuRef}>
          <div>
            <button
              onClick={toggleUserMenu}
              className="max-w-xs rounded-full flex items-center text-sm outline-none transition-all duration-300 ease-in-out"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <Image
                className="h-8 w-8 rounded-full object-cover"
                src={
                  session?.user?.avatar
                    ? session.user.avatar
                    : "/Avatar.png"
                }
                alt="User avatar"
                width={32}
                height={32}
              />
              <span className="ml-2 text-white hover:text-opacity-80 transition-all duration-300 ease-in-out">{session?.user?.username}</span>
            </button>
          </div>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md border border-blue-700 shadow-lg py-1 bg-blue-700 bg-opacity-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {session ? (
                  <>
                  <Link
                    href="/user/profile"
                    className="flex items-center px-4 py-2 text-base text-white hover:text-opacity-80 font-semibold transition-colors duration-150"
                  >
                    <User width={20} height={20} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center w-full text-left px-4 py-2 text-base text-red-600 font-semibold hover:text-opacity-80 transition-colors duration-150"
                  >
                    <LogOut className="mr-2" />
                    Logout
                  </button>
                </>
                
                ) : (
                  <>
                  <button
                    onClick={() => signIn()}
                    className="flex items-center w-full text-left px-4 py-2 text-base font-semibold text-white hover:text-opacity-80 transition-colors duration-150"
                  >
                    <LogIn className="mr-2" />
                    Sign in
                  </button>
                  <Link
                    href="/user/profile"
                    className="flex items-center px-4 py-2 text-base text-white font-semibold hover:text-opacity-80 transition-colors duration-150"
                  >
                    <User className="mr-2" />
                    Profile
                  </Link>
                </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
