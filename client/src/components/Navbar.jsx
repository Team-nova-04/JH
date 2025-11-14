// components/Navbar.js - Enhanced with modern design
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User, Shield, Settings, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, userType, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (userType === 'citizen') return '/citizen/dashboard';
    if (userType === 'authority') return '/authority/dashboard';
    if (userType === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CivicSense
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 font-medium"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 font-medium"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 font-medium"
                >
                  Contact
                </Link>
                <Link
                  to="/citizen/login"
                  className="text-blue-600 hover:text-blue-700 px-4 py-2 font-medium border border-blue-200 rounded-lg hover:border-blue-300 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/citizen/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 font-medium flex items-center space-x-1"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                {userType === 'citizen' && (
                  <Link
                    to="/complaint/submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 ml-2"
                  >
                    + Report Issue
                  </Link>
                )}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-3 py-1">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/citizen/login"
                  className="block px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/citizen/register"
                  className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center shadow-lg mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                {userType === 'citizen' && (
                  <Link
                    to="/complaint/submit"
                    className="block px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium text-center shadow-lg mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    + Report Issue
                  </Link>
                )}
                <div className="px-4 py-3 text-gray-700 flex items-center space-x-2 border-t border-gray-200 mt-2 pt-3">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;