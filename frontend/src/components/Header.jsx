import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ onAuthClick, onSectionClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', section: 'hero' },
    { name: 'About', section: 'about' },
    { name: 'Events', section: 'events' },
    { name: 'Team', section: 'team' },
    { name: 'Contact', section: 'contact' }
  ];

  // Only show section navigation on the home page
  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              TechnoKratos
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isHomePage && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onSectionClick(item.section)}
                  className="text-gray-300 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          )}

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                  <span className="text-xs bg-blue-500/20 px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                {user.role === 'student' && (
                  <Link
                    to="/student/profile"
                    className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-blue-500/20">
            <div className="px-4 py-4 space-y-2">
              {isHomePage && navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onSectionClick(item.section);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-700">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-300 px-3 py-2">
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                      <span className="text-xs bg-blue-500/20 px-2 py-1 rounded-full">
                        {user.role}
                      </span>
                    </div>
                    {user.role === 'student' && (
                      <Link
                        to="/student/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all duration-200 w-full"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all duration-200 w-full"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all duration-200 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAuthClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/25"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 