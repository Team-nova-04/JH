import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { statsAPI } from "../../api/api";
import StatCard from "../../components/StatCard";
import { FileText, AlertTriangle, CheckCircle, Users } from "lucide-react";
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
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">System overview and statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Complaints"
          value={stats?.total || 0}
          icon={FileText}
          color="primary"
        />
        <StatCard
          title="Pending"
          value={stats?.byStatus?.pending || 0}
          icon={AlertTriangle}
          color="yellow"
        />
        <StatCard
          title="Resolved"
          value={stats?.byStatus?.resolved || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Urgent"
          value={stats?.byUrgency?.urgent || 0}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Complaint Types
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Anonymous</span>
              <span className="font-semibold">{stats?.anonymous || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Registered</span>
              <span className="font-semibold">{stats?.registered || 0}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              to="/admin/complaints"
              className="block text-primary-600 hover:text-primary-700 font-medium"
            >
              View All Complaints →
            </Link>
            <Link
              to="/admin/authorities"
              className="block text-primary-600 hover:text-primary-700 font-medium"
            >
              Manage Authority Users →
            </Link>
            <Link
              to="/admin/upload-csv"
              className="block text-primary-600 hover:text-primary-700 font-medium"
            >
              Upload CSV →
            </Link>
            <Link
              to="/admin/analytics"
              className="block text-primary-600 hover:text-primary-700 font-medium"
            >
              View Analytics →
            </Link>
            <Link
              to="/admin/communities"
              className="block text-primary-600 hover:text-primary-700 font-medium"
            >
              Manage Communities →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
