import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authorityAPI, statsAPI } from '../../api/api';
import StatCard from '../../components/StatCard';
import ComplaintCard from '../../components/ComplaintCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FileText, AlertTriangle, CheckCircle, Clock, Building2, Users, Target, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AuthorityDashboard = () => {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urgentCount, setUrgentCount] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
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
      
      // Calculate urgent complaints count
      const urgentComplaints = (complaintsRes.data.data.complaints || []).filter(
        c => c.urgency === 'critical' || c.urgency === 'urgent'
      );
      setUrgentCount(urgentComplaints.length);
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
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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
                <Building2 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Authority Dashboard
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Overview of assigned complaints and authority management
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="300">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
              <Users className="h-10 w-10 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
              <div className="mb-1 text-3xl font-bold">{stats?.total || 0}</div>
              <div className="text-sm font-semibold text-white/90">Total Complaints</div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
              <Clock className="h-10 w-10 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
              <div className="mb-1 text-3xl font-bold">{stats?.byStatus?.pending || 0}</div>
              <div className="text-sm font-semibold text-white/90">Pending</div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#00534E] to-[#008080] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
              <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
              <div className="mb-1 text-3xl font-bold">{stats?.byStatus?.inProgress || 0}</div>
              <div className="text-sm font-semibold text-white/90">In Progress</div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#059669] to-[#10B981] rounded-3xl shadow-2xl p-6 text-white text-center group hover:scale-105 transition-transform duration-300">
              <CheckCircle className="h-10 w-10 mx-auto mb-3 text-[#FFBE29] group-hover:scale-110 transition-transform duration-300" />
              <div className="mb-1 text-3xl font-bold">{stats?.byStatus?.resolved || 0}</div>
              <div className="text-sm font-semibold text-white/90">Resolved</div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" data-aos="fade-up" data-aos-delay="400">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-6 text-white group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8 text-[#FFBE29]" />
                <div className="text-4xl font-bold">{urgentCount}</div>
              </div>
              <div className="text-sm font-semibold text-white/90">Urgent Cases</div>
              <p className="mt-2 text-xs text-white/70">Requires immediate attention</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#00534E] to-[#008080] rounded-3xl shadow-2xl p-6 text-white group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-[#FFBE29]" />
                <div className="text-4xl font-bold">
                  {stats?.byStatus?.resolved || 0 > 0 ? 
                    Math.round(((stats?.byStatus?.resolved || 0) / (stats?.total || 1)) * 100) : 0}%
                </div>
              </div>
              <div className="text-sm font-semibold text-white/90">Resolution Rate</div>
              <p className="mt-2 text-xs text-white/70">Percentage of resolved cases</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-3xl shadow-2xl p-6 text-white group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <Shield className="h-8 w-8 text-[#FFBE29]" />
                <div className="text-4xl font-bold">
                  {stats?.byStatus?.inProgress || 0 > 0 ? 
                    Math.round(((stats?.byStatus?.inProgress || 0) / (stats?.total || 1)) * 100) : 0}%
                </div>
              </div>
              <div className="text-sm font-semibold text-white/90">Active Cases</div>
              <p className="mt-2 text-xs text-white/70">Currently being processed</p>
            </div>
          </div>
        </div>

        {/* Recent Complaints */}
        <div 
          className="p-6 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recent Complaints</h2>
            </div>
            <Link
              to="/authority/complaints"
              className="group relative bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-2 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>View All</span>
                <span className="transition-transform duration-300 transform group-hover:translate-x-2">→</span>
              </span>
            </Link>
          </div>
          
          {complaints.length === 0 ? (
            <div className="p-12 text-center border bg-white/40 border-white/60 rounded-2xl">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-semibold text-gray-700">No complaints assigned yet</p>
              <p className="mt-2 text-gray-600">Check back later for new assignments</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {complaints.map((complaint, index) => (
                <div 
                  key={complaint._id} 
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay={600 + (index * 100)}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative">
                    <ComplaintCard
                      complaint={complaint}
                      showActions={true}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div 
          className="p-6 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <div className="flex items-center mb-6 space-x-3">
            <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              to="/authority/complaints"
              className="group relative bg-gradient-to-r from-[#00534E] to-[#008080] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <FileText className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
              <div className="font-bold">Manage Complaints</div>
              <p className="mt-2 text-sm text-white/90">View and process all assigned complaints</p>
            </Link>
            
            <Link
              to="/authority/reports"
              className="group relative bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <Target className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
              <div className="font-bold">Generate Reports</div>
              <p className="mt-2 text-sm text-white/90">Create detailed performance reports</p>
            </Link>
            
            <Link
              to="/authority/settings"
              className="group relative bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <Building2 className="h-8 w-8 mx-auto mb-3 text-[#FFBE29]" />
              <div className="font-bold">Authority Settings</div>
              <p className="mt-2 text-sm text-white/90">Configure your authority preferences</p>
            </Link>
          </div>
        </div>
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

export default AuthorityDashboard;