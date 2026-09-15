import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ islogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-zinc-800 border-b border-zinc-700 relative z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl md:text-3xl font-bold text-blue-500"
        >
          Blogify
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {islogin ? (
            <>
              <Link
                to="/"
                className="text-zinc-200 hover:text-blue-400 transition"
              >
                Home
              </Link>

              <Link
                to="/create-blog"
                className="text-zinc-200 hover:text-blue-400 transition"
              >
                Create Blog
              </Link>

              <Link
                to="/dashboard"
                className="text-zinc-200 hover:text-blue-400 transition"
              >
                My Blogs
              </Link>

              <Link
                to="/profile"
                className="text-zinc-200 hover:text-blue-400 transition"
              >
                Profile
              </Link>

              <Link
                to="/logout"
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-10 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl p-2">

              {islogin ? (
                <>
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="block text-zinc-200 hover:bg-zinc-700 hover:text-blue-400 px-4 py-3 rounded-md"
                  >
                    Home
                  </Link>

                  <Link
                    to="/create-blog"
                    onClick={closeMenu}
                    className="block text-zinc-200 hover:bg-zinc-700 hover:text-blue-400 px-4 py-3 rounded-md"
                  >
                    Create Blog
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="block text-zinc-200 hover:bg-zinc-700 hover:text-blue-400 px-4 py-3 rounded-md"
                  >
                    My Blogs
                  </Link>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="block text-zinc-200 hover:bg-zinc-700 hover:text-blue-400 px-4 py-3 rounded-md"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/logout"
                    onClick={closeMenu}
                    className="block bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 rounded-md mt-2"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded-md"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="block bg-yellow-500 hover:bg-yellow-600 text-white text-center px-4 py-2 rounded-md mt-2"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
