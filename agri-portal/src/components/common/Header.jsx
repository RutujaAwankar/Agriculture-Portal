import { useState } from 'react';
import { NavLink} from 'react-router-dom';

const NAV_ITEMS = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'LEARN', path: '/learn' },
  { name: 'CONTACT', path: '/contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLinkClass = ({ isActive }) => 
    isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white';


  return (
    <header className="fixed w-full top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div>
            <h1 className="text-2xl font-bold text-white">KSAN</h1>
            <p className="text-gray-300 text-sm">Knowledge Sharing and Networking</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `transition-colors duration-200 ${activeLinkClass({ isActive })}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">    
              <>
                <NavLink 
                  to="/login" 
                  className="px-4 py-2 rounded text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 border rounded text-sm border-white text-white hover:bg-white hover:text-gray-900 transition-colors duration-200"
                >
                  Sign Up
                </NavLink>
              </>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-700">
            <nav className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `py-2 transition-colors duration-200 ${activeLinkClass({ isActive })}`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="border-t border-gray-700 pt-4 space-y-4">
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center py-2 rounded bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-center py-2 border rounded border-white text-white hover:bg-white hover:text-gray-900 transition-colors duration-200"
                      >
                        Sign Up
                      </NavLink>
                    </>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default Header;