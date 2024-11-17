import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 nav-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-emerald-500 font-bold text-xl hover:text-emerald-400 transition-colors">
                Expense Tracker
              </Link>
            </div>
            
            {isAuthenticated && (
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-6">
                  <Link
                    to="/dashboard"
                    className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/expenses"
                    className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/expenses') ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
                    }`}
                  >
                    Expenses
                  </Link>
                  <Link
                    to="/statistics"
                    className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/statistics') ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
                    }`}
                  >
                    Statistics
                  </Link>
                  <Link
                    to="/income"
                    className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/income') ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'
                    }`}
                  >
                    Income
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="relative">
                  <div
                    ref={avatarRef}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="avatar flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white cursor-pointer"
                  >
                    <span className="text-sm font-medium">U</span>
                  </div>
                  
                  <div
                    ref={menuRef}
                    className={`dropdown-menu absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 ${
                      showUserMenu ? 'show' : ''
                    }`}
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-emerald-400 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-emerald-500 text-white hover:bg-emerald-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-emerald-400 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden mobile-menu ${isMenuOpen ? 'show' : ''}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/dashboard') ? 'text-emerald-400 bg-gray-700' : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/expenses"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/expenses') ? 'text-emerald-400 bg-gray-700' : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-700'
                }`}
              >
                Expenses
              </Link>
              <Link
                to="/statistics"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/statistics') ? 'text-emerald-400 bg-gray-700' : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-700'
                }`}
              >
                Statistics
              </Link>
              <Link
                to="/income"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/income') ? 'text-emerald-400 bg-gray-700' : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-700'
                }`}
              >
                Income
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-gray-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
