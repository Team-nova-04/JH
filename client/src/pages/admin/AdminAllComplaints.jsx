import { useEffect, useState } from 'react';
import { adminAPI } from '../../api/api';
import ComplaintCard from '../../components/ComplaintCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUS } from '../../utils/constants';
import { Filter, Search, Shield, AlertTriangle, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    fetchComplaints();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#FEF3C7' : '#FDE68A'}${i % 3 === 0 ? '30' : '20'}, transparent)`,
              filter: 'blur(40px)',
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `#8D153A`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center" data-aos="fade-down" data-aos-delay="200">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            All Complaints
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Manage all system complaints ({total} total)
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
            <Users className="h-8 w-8 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
            <div className="mb-1 text-2xl font-bold">{total}</div>
            <div className="text-sm font-semibold text-white/90">Total Complaints</div>
          </div>
          <div className="bg-gradient-to-r from-[#00534E] to-[#008080] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
            <Target className="h-8 w-8 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
            <div className="mb-1 text-2xl font-bold">{COMPLAINT_CATEGORIES.length}</div>
            <div className="text-sm font-semibold text-white/90">Categories</div>
          </div>
          <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
            <Filter className="h-8 w-8 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
            <div className="mb-1 text-2xl font-bold">{authorityOptions.length}</div>
            <div className="text-sm font-semibold text-white/90">Authorities</div>
          </div>
          <div className="bg-gradient-to-r from-[#059669] to-[#10B981] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
            <div className="mb-1 text-2xl font-bold">
              {complaints.filter(c => c.urgency === 'critical' || c.urgency === 'urgent').length}
            </div>
            <div className="text-sm font-semibold text-white/90">Urgent Cases</div>
          </div>
        </div>

        {/* Filters */}
        <div 
          className="p-6 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex items-center mb-6 space-x-3">
            <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Filters</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-c-5">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="relative w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">All Status</option>
                {Object.values(COMPLAINT_STATUS).map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <select
                value={filters.urgency}
                onChange={(e) => handleFilterChange('urgency', e.target.value)}
                className="relative w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">All Urgency</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="relative w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">All Categories</option>
                {COMPLAINT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <select
                value={filters.assignedAuthority}
                onChange={(e) => handleFilterChange('assignedAuthority', e.target.value)}
                className="relative w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 backdrop-blur-sm transition-all duration-300"
              >
                <option value="">All Authorities</option>
                {authorityOptions.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Filter by location..."
                  className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="flex justify-center py-12" data-aos="fade-in" data-aos-delay="500">
            <LoadingSpinner size="lg" />
          </div>
        ) : complaints.length === 0 ? (
          <div 
            className="p-12 text-center border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="inline-block p-4 mb-4 bg-white/40 rounded-2xl">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-700">No complaints found</p>
            <p className="mt-2 text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6" data-aos="fade-up" data-aos-delay="500">
            {complaints.map((complaint, index) => (
              <div 
                key={complaint._id} 
                className="relative group"
                data-aos="fade-up"
                data-aos-delay={600 + (index * 100)}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative">
                  <ComplaintCard complaint={complaint} showActions={false} />
                  <div className="absolute flex space-x-2 top-6 right-6">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-full text-sm font-semibold shadow-lg">
                      {complaint.assignedAuthority?.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > filters.limit && (
          <div 
            className="flex items-center justify-center space-x-4"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <button
              onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
              disabled={filters.page === 1}
              className="group relative px-6 py-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <span className="relative z-10">Previous</span>
            </button>
            
            <span className="px-4 py-2 text-lg font-semibold text-gray-700 bg-white/60 backdrop-blur-sm rounded-xl">
              Page {filters.page} of {Math.ceil(total / filters.limit)}
            </span>
            
            <button
              onClick={() =>
                setFilters({ ...filters, page: Math.min(Math.ceil(total / filters.limit), filters.page + 1) })
              }
              disabled={filters.page >= Math.ceil(total / filters.limit)}
              className="group relative px-6 py-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <span className="relative z-10">Next</span>
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminAllComplaints;