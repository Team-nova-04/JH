import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authorityAPI, complaintAPI } from '../../api/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  MessageSquare,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Shield,
  Building2,
  Search,
  Target,
  Zap,
  Eye,
  RefreshCw,
} from 'lucide-react';
import {
  STATUS_LABELS,
  STATUS_COLORS,
  URGENCY_LABELS,
  URGENCY_COLORS,
  AUTHORITY_LABELS,
  getUrgencyLevel,
  formatDate,
} from '../../utils/constants';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteContent, setNoteContent] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [requestingIdentity, setRequestingIdentity] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await authorityAPI.getComplaintById(id);
      setComplaint(res.data.data.complaint);
    } catch (error) {
      toast.error('Failed to load complaint details');
      navigate('/authority/complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setUpdatingStatus(true);
      await authorityAPI.updateStatus(id, status);
      toast.success('Status updated successfully');
      fetchComplaint();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) {
      toast.error('Note content is required');
      return;
    }

    try {
      setAddingNote(true);
      await authorityAPI.addNote(id, noteContent);
      toast.success('Note added successfully');
      setNoteContent('');
      fetchComplaint();
    } catch (error) {
      toast.error('Failed to add note');
    } finally {
      setAddingNote(false);
    }
  };

  const handleRefresh = () => {
    fetchComplaint();
    toast.success('Refreshing complaint data...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700">Complaint not found</p>
          <button
            onClick={() => navigate('/authority/complaints')}
            className="mt-6 group relative bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-3 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ArrowLeft className="inline-block w-5 h-5 mr-2" />
            Back to Complaints
          </button>
        </div>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;
  const statusColor = STATUS_COLORS[complaint.status] || STATUS_COLORS.pending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
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
        {[...Array(10)].map((_, i) => (
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

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8" data-aos="fade-down" data-aos-delay="200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/authority/complaints')}
              className="group relative p-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-2xl hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text">
                Complaint Details
              </h1>
              <div className="flex items-center mt-2 space-x-3">
                <p className="text-gray-700">ID: {complaint._id}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg ${statusColor}`}>
                    {STATUS_LABELS[complaint.status]}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border shadow-lg ${urgencyColor}`}>
                    {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              className="group p-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg"
              title="Refresh complaint data"
            >
              <RefreshCw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description Card */}
            <div 
              className="p-8 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Description</h2>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Submitted: {formatDate(complaint.submittedAt)}
                </div>
              </div>
              <div className="p-6 border bg-white/60 backdrop-blur-sm rounded-2xl border-white/40">
                <p className="leading-relaxed text-gray-800 whitespace-pre-wrap">{complaint.description}</p>
                {complaint.imageUrl && (
                  <div className="mt-6">
                    <div className="flex items-center mb-3 space-x-2">
                      <Eye className="h-4 w-4 text-[#8D153A]" />
                      <span className="font-medium text-gray-700">Supporting Image</span>
                    </div>
                    <img
                      src={`http://localhost:5000${complaint.imageUrl}`}
                      alt="Complaint"
                      className="h-auto max-w-full shadow-lg rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* AI Analysis Card */}
            <div 
              className="p-8 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex items-center mb-6 space-x-3">
                <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">AI Analysis</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#00534E] to-[#008080] rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Category</span>
                    <span className="text-2xl font-bold">{complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Target className="w-4 h-4 mr-2" />
                    <span>Confidence: {(complaint.categoryConfidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] rounded-2xl p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Sentiment</span>
                    <span className="text-2xl font-bold">{complaint.sentiment.charAt(0).toUpperCase() + complaint.sentiment.slice(1)}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>Score: {(complaint.sentimentScore * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              
              {complaint.summary && (
                <div className="p-6 mt-6 border bg-white/60 backdrop-blur-sm rounded-2xl border-white/40">
                  <div className="flex items-center mb-3 space-x-2">
                    <Search className="h-5 w-5 text-[#8D153A]" />
                    <h3 className="font-bold text-gray-800">AI Summary</h3>
                  </div>
                  <p className="leading-relaxed text-gray-700">{complaint.summary}</p>
                </div>
              )}
              
              {complaint.keyPhrases && complaint.keyPhrases.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-bold text-gray-800">Key Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {complaint.keyPhrases.map((phrase, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] text-gray-800 rounded-full font-medium shadow-md"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Card */}
            <div 
              className="p-8 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="flex items-center mb-6 space-x-3">
                <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Internal Notes</h2>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {complaint.notes && complaint.notes.length > 0 ? (
                  complaint.notes.map((note, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                      <div className="relative p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {note.addedBy.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{note.addedBy}</span>
                          </div>
                          <span className="text-sm text-gray-600">{formatDate(note.addedAt)}</span>
                        </div>
                        <p className="ml-10 text-gray-700">{note.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center border bg-white/40 rounded-2xl border-white/60">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="font-medium text-gray-600">No notes yet</p>
                  </div>
                )}
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/40">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Add a new note..."
                    rows={4}
                    className="relative w-full px-4 py-3 bg-white/70 border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  onClick={handleAddNote}
                  disabled={addingNote || !noteContent.trim()}
                  className="group relative mt-4 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-3 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>{addingNote ? 'Adding Note...' : 'Add Note'}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Status Actions Card */}
            <div 
              className="p-6 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="flex items-center mb-6 space-x-3">
                <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Update Status</h3>
              </div>
              
              <div className="space-y-3">
                {/* Current Status */}
                <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00534E] to-[#008080] text-white font-bold text-center shadow-lg">
                  Current: {STATUS_LABELS[complaint.status]}
                </div>
                
                {/* Status Buttons */}
                {complaint.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange('seen')}
                    disabled={updatingStatus}
                    className="relative w-full px-6 py-3 font-bold text-left text-white transition-all duration-500 transform shadow-lg group bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-400 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="inline-block w-5 h-5 mr-3" />
                    Mark as Seen
                  </button>
                )}
                
                {complaint.status === 'seen' && (
                  <button
                    onClick={() => handleStatusChange('in_progress')}
                    disabled={updatingStatus}
                    className="relative w-full px-6 py-3 font-bold text-left text-white transition-all duration-500 transform shadow-lg group bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl hover:from-purple-700 hover:to-purple-500 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="inline-block w-5 h-5 mr-3" />
                    Mark as In Progress
                  </button>
                )}
                
                {complaint.status === 'in_progress' && (
                  <>
                    <button
                      onClick={() => handleStatusChange('resolved')}
                      disabled={updatingStatus}
                      className="relative w-full px-6 py-3 font-bold text-left text-white transition-all duration-500 transform shadow-lg group bg-gradient-to-r from-green-500 to-green-700 rounded-xl hover:from-green-700 hover:to-green-500 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="inline-block w-5 h-5 mr-3" />
                      Mark as Resolved
                    </button>
                    <button
                      onClick={() => handleStatusChange('seen')}
                      disabled={updatingStatus}
                      className="relative w-full px-6 py-3 text-sm font-bold text-left text-white transition-all duration-500 transform shadow-lg group bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-400 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="inline-block w-4 h-4 mr-3" />
                      Back to Seen
                    </button>
                  </>
                )}
                
                {complaint.status === 'resolved' && (
                  <div className="px-4 py-3 font-bold text-center text-white shadow-lg rounded-xl bg-gradient-to-r from-green-500 to-green-700">
                    ✓ Complaint Resolved
                  </div>
                )}
              </div>
            </div>

            {/* Location & Details Card */}
            <div 
              className="p-6 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="flex items-center mb-6 space-x-3">
                <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Location & Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                  <div className="flex items-center mb-2 space-x-3">
                    <MapPin className="h-5 w-5 text-[#8D153A]" />
                    <span className="font-bold text-gray-700">Location</span>
                  </div>
                  <p className="ml-8 text-gray-800">{complaint.location}</p>
                </div>
                
                <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                  <div className="flex items-center mb-2 space-x-3">
                    <Clock className="h-5 w-5 text-[#8D153A]" />
                    <span className="font-bold text-gray-700">Timeline</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Submitted</span>
                      <p className="font-medium text-gray-800">{formatDate(complaint.submittedAt)}</p>
                    </div>
                    {complaint.resolvedAt && (
                      <div>
                        <span className="text-sm text-gray-600">Resolved</span>
                        <p className="font-medium text-gray-800">{formatDate(complaint.resolvedAt)}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                  <div className="flex items-center mb-2 space-x-3">
                    <Building2 className="h-5 w-5 text-[#8D153A]" />
                    <span className="font-bold text-gray-700">Assigned Authority</span>
                  </div>
                  <p className="ml-8 font-medium text-gray-800">
                    {AUTHORITY_LABELS[complaint.assignedAuthority] || complaint.assignedAuthority}
                  </p>
                </div>
              </div>
            </div>

            {/* Citizen Information Card */}
            <div 
              className="p-6 border shadow-2xl bg-white/20 backdrop-blur-md border-white/40 rounded-3xl"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <div className="flex items-center mb-6 space-x-3">
                <div className="p-2 bg-gradient-to-br from-[#8D153A] to-[#00534E] rounded-2xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Citizen Information</h3>
              </div>
              
              {complaint.anonymous ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-xl border border-[#D97706]/20">
                    <div className="flex items-center mb-3 space-x-2">
                      <User className="h-5 w-5 text-[#8D153A]" />
                      <span className="font-bold text-gray-800">Anonymous User</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {complaint.identityRequested && !complaint.identityApproved
                        ? "Identity request sent to citizen. Waiting for approval..."
                        : complaint.identityApproved && complaint.revealedUser
                        ? "Identity approved and revealed below"
                        : "Identity available upon request"}
                    </p>
                  </div>

                  {!complaint.identityRequested && !complaint.identityApproved && (
                    <button
                      onClick={() => toast.info('Identity request feature would be implemented here')}
                      disabled={requestingIdentity}
                      className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-3 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Request Identity</span>
                      </span>
                    </button>
                  )}

                  {complaint.identityApproved && complaint.revealedUser && (
                    <div className="p-4 bg-gradient-to-r from-[#059669] to-[#10B981] rounded-xl text-white">
                      <p className="mb-3 font-bold">Revealed Identity:</p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium">Name: {complaint.revealedUser.name}</span>
                        </div>
                        {complaint.revealedUser.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span className="font-medium">Email: {complaint.revealedUser.email}</span>
                          </div>
                        )}
                        {complaint.revealedUser.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">Phone: {complaint.revealedUser.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {complaint.name && (
                    <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                      <div className="flex items-center mb-1 space-x-2">
                        <User className="h-4 w-4 text-[#8D153A]" />
                        <span className="font-bold text-gray-700">Name</span>
                      </div>
                      <p className="ml-6 text-gray-800">{complaint.name}</p>
                    </div>
                  )}
                  {complaint.email && (
                    <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                      <div className="flex items-center mb-1 space-x-2">
                        <Mail className="h-4 w-4 text-[#8D153A]" />
                        <span className="font-bold text-gray-700">Email</span>
                      </div>
                      <p className="ml-6 text-gray-800">{complaint.email}</p>
                    </div>
                  )}
                  {complaint.phone && (
                    <div className="p-4 border bg-white/60 backdrop-blur-sm rounded-xl border-white/40">
                      <div className="flex items-center mb-1 space-x-2">
                        <Phone className="h-4 w-4 text-[#8D153A]" />
                        <span className="font-bold text-gray-700">Phone</span>
                      </div>
                      <p className="ml-6 text-gray-800">{complaint.phone}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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

export default ComplaintDetail;