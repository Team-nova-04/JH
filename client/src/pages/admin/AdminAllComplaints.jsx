import { useEffect, useState } from 'react';
import { adminAPI } from '../../api/api';
import ComplaintCard from '../../components/ComplaintCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUS } from '../../utils/constants';
import { Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    urgency: '',
    category: '',
    location: '',
    assignedAuthority: '',
    page: 1,
    limit: 20,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchComplaints();
  }, [filters]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getAllComplaints(filters);
      setComplaints(res.data.data.complaints || []);
      setTotal(res.data.data.total || 0);
    } catch (error) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const authorityOptions = [
    'municipal_council',
    'water_board',
    'ceb',
    'rda',
    'police_safety',
    'disaster_management',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Complaints</h1>
        <p className="text-gray-600 mt-1">Manage all system complaints ({total} total)</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-700">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            {Object.values(COMPLAINT_STATUS).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filters.urgency}
            onChange={(e) => handleFilterChange('urgency', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Urgency</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {COMPLAINT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filters.assignedAuthority}
            onChange={(e) => handleFilterChange('assignedAuthority', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Authorities</option>
            {authorityOptions.map((auth) => (
              <option key={auth} value={auth}>
                {auth.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            placeholder="Filter by location..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Complaints List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : complaints.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-600">No complaints found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="relative">
              <ComplaintCard complaint={complaint} showActions={false} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {complaint.assignedAuthority?.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > filters.limit && (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
            disabled={filters.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {filters.page} of {Math.ceil(total / filters.limit)}
          </span>
          <button
            onClick={() =>
              setFilters({ ...filters, page: Math.min(Math.ceil(total / filters.limit), filters.page + 1) })
            }
            disabled={filters.page >= Math.ceil(total / filters.limit)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAllComplaints;

