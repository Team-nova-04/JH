// components/Navbar.js - Enhanced with glass effect animations
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";

const Navbar = () => {
  const { isAuthenticated, userType, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (userType === "citizen") return "/citizen/dashboard";
    if (userType === "authority") return "/authority/dashboard";
    if (userType === "admin") return "/admin/dashboard";
    return "/";
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
                  className="relative px-5 py-3 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Home</span>
                </Link>

                <Link
                  to="/about"
                  className="relative px-5 py-3 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">About</span>
                </Link>

                <Link
                  to="/communities"
                  className="relative flex items-center px-5 py-3 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <Users className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Communities</span>
                </Link>

                <Link
                  to="/contact"
                  className="relative px-5 py-3 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Contact</span>
                </Link>

                <Link
                  to="/citizen/login"
                  className="relative px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-500 border group rounded-xl hover:shadow-2xl border-white/40"
                >
                  <div className="absolute inset-0 transition-all duration-500 bg-white/10 backdrop-blur-md rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Login</span>
                </Link>

                <Link
                  to="/citizen/register"
                  className="group relative px-8 py-3 font-semibold text-[#8D153A] transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 rounded-xl shadow-2xl hover:shadow-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFBE29] to-[#FFD700] rounded-xl transition-all duration-500 group-hover:from-[#FFD700] group-hover:to-[#FFBE29]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Get Started</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardLink()}
                  className="relative flex items-center px-5 py-3 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <TrendingUp className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Dashboard</span>
                </Link>

                <Link
                  to="/communities"
                  className="relative flex items-center px-5 py-3 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <Users className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Communities</span>
                </Link>

                {userType === "citizen" && (
                  <Link
                    to="/complaint/submit"
                    className="relative px-6 py-3 ml-2 overflow-hidden font-semibold text-white transition-all duration-500 transform shadow-2xl group hover:-translate-y-1 hover:scale-105 rounded-xl hover:shadow-3xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00534E] to-[#008080] rounded-xl transition-all duration-500 group-hover:from-[#008080] group-hover:to-[#00534E]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    <span className="relative z-10">+ Report Issue</span>
                  </Link>
                )}

                <div className="flex items-center pl-4 ml-4 space-x-3 border-l border-white/30">
                  <div className="relative flex items-center px-4 py-2 space-x-2 transition-all duration-500 border rounded-full group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:backdrop-blur-lg">
                    <User className="h-4 w-4 text-[#FFBE29]" />
                    <span className="text-sm font-semibold text-white">
                      {user?.name || user?.email}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="relative flex items-center px-4 py-2 space-x-2 overflow-hidden text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    <LogOut className="relative z-10 w-4 h-4" />
                    <span className="relative z-10 text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-3 overflow-hidden text-white transition-all duration-500 border group rounded-xl hover:shadow-2xl border-white/40"
            >
              <div className="absolute inset-0 transition-all duration-500 bg-white/10 backdrop-blur-md rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <div className="relative z-10">
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
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
                {["Home", "About", "Contact"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="relative block px-5 py-4 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    <span className="relative z-10">{item}</span>
                  </Link>
                ))}

                <Link
                  to="/communities"
                  className="relative flex items-center block px-5 py-4 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <Users className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Communities</span>
                </Link>

                <Link
                  to="/citizen/login"
                  className="relative block px-5 py-4 overflow-hidden font-semibold text-white transition-all duration-500 border group rounded-xl hover:shadow-2xl border-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 transition-all duration-500 bg-white/10 backdrop-blur-md rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Login</span>
                </Link>

                <Link
                  to="/citizen/register"
                  className="group relative block px-5 py-4 font-semibold text-[#8D153A] transition-all duration-500 transform hover:-translate-y-0.5 rounded-xl shadow-2xl hover:shadow-3xl overflow-hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFBE29] to-[#FFD700] rounded-xl transition-all duration-500 group-hover:from-[#FFD700] group-hover:to-[#FFBE29]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Get Started</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardLink()}
                  className="relative flex items-center block px-5 py-4 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <TrendingUp className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Dashboard</span>
                </Link>

                <Link
                  to="/communities"
                  className="relative flex items-center block px-5 py-4 space-x-2 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <Users className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Communities</span>
                </Link>

                {userType === "citizen" && (
                  <Link
                    to="/complaint/submit"
                    className="group relative block px-5 py-4 font-semibold text-white transition-all duration-500 transform hover:-translate-y-0.5 rounded-xl shadow-2xl hover:shadow-3xl overflow-hidden"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00534E] to-[#008080] rounded-xl transition-all duration-500 group-hover:from-[#008080] group-hover:to-[#00534E]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    <span className="relative z-10">+ Report Issue</span>
                  </Link>
                )}

                <div className="relative flex items-center px-5 py-4 pt-3 mt-2 space-x-2 text-white border-t group border-white/30">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl"></div>
                  <User className="relative z-10 w-5 h-5" />
                  <span className="relative z-10 font-medium">
                    {user?.name || user?.email}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="relative flex items-center block w-full px-5 py-4 space-x-3 overflow-hidden font-semibold text-white transition-all duration-500 group rounded-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 transition-all duration-500 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl group-hover:bg-white/20 group-hover:backdrop-blur-lg group-hover:border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <LogOut className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        userName={user?.name || user?.email}
      />
    </nav>
  );
};

export default Navbar;