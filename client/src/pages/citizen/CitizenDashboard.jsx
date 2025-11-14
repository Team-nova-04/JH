import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../../api/api';
import ComplaintCard from '../../components/ComplaintCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FileText, Plus, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await complaintAPI.getMyComplaints();
      const complaintsData = res.data.data.complaints || [];
      setComplaints(complaintsData);
      
      // Calculate stats
      setStats({
        total: complaintsData.length,
        pending: complaintsData.filter(c => c.status === 'pending').length,
        resolved: complaintsData.filter(c => c.status === 'resolved').length,
        inProgress: complaintsData.filter(c => c.status === 'in_progress').length
      });
    } catch (error) {
      toast.error('Failed to load complaints');
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
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#FEF3C7' : '#FDE68A'
              }${i % 3 === 0 ? '30' : '20'}, transparent)`,
              filter: 'blur(30px)',
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `#8D153A`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto space-y-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center" data-aos="fade-down">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-lg opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#FCD34D] to-[#FDE68A] p-3 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-[#8D153A]" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-3">
            My Complaints Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            Track and manage all your submitted complaints in one place
          </p>
        </div>

        {/* Stats Cards */}
        {complaints.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
            <div className="p-6 border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Complaints</p>
                  <p className="text-3xl font-bold text-[#8D153A] mt-2">{stats.total}</p>
                </div>
                <div className="p-3 bg-[#8D153A]/10 rounded-xl">
                  <FileText className="w-6 h-6 text-[#8D153A]" />
                </div>
              </div>
            </div>

            <div className="p-6 border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-[#D97706] mt-2">{stats.pending}</p>
                </div>
                <div className="p-3 bg-[#D97706]/10 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-[#D97706]" />
                </div>
              </div>
            </div>

            <div className="p-6 border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-[#00534E] mt-2">{stats.inProgress}</p>
                </div>
                <div className="p-3 bg-[#00534E]/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-[#00534E]" />
                </div>
              </div>
            </div>

            <div className="p-6 border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-[#059669] mt-2">{stats.resolved}</p>
                </div>
                <div className="p-3 bg-[#059669]/10 rounded-xl">
                  <Shield className="w-6 h-6 text-[#059669]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-8 border shadow-xl bg-white/20 backdrop-blur-md border-white/30 rounded-3xl">
          <div className="flex flex-col mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Complaints</h2>
              <p className="mt-2 text-gray-600">Monitor the status of all your submitted issues</p>
            </div>
            <Link
              to="/complaint/submit"
              className="group mt-4 lg:mt-0 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-8 py-3 rounded-xl font-semibold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 w-fit"
            >
              <Plus className="w-5 h-5" />
              <span>Submit New Complaint</span>
            </Link>
          </div>

          {complaints.length === 0 ? (
            <div className="p-12 text-center border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-2xl">
              <FileText className="w-20 h-20 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-3 text-2xl font-semibold text-gray-800">No complaints yet</h3>
              <p className="mb-8 text-lg text-gray-600">Start by submitting your first complaint to get assistance</p>
              <Link
                to="/complaint/submit"
                className="inline-block bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Submit Your First Complaint
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {complaints.map((complaint, index) => (
                <div 
                  key={complaint._id} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                >
                  <Link to={`/citizen/complaints/${complaint._id}`}>
                    <ComplaintCard complaint={complaint} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          50% {
            transform: translateY(-8px) translateX(-8px);
          }
          75% {
            transform: translateY(-12px) translateX(4px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CitizenDashboard;