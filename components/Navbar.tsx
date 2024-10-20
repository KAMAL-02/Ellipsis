"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const toggleScrollDirection = () => {
      let scrollY = window.pageYOffset;
      if (scrollY === 0) {
        setScrollDirection("up");
      } else if (scrollY > prevOffset) {
        setScrollDirection("down");
      } else if (scrollY < prevOffset) {
        setScrollDirection("up");
      }
      setPrevOffset(scrollY);
    };
    window.addEventListener("scroll", toggleScrollDirection);
    return () => {
      window.removeEventListener("scroll", toggleScrollDirection);
    };
  }, [prevOffset]);

  return scrollDirection;
};

export default function Navbar() {
  const scrollDirection = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mb-2">
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="backdrop-blur-md bg-white bg-opacity-10 border-b border-blue-500 border-opacity-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/Home" className="flex items-center text-white">
                  <Image src="/AI-4.png" alt="Logo" width={40} height={40} />
                  <span className="font-bold text-lg">ELLIPSIS</span>
                </Link>
              </div>

              {/* Centered links for medium to large screens */}
              <div className="hidden md:block">
                <div className="flex justify-center items-baseline space-x-4">
                  <Link
                    href="#"
                    className="text-white transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Repo metrics
                  </Link>
                  <Link
                    href="#"
                    className="text-white transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Check pr
                  </Link>
                  <Link
                    href="#"
                    className="text-white transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Pull Requests
                  </Link>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div>
                      <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src="/placeholder.svg?height=32&width=32"
                          alt="User avatar"
                          width={32}
                          height={32}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile menu toggle */}
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  type="button"
                  className="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={menuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu with smooth transition */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="#"
                className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
              >
                Repository
              </Link>
              <Link
                href="#"
                className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
              >
                Issues
              </Link>
              <Link
                href="#"
                className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium"
              >
                Pull Requests
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
