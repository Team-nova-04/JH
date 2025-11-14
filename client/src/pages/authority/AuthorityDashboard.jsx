import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authorityAPI, statsAPI } from '../../api/api';
import StatCard from '../../components/StatCard';
import ComplaintCard from '../../components/ComplaintCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthorityDashboard = () => {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, complaintsRes] = await Promise.all([
        statsAPI.getOverview(),
        authorityAPI.getComplaints({ limit: 5 }),
      ]);
      setStats(statsRes.data.data);
      setComplaints(complaintsRes.data.data.complaints || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await authorityAPI.updateStatus(id, status);
      toast.success('Status updated successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
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
        <h1 className="text-3xl font-bold text-gray-900">Authority Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of assigned complaints</p>
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
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="In Progress"
          value={stats?.byStatus?.inProgress || 0}
          icon={AlertTriangle}
          color="purple"
        />
        <StatCard
          title="Resolved"
          value={stats?.byStatus?.resolved || 0}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Recent Complaints */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Complaints</h2>
          <Link
            to="/authority/complaints"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>
        {complaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No complaints assigned yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                showActions={true}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorityDashboard;

