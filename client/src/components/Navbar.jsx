import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User, Shield, Settings } from 'lucide-react';
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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">CivicSense</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Contact
                </Link>
                <Link
                  to="/citizen/login"
                  className="text-primary-600 hover:text-primary-700 px-4 py-2 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/citizen/register"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to={getDashboardLink()} className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  Dashboard
                </Link>
                {userType === 'citizen' && (
                  <Link
                    to="/complaint/submit"
                    className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Submit Complaint
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Home
                </Link>
                <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  About
                </Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Contact
                </Link>
                <Link
                  to="/citizen/login"
                  className="block px-3 py-2 text-primary-600 hover:bg-gray-100 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/citizen/register"
                  className="block px-3 py-2 bg-primary-600 text-white rounded"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to={getDashboardLink()} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  Dashboard
                </Link>
                {userType === 'citizen' && (
                  <Link
                    to="/complaint/submit"
                    className="block px-3 py-2 bg-primary-600 text-white rounded"
                  >
                    Submit Complaint
                  </Link>
                )}
                <div className="px-3 py-2 text-gray-700">
                  <User className="h-5 w-5 inline mr-2" />
                  {user?.name || user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded"
                >
                  <LogOut className="h-5 w-5 inline mr-2" />
                  Logout
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

