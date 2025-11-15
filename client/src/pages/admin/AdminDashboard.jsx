import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { statsAPI } from "../../api/api";
import { FileText, AlertTriangle, CheckCircle, Users, TrendingUp, Shield, Upload, BarChart3, Settings } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await statsAPI.getOverview();
      setStats(res.data.data);
    } catch (error) {
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Admin Dashboard
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Comprehensive system overview and real-time statistics for efficient platform management
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#8D153A] to-[#A52D5A] p-3 rounded-2xl shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#8D153A]" />
            </div>
            <p className="mb-2 text-3xl font-bold text-gray-900">{stats?.total || 0}</p>
            <p className="text-sm font-semibold text-gray-600">Total Complaints</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div className="bg-gradient-to-r from-[#8D153A] to-[#A52D5A] h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-3 rounded-2xl shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#D97706]" />
            </div>
            <p className="mb-2 text-3xl font-bold text-gray-900">{stats?.byStatus?.pending || 0}</p>
            <p className="text-sm font-semibold text-gray-600">Pending Complaints</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] h-2 rounded-full" style={{ width: `${((stats?.byStatus?.pending || 0) / (stats?.total || 1)) * 100}%` }}></div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#059669] to-[#10B981] p-3 rounded-2xl shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#059669]" />
            </div>
            <p className="mb-2 text-3xl font-bold text-gray-900">{stats?.byStatus?.resolved || 0}</p>
            <p className="text-sm font-semibold text-gray-600">Resolved Complaints</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div className="bg-gradient-to-r from-[#059669] to-[#10B981] h-2 rounded-full" style={{ width: `${((stats?.byStatus?.resolved || 0) / (stats?.total || 1)) * 100}%` }}></div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#DC2626] to-[#EF4444] p-3 rounded-2xl shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#DC2626]" />
            </div>
            <p className="mb-2 text-3xl font-bold text-gray-900">{stats?.byUrgency?.urgent || 0}</p>
            <p className="text-sm font-semibold text-gray-600">Urgent Priority</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] h-2 rounded-full" style={{ width: `${((stats?.byUrgency?.urgent || 0) / (stats?.total || 1)) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Additional Stats & Actions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Complaint Types */}
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h3 className="flex items-center mb-4 text-xl font-bold text-gray-800">
              <Users className="h-5 w-5 mr-2 text-[#8D153A]" />
              Complaint Types
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border bg-white/40 rounded-xl border-white/60">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#8D153A] rounded-full"></div>
                  <span className="font-medium text-gray-700">Anonymous</span>
                </div>
                <span className="text-lg font-bold text-[#8D153A]">{stats?.anonymous || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 border bg-white/40 rounded-xl border-white/60">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#00534E] rounded-full"></div>
                  <span className="font-medium text-gray-700">Registered Users</span>
                </div>
                <span className="text-lg font-bold text-[#00534E]">{stats?.registered || 0}</span>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-xl text-white text-center">
                <p className="text-sm font-semibold">
                  {((stats?.registered || 0) / (stats?.total || 1) * 100).toFixed(1)}% Registered Users
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h3 className="flex items-center mb-4 text-xl font-bold text-gray-800">
              <Settings className="h-5 w-5 mr-2 text-[#00534E]" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/admin/complaints"
                className="flex items-center justify-between p-3 transition-all duration-300 border group bg-white/40 rounded-xl border-white/60 hover:bg-white/60"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-[#8D153A]" />
                  <span className="font-medium text-gray-700">View All Complaints</span>
                </div>
                <div className="text-[#8D153A] group-hover:translate-x-1 transition-transform duration-300">→</div>
              </Link>

              <Link
                to="/admin/authorities"
                className="flex items-center justify-between p-3 transition-all duration-300 border group bg-white/40 rounded-xl border-white/60 hover:bg-white/60"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-[#00534E]" />
                  <span className="font-medium text-gray-700">Manage Authority Users</span>
                </div>
                <div className="text-[#00534E] group-hover:translate-x-1 transition-transform duration-300">→</div>
              </Link>

              <Link
                to="/admin/upload-csv"
                className="flex items-center justify-between p-3 transition-all duration-300 border group bg-white/40 rounded-xl border-white/60 hover:bg-white/60"
              >
                <div className="flex items-center space-x-3">
                  <Upload className="h-4 w-4 text-[#D97706]" />
                  <span className="font-medium text-gray-700">Upload CSV</span>
                </div>
                <div className="text-[#D97706] group-hover:translate-x-1 transition-transform duration-300">→</div>
              </Link>

              <Link
                to="/admin/analytics"
                className="flex items-center justify-between p-3 transition-all duration-300 border group bg-white/40 rounded-xl border-white/60 hover:bg-white/60"
              >
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-4 w-4 text-[#059669]" />
                  <span className="font-medium text-gray-700">View Analytics</span>
                </div>
                <div className="text-[#059669] group-hover:translate-x-1 transition-transform duration-300">→</div>
              </Link>

              <Link
                to="/admin/communities"
                className="flex items-center justify-between p-3 transition-all duration-300 border group bg-white/40 rounded-xl border-white/60 hover:bg-white/60"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-[#8D153A]" />
                  <span className="font-medium text-gray-700">Manage Communities</span>
                </div>
                <div className="text-[#8D153A] group-hover:translate-x-1 transition-transform duration-300">→</div>
              </Link>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-6 text-white">
            <h3 className="flex items-center mb-4 text-xl font-bold">
              <Shield className="h-5 w-5 mr-2 text-[#FFBE29]" />
              System Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/90">Platform Uptime</span>
                <span className="font-bold text-[#FFBE29]">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/90">Active Users</span>
                <span className="font-bold text-[#FFBE29]">{stats?.totalUsers || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/90">Response Time</span>
                <span className="font-bold text-[#FFBE29]">{"< 2s"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/90">Data Accuracy</span>
                <span className="font-bold text-[#FFBE29]">98.5%</span>
              </div>
            </div>
            <div className="p-3 mt-6 text-center bg-white/20 rounded-xl">
              <p className="text-sm font-semibold text-[#FFBE29]">
                All Systems Operational
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
          <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Platform Performance Metrics
          </h3>
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
            <div className="p-4">
              <div className="text-3xl font-bold text-[#8D153A] mb-2">
                {((stats?.byStatus?.resolved || 0) / (stats?.total || 1) * 100).toFixed(1)}%
              </div>
              <p className="text-sm font-semibold text-gray-600">Resolution Rate</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#00534E] mb-2">
                {stats?.avgResponseTime || "24"}h
              </div>
              <p className="text-sm font-semibold text-gray-600">Avg. Response Time</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#D97706] mb-2">
                {((stats?.byUrgency?.urgent || 0) / (stats?.total || 1) * 100).toFixed(1)}%
              </div>
              <p className="text-sm font-semibold text-gray-600">Urgent Cases</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;