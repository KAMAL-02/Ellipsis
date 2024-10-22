interface MobileMenuToggleProps {
    menuOpen: boolean
    setMenuOpen: (open: boolean) => void
  }
  
  export function MobileMenuToggle({ menuOpen, setMenuOpen }: MobileMenuToggleProps) {
    return (
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    )
  }