import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900 shadow-md" : "bg-transparent"
      } `}
    >
      <div className="container mx-auto px-4">
        <Router>
          <nav className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
            >
              Portfolio
            </Link>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors text-lg font-semibold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-300 hover:text-white transition-colors text-lg font-semibold"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors text-lg font-semibold"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-lg font-semibold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </Router>
      </div>
    </header>
  );
};

export default Header;
