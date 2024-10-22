"use client"

import { useState } from "react"
import { Logo } from "./Logo"
import { DesktopMenu } from "./DesktopMenu"
import { UserMenu } from "./UserMenu"
import { MobileMenuToggle } from "./MobileMenuToggle"
import { MobileMenu } from "./MobileMenu"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="mb-2">
      <nav className="sticky top-0 z-50">
        <div className="backdrop-blur-md bg-white bg-opacity-10 border-b border-blue-500 border-opacity-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Logo />
              <DesktopMenu />
              <UserMenu />
              <MobileMenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          </div>
          <MobileMenu menuOpen={menuOpen} />
        </div>
      </nav>
    </div>
  )
}