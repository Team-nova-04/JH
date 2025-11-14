import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../../api/api';
import ComplaintCard from '../../components/ComplaintCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FileText, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await complaintAPI.getMyComplaints();
      setComplaints(res.data.data.complaints || []);
    } catch (error) {
      toast.error('Failed to load complaints');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-600 mt-1">Track and manage your submitted complaints</p>
        </div>
        <Link
          to="/complaint/submit"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Submit New Complaint</span>
        </Link>
      </div>

      {complaints.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No complaints yet</h3>
          <p className="text-gray-600 mb-6">Start by submitting your first complaint</p>
          <Link
            to="/complaint/submit"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Submit Complaint
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {complaints.map((complaint) => (
            <Link key={complaint._id} to={`/citizen/complaints/${complaint._id}`}>
              <ComplaintCard complaint={complaint} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;

