import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Users,
  Upload,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import LogoutConfirmModal from "../components/LogoutConfirmModal";

const DashboardLayout = ({ children }) => {
  const { userType, user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const getMenuItems = () => {
    if (userType === "authority") {
      return [
        {
          path: "/authority/dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          color: "from-[#8D153A] to-[#00534E]",
        },
        { 
          path: "/authority/complaints", 
          label: "Complaints", 
          icon: FileText,
          color: "from-[#00534E] to-[#008080]",
        },
      ];
    }
    if (userType === "admin") {
      return [
        { 
          path: "/admin/dashboard", 
          label: "Dashboard", 
          icon: LayoutDashboard,
          color: "from-[#8D153A] to-[#00534E]",
        },
        { 
          path: "/admin/complaints", 
          label: "All Complaints", 
          icon: FileText,
          color: "from-[#00534E] to-[#008080]",
        },
        { 
          path: "/admin/authorities", 
          label: "Authority Users", 
          icon: Users,
          color: "from-[#D97706] to-[#F59E0B]",
        },
        { 
          path: "/admin/communities", 
          label: "Communities", 
          icon: Users,
          color: "from-[#059669] to-[#10B981]",
        },
        { 
          path: "/admin/upload-csv", 
          label: "Upload CSV", 
          icon: Upload,
          color: "from-[#DC2626] to-[#EF4444]",
        },
        { 
          path: "/admin/analytics", 
          label: "Analytics", 
          icon: BarChart3,
          color: "from-[#7C3AED] to-[#8B5CF6]",
        },
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/20 backdrop-blur-md border-r border-white/40 shadow-2xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:transition-none`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/40">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur opacity-60"></div>
                <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-2 rounded-2xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text text-transparent">
                  CivicSense
                </span>
                <p className="text-xs font-medium text-gray-600">Admin Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-600 transition-colors lg:hidden bg-white/40 rounded-xl hover:text-gray-800 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-white/40">
            <div className="p-3 border bg-white/40 backdrop-blur-sm rounded-xl border-white/60">
              <p className="font-semibold text-gray-800">
                {user?.name || user?.email}
              </p>
              <p className="mt-1 text-sm text-gray-600 capitalize">{userType}</p>
              {user?.role && (
                <p className="text-xs text-gray-500 capitalize mt-1 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-transparent bg-clip-text font-medium">
                  {user.role.replace("_", " ")}
                </p>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-white/40 backdrop-blur-md shadow-lg"
                      : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-md`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className={`font-medium text-sm ${
                    isActive ? "text-gray-800" : "text-gray-700"
                  } group-hover:text-gray-900`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout - Fixed at bottom */}
          <div className="p-4 mt-auto border-t border-white/40">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 space-x-3 transition-all duration-300 border group bg-white/20 backdrop-blur-sm hover:bg-red-50/50 rounded-xl border-white/40 hover:border-red-200/50"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#EF4444] shadow-md">
                <LogOut className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-red-600 group-hover:text-red-700">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-80">
        {/* Top Bar */}
        <div className="flex items-center h-16 px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 transition-all duration-300 border lg:hidden bg-white/40 backdrop-blur-md rounded-xl hover:text-gray-800 border-white/40 hover:border-white/60"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Welcome Message */}
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text text-transparent">
              Welcome back, {user?.name?.split(' ')[0] || 'Admin'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">Manage your dashboard and monitor system activities</p>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <div className="rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        userName={user?.name || user?.email}
      />
    </div>
  );
};

export default DashboardLayout;