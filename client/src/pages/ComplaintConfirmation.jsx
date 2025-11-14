import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, MapPin, AlertTriangle, Shield, FileText, Clock, TrendingUp } from 'lucide-react';
import { AUTHORITY_LABELS, getUrgencyLevel, URGENCY_LABELS, URGENCY_COLORS } from '../utils/constants';

const ComplaintConfirmation = () => {
  const location = useLocation();
  const complaint = location.state?.complaint;

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-700">No complaint data found</p>
          <Link 
            to="/complaint/submit" 
            className="inline-block bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Submit a new complaint
          </Link>
        </div>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#FEF3C7' : '#FDE68A'}30, transparent)`,
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute rounded-full -inset-4 bg-green-500/20 blur-xl"></div>
              <div className="relative p-6 shadow-2xl bg-gradient-to-br from-green-400 to-green-600 rounded-3xl">
                <CheckCircle className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Complaint Submitted Successfully!
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-700">
            Your complaint has been received and is being processed by our AI system
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Complaint Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Complaint Summary Card */}
            <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                <FileText className="h-6 w-6 mr-3 text-[#8D153A]" />
                Complaint Summary
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Complaint ID</p>
                  <p className="text-lg font-bold text-[#8D153A]">{complaint._id || complaint.id}</p>
                </div>
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Status</p>
                  <p className="text-lg font-bold text-[#00534E] capitalize">{complaint.status}</p>
                </div>
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="flex items-center mb-2 text-sm font-semibold text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-[#8D153A]" />
                    Location
                  </p>
                  <p className="font-medium text-gray-800">{complaint.location}</p>
                </div>
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Category</p>
                  <p className="font-medium text-gray-800 capitalize">{complaint.category || 'Auto-detected by AI'}</p>
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                <AlertTriangle className="h-6 w-6 mr-3 text-[#00534E]" />
                What Happens Next?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60">
                  <div className="bg-[#8D153A]/10 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-[#8D153A]" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-gray-800">AI Analysis Complete</p>
                    <p className="text-gray-700">Our AI has analyzed your complaint for urgency and category</p>
                  </div>
                </div>
                <div className="flex items-start p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60">
                  <div className="bg-[#00534E]/10 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-[#00534E]" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-gray-800">Authority Assigned</p>
                    <p className="text-gray-700">Complaint routed to the appropriate government authority</p>
                  </div>
                </div>
                <div className="flex items-start p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60">
                  <div className="bg-[#D97706]/10 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-gray-800">Track Progress</p>
                    <p className="text-gray-700">Monitor your complaint status in the dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Status & Actions */}
          <div className="space-y-8">
            {/* Urgency & Authority Card */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Status Overview</h3>
              <div className="space-y-4">
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Urgency Level</p>
                  <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold border-2 ${urgencyColor}`}>
                    {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="flex items-center mb-2 text-sm font-semibold text-gray-600">
                    <Shield className="h-4 w-4 mr-2 text-[#8D153A]" />
                    Assigned Authority
                  </p>
                  <p className="font-medium text-gray-800">
                    {AUTHORITY_LABELS[complaint.assignedAuthority] || complaint.assignedAuthority}
                  </p>
                </div>
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">AI Confidence</p>
                  <div className="w-full h-3 rounded-full bg-white/60">
                    <div 
                      className="bg-gradient-to-r from-[#8D153A] to-[#00534E] h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(complaint.categoryConfidence * 100) || 85}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    {((complaint.categoryConfidence * 100) || 85).toFixed(0)}% accurate
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons Card */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Next Actions</h3>
              <div className="space-y-4">
                <Link
                  to="/complaint/submit"
                  className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-4 px-6 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <FileText className="w-5 h-5" />
                  <span>Submit Another Complaint</span>
                </Link>
                
                <Link
                  to="/citizen/dashboard"
                  className="relative flex items-center justify-center w-full px-6 py-4 space-x-2 font-bold text-gray-800 transition-all duration-500 transform border shadow-lg group bg-white/60 backdrop-blur-md rounded-xl border-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-1"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>View Dashboard</span>
                </Link>

                <div className="pt-4 text-center border-t border-white/60">
                  <p className="text-sm text-gray-600">
                    Need help?{' '}
                    <Link to="/contact" className="text-[#8D153A] font-semibold hover:underline">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-2">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-semibold text-[#8D153A]">24-48 hours</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-gray-600">Resolution Rate</span>
                  <span className="font-semibold text-[#00534E]">92%</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-gray-600">Citizen Satisfaction</span>
                  <span className="font-semibold text-[#D97706]">4.5/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintConfirmation;