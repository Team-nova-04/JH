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
import { BarChart3, TrendingUp, MapPin, AlertTriangle } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
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
      // API returns { data: { stats: [...] } }
      const categoryRawStats = categoryRes.data.data?.stats || [];
      const categoryData = categoryRawStats.map((stat) => ({
        name: (stat._id || "Unknown")
          .replace("_", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: stat.count || 0,
      }));
      setCategoryStats(categoryData);

      // Format location stats (top 10)
      // API returns { data: { stats: [...] } }
      const locationRawStats = locationRes.data.data?.stats || [];
      const locationData = locationRawStats
        .map((stat) => ({
          name: stat._id || "Unknown",
          value: stat.count || 0,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);
      setLocationStats(locationData);

      // Handle urgentStats - ensure it has the right structure
      const urgentData = urgentRes.data.data || {};
      console.log("Raw urgent data from API:", urgentData);
      console.log("Urgent data keys:", Object.keys(urgentData));
      console.log("Urgent data values:", Object.values(urgentData));
      console.log(
        "Urgent data structure:",
        JSON.stringify(urgentData, null, 2)
      );

      // The API returns { urgent: {count, complaints}, critical: {count, complaints} }
      // We need to extract the count values
      const criticalCount = urgentData.critical?.count || 0;
      const urgentCount = urgentData.urgent?.count || 0;

      setUrgentStats({
        critical: criticalCount,
        urgent: urgentCount,
      });

      // Format trends data
      // API returns { data: { trends: [...] } }
      const trendsRawData = trendsRes.data.data?.trends || [];

      console.log("Raw trends data from API:", trendsRawData);

      const trendsData = trendsRawData.map((item) => ({
        date: item._id || "N/A",
        count: item.count || 0,
      }));

      console.log("Formatted trends data:", trendsData);
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
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="mt-1 text-gray-600">
          Comprehensive insights and statistics
        </p>
      </div>

      {/* Urgent Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Complaints</p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {urgentStats.critical}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent Complaints</p>
              <p className="mt-1 text-2xl font-bold text-orange-600">
                {urgentStats.urgent}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Urgent</p>
              <p className="mt-1 text-2xl font-bold text-purple-600">
                {urgentStats.critical + urgentStats.urgent}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
            <BarChart3 className="w-5 h-5 mr-2" />
            Complaints by Category
          </h2>
          {categoryStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="py-12 text-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Category Bar Chart */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Category Breakdown
          </h2>
          {categoryStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="py-12 text-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Location Stats */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
          <MapPin className="w-5 h-5 mr-2" />
          Top Locations (Last 7 Days)
        </h2>
        {locationStats.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No data available
          </div>
        )}
      </div>

      {/* Trends */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
          <TrendingUp className="w-5 h-5 mr-2" />
          Complaint Trends (Last 7 Days)
        </h2>
        {trends.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                name="Complaints"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
