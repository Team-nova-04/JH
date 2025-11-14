// components/Navbar.js - Sri Lankan Cultural Design
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
    <nav className="sticky top-0 z-50 border-b shadow-2xl bg-gradient-to-r from-[#8D153A]/90 via-[#EB7400]/80 to-[#00534E]/90 backdrop-blur-2xl border-white/30">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute transition duration-1000 -inset-1 bg-gradient-to-r from-[#FFBE29] to-[#EB7400] rounded-xl blur opacity-60 group-hover:opacity-80 group-hover:duration-200"></div>
                <div className="relative p-2 border shadow-2xl bg-[#FFBE29]/20 backdrop-blur-md border-[#FFBE29]/40 rounded-xl">
                  <Shield className="w-6 h-6 text-[#8D153A] drop-shadow-md" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-2xl font-poppins">
                CivicSense
                <span className="block text-sm font-normal text-[#FFBE29] mt-[-4px]">
                  Sri Lanka
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-2 md:flex">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="px-5 py-3 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] rounded-xl hover:bg-white/20 backdrop-blur-md hover:border-white/40"
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="px-5 py-3 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] rounded-xl hover:bg-white/20 backdrop-blur-md hover:border-white/40"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="px-5 py-3 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] rounded-xl hover:bg-white/20 backdrop-blur-md hover:border-white/40"
                >
                  Contact
                </Link>
                <Link
                  to="/citizen/login"
                  className="px-6 py-3 font-semibold transition-all duration-300 border shadow-lg text-white hover:text-[#FFBE29] border-white/40 rounded-xl hover:bg-white/20 backdrop-blur-md hover:shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/citizen/register"
                  className="px-8 py-3 font-semibold text-[#8D153A] transition-all duration-300 transform border shadow-2xl bg-[#FFBE29] backdrop-blur-md hover:bg-[#FFBE29]/90 rounded-xl border-[#FFBE29]/60 hover:shadow-3xl hover:scale-105 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="flex items-center px-5 py-3 space-x-2 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] rounded-xl hover:bg-white/20 backdrop-blur-md hover:border-white/40"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                {userType === 'citizen' && (
                  <Link
                    to="/complaint/submit"
                    className="px-6 py-3 ml-2 font-semibold text-white transition-all duration-300 transform border shadow-2xl bg-[#00534E] backdrop-blur-md hover:bg-[#00534E]/90 rounded-xl border-[#00534E]/60 hover:shadow-3xl hover:-translate-y-1 hover:scale-105"
                  >
                    + Report Issue
                  </Link>
                )}
                <div className="flex items-center pl-4 ml-4 space-x-4 border-l border-white/40">
                  <div className="flex items-center px-4 py-2 space-x-2 border rounded-full shadow-lg bg-white/20 backdrop-blur-md border-white/40">
                    <User className="w-4 h-4 text-[#FFBE29]" />
                    <span className="text-sm font-semibold text-white">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 space-x-2 transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] rounded-xl hover:bg-white/20 backdrop-blur-md hover:border-white/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-white transition-all duration-300 border shadow-lg hover:text-[#FFBE29] rounded-xl hover:bg-white/20 backdrop-blur-md border-white/40"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t shadow-2xl md:hidden border-white/40 bg-gradient-to-b from-[#8D153A]/95 to-[#00534E]/95 backdrop-blur-2xl">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="block px-5 py-4 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] hover:bg-white/20 rounded-xl backdrop-blur-md hover:border-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block px-5 py-4 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] hover:bg-white/20 rounded-xl backdrop-blur-md hover:border-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-5 py-4 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] hover:bg-white/20 rounded-xl backdrop-blur-md hover:border-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/citizen/login"
                  className="block px-5 py-4 font-semibold transition-all duration-300 border shadow-lg text-white hover:text-[#FFBE29] hover:bg-white/20 rounded-xl backdrop-blur-md border-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/citizen/register"
                  className="block px-5 py-4 bg-[#FFBE29] backdrop-blur-md text-[#8D153A] hover:bg-[#FFBE29]/90 rounded-xl font-semibold text-center border border-[#FFBE29]/60 shadow-2xl mt-3 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="flex items-center block px-5 py-4 space-x-3 font-semibold transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] hover:bg-white/20 rounded-xl backdrop-blur-md hover:border-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                {userType === 'citizen' && (
                  <Link
                    to="/complaint/submit"
                    className="block px-5 py-4 bg-[#00534E] backdrop-blur-md text-white hover:bg-[#00534E]/90 rounded-xl font-semibold text-center border border-[#00534E]/60 shadow-2xl mt-3 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    + Report Issue
                  </Link>
                )}
                <div className="flex items-center px-5 py-4 pt-4 mt-4 space-x-3 text-white border border-t shadow-lg border-white/40 backdrop-blur-md bg-white/20 rounded-xl">
                  <User className="w-5 h-5 text-[#FFBE29]" />
                  <span className="font-semibold">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center block w-full px-5 py-4 space-x-3 font-semibold text-left transition-all duration-300 border border-transparent shadow-lg text-white hover:text-[#FFBE29] hover:bg-white/20 rounded-xl backdrop-blur-md hover:border-white/40"
                >
                  <LogOut className="w-5 h-5" />
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