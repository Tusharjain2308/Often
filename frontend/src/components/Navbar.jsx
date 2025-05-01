import React from "react"
import { Link } from "react-router-dom"
import { Compass, Menu } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Wanderlust
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Itineraries
            </Link>
            <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium">
              Create New
            </Link>
            <Link
              to="/create"
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition duration-300"
            >
              + New Trip
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Itineraries
            </Link>
            <Link
              to="/create"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Create New
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
