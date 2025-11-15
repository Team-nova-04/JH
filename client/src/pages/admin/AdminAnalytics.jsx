import { useEffect, useState } from "react";
import { statsAPI } from "../../api/api";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, MapPin, AlertTriangle, Shield, Target, Users } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

const COLORS = [
  "#8D153A",
  "#00534E",
  "#D97706",
  "#059669",
  "#DC2626",
  "#7C3AED",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16"
];

const AdminAnalytics = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [locationStats, setLocationStats] = useState([]);
  const [urgentStats, setUrgentStats] = useState({ critical: 0, urgent: 0 });
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    try {
      setLoading(true);
      const [categoryRes, locationRes, urgentRes, trendsRes] =
        await Promise.all([
          statsAPI.getCategoryStats(),
          statsAPI.getLocationStats(),
          statsAPI.getUrgentStats(),
          statsAPI.getTrends(7),
        ]);

      // Format category stats
      const categoryRawStats = categoryRes.data.data?.stats || [];
      const categoryData = categoryRawStats.map((stat) => ({
        name: (stat._id || "Unknown")
          .replace("_", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: stat.count || 0,
      }));
      setCategoryStats(categoryData);

      // Format location stats (top 10)
      const locationRawStats = locationRes.data.data?.stats || [];
      const locationData = locationRawStats
        .map((stat) => ({
          name: stat._id || "Unknown",
          value: stat.count || 0,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
      setLocationStats(locationData);

      // Handle urgentStats
      const urgentData = urgentRes.data.data || {};
      const criticalCount = urgentData.critical?.count || 0;
      const urgentCount = urgentData.urgent?.count || 0;

      setUrgentStats({
        critical: criticalCount,
        urgent: urgentCount,
      });

      // Format trends data
      const trendsRawData = trendsRes.data.data?.trends || [];
      const trendsData = trendsRawData.map((item) => ({
        date: item._id || "N/A",
        count: item.count || 0,
      }));
      setTrends(trendsData);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      toast.error("Failed to load analytics data");
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

  const totalComplaints = categoryStats.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Analytics Dashboard
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Comprehensive insights and statistics for data-driven decision making
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-6 text-white text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
            <div className="mb-1 text-2xl font-bold">{totalComplaints}</div>
            <div className="text-sm font-semibold text-white/90">Total Complaints</div>
          </div>
          <div className="bg-gradient-to-r from-[#00534E] to-[#008080] rounded-3xl shadow-2xl p-6 text-white text-center">
            <Target className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
            <div className="mb-1 text-2xl font-bold">{categoryStats.length}</div>
            <div className="text-sm font-semibold text-white/90">Categories</div>
          </div>
          <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-3xl shadow-2xl p-6 text-white text-center">
            <MapPin className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
            <div className="mb-1 text-2xl font-bold">{locationStats.length}</div>
            <div className="text-sm font-semibold text-white/90">Active Locations</div>
          </div>
          <div className="bg-gradient-to-r from-[#059669] to-[#10B981] rounded-3xl shadow-2xl p-6 text-white text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
            <div className="mb-1 text-2xl font-bold">{trends.length}</div>
            <div className="text-sm font-semibold text-white/90">Days Tracked</div>
          </div>
        </div>

        {/* Urgent Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Critical Complaints</p>
                <p className="mt-2 text-3xl font-bold text-red-600">
                  {urgentStats.critical}
                </p>
                <p className="mt-1 text-xs text-gray-500">Require immediate action</p>
              </div>
              <div className="p-3 bg-red-100 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Urgent Complaints</p>
                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {urgentStats.urgent}
                </p>
                <p className="mt-1 text-xs text-gray-500">High priority attention</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Urgent</p>
                <p className="mt-2 text-3xl font-bold text-purple-600">
                  {urgentStats.critical + urgentStats.urgent}
                </p>
                <p className="mt-1 text-xs text-gray-500">Combined urgent cases</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Category Distribution Pie Chart */}
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
              <Target className="h-6 w-6 mr-3 text-[#8D153A]" />
              Complaints by Category
            </h2>
            {categoryStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} complaints`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="py-16 text-center border bg-white/40 rounded-2xl border-white/60">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="font-semibold text-gray-700">No category data available</p>
              </div>
            )}
          </div>

          {/* Category Bar Chart */}
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
              <Shield className="h-6 w-6 mr-3 text-[#00534E]" />
              Category Breakdown
            </h2>
            {categoryStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} complaints`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="value" fill="#8D153A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="py-16 text-center border bg-white/40 rounded-2xl border-white/60">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="font-semibold text-gray-700">No category data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Location Stats */}
        <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
          <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
            <MapPin className="h-6 w-6 mr-3 text-[#D97706]" />
            Top Locations (Last 7 Days)
          </h2>
          {locationStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={locationStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} complaints`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Bar dataKey="value" fill="#00534E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="py-16 text-center border bg-white/40 rounded-2xl border-white/60">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="font-semibold text-gray-700">No location data available</p>
            </div>
          )}
        </div>

        {/* Trends */}
        <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
          <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
            <TrendingUp className="h-6 w-6 mr-3 text-[#059669]" />
            Complaint Trends (Last 7 Days)
          </h2>
          {trends.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8D153A" 
                  strokeWidth={3}
                  dot={{ fill: '#8D153A', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#00534E' }}
                  name="Daily Complaints"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="py-16 text-center border bg-white/40 rounded-2xl border-white/60">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="font-semibold text-gray-700">No trend data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;