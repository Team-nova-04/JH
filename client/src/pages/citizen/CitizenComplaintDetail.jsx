import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { complaintAPI } from '../../api/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  ArrowLeft,
  User,
  Building2,
  Shield,
  TrendingUp,
  BarChart3,
  Play,
  CheckCircle2,
  Target
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

const CitizenComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await complaintAPI.getById(id);
      setComplaint(res.data.data.complaint);
    } catch (error) {
      toast.error('Failed to load complaint details');
      navigate('/citizen/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Progress calculation based on status
  const getProgressData = (complaint) => {
    const statusProgress = {
      'pending': { progress: 25, steps: ['Submitted', 'Under Review', 'In Progress', 'Resolved'] },
      'under_review': { progress: 50, steps: ['Submitted', 'Under Review', 'In Progress', 'Resolved'] },
      'in_progress': { progress: 75, steps: ['Submitted', 'Under Review', 'In Progress', 'Resolved'] },
      'resolved': { progress: 100, steps: ['Submitted', 'Under Review', 'In Progress', 'Resolved'] },
      'rejected': { progress: 100, steps: ['Submitted', 'Reviewed', 'Rejected'], isRejected: true }
    };

    return statusProgress[complaint.status] || statusProgress.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-700">Complaint not found</p>
          <Link
            to="/citizen/dashboard"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;
  const statusColor = STATUS_COLORS[complaint.status] || STATUS_COLORS.pending;
  const progressData = getProgressData(complaint);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/citizen/dashboard"
              className="p-3 transition-all duration-300 border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-xl hover:bg-white/80 hover:shadow-xl"
            >
              <ArrowLeft className="h-6 w-6 text-[#8D153A]" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text">
                Complaint Details
              </h1>
              <p className="mt-2 font-medium text-gray-700">ID: {complaint._id}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 backdrop-blur-md ${statusColor}`}>
              {STATUS_LABELS[complaint.status]}
            </span>
            <span className={`px-4 py-2 rounded-xl text-sm font-bold border-2 backdrop-blur-md ${urgencyColor}`}>
              {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
            </span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-800">
              <Target className="h-6 w-6 mr-3 text-[#8D153A]" />
              Resolution Progress
            </h2>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">Current Progress</p>
              <p className="text-2xl font-bold text-[#8D153A]">{progressData.progress}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="inline-block text-xs font-semibold text-gray-600">
                    {progressData.isRejected ? 'Complaint Rejected' : 'Resolution Progress'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-semibold text-gray-600">
                    Step {Math.ceil(progressData.progress / 25)} of {progressData.steps.length}
                  </span>
                </div>
              </div>
              <div className="flex h-4 mb-4 overflow-hidden text-xs border rounded-xl bg-white/80 border-white/60">
                <div
                  style={{ width: `${progressData.progress}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    progressData.isRejected 
                      ? 'bg-gradient-to-r from-red-500 to-red-600' 
                      : 'bg-gradient-to-r from-[#8D153A] to-[#00534E]'
                  } transition-all duration-1000 ease-out`}
                />
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {progressData.steps.map((step, index) => {
              const stepProgress = (index + 1) * (100 / progressData.steps.length);
              const isCompleted = progressData.progress >= stepProgress;
              const isCurrent = progressData.progress >= stepProgress - (100 / progressData.steps.length) && 
                               progressData.progress < stepProgress;
              
              return (
                <div key={index} className="text-center">
                  <div className={`relative inline-flex items-center justify-center w-12 h-12 mb-2 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isCurrent
                      ? 'bg-[#8D153A] border-[#8D153A] text-white'
                      : 'bg-white/60 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isCurrent ? (
                      <Play className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className={`text-sm font-semibold ${
                    isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {step}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-[#8D153A] font-bold mt-1">Current Step</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Status Message */}
          <div className="p-4 mt-6 border bg-white/40 rounded-2xl border-white/60">
            <p className="mb-1 text-sm font-semibold text-gray-600">Current Status:</p>
            <p className="font-medium text-gray-800">
              {complaint.status === 'resolved' 
                ? '✅ Your complaint has been successfully resolved.'
                : complaint.status === 'rejected'
                ? '❌ Your complaint has been reviewed and rejected by the authority.'
                : complaint.status === 'in_progress'
                ? '🔄 The assigned authority is currently working on resolving your complaint.'
                : complaint.status === 'under_review'
                ? '📋 Your complaint is under review by the assigned authority.'
                : '⏳ Your complaint has been submitted and is waiting to be assigned for review.'
              }
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Left Column - Description & Image */}
          <div className="space-y-8 xl:col-span-2">
            {/* Description Card */}
            <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                <FileText className="h-6 w-6 mr-3 text-[#8D153A]" />
                Complaint Description
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
              {complaint.imageUrl && (
                <div className="mt-6">
                  <img
                    src={`http://localhost:5000${complaint.imageUrl}`}
                    alt="Complaint"
                    className="h-auto max-w-full border-2 shadow-lg rounded-2xl border-white/60"
                  />
                </div>
              )}
            </div>

            {/* AI Analysis Card */}
            <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                <BarChart3 className="h-6 w-6 mr-3 text-[#8D153A]" />
                AI Analysis
              </h2>
              
              {/* Analysis Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 lg:grid-cols-4">
                <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Category</p>
                  <p className="text-lg font-bold text-[#8D153A] capitalize">{complaint.category}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Confidence: {(complaint.categoryConfidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Sentiment</p>
                  <p className="text-lg font-bold text-[#00534E] capitalize">{complaint.sentiment}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Score: {(complaint.sentimentScore * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Urgency</p>
                  <p className="text-lg font-bold text-[#D97706]">
                    {(complaint.urgencyScore * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">Trust Score</p>
                  <p className="text-lg font-bold text-[#059669]">
                    {(complaint.trustScore * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Summary */}
              {complaint.summary && (
                <div className="p-4 mb-6 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-2 text-sm font-semibold text-gray-600">AI Summary</p>
                  <p className="leading-relaxed text-gray-700">{complaint.summary}</p>
                </div>
              )}

              {/* Key Phrases */}
              {complaint.keyPhrases && complaint.keyPhrases.length > 0 && (
                <div className="p-4 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-3 text-sm font-semibold text-gray-600">Key Phrases</p>
                  <div className="flex flex-wrap gap-2">
                    {complaint.keyPhrases.map((phrase, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl text-sm font-medium shadow-lg"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section */}
            {complaint.notes && complaint.notes.length > 0 && (
              <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
                <h2 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
                  <User className="h-6 w-6 mr-3 text-[#8D153A]" />
                  Authority Updates
                </h2>
                <div className="space-y-4">
                  {complaint.notes.map((note, idx) => (
                    <div key={idx} className="p-4 bg-white/40 rounded-2xl border-l-4 border-[#8D153A]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-[#8D153A]">{note.addedBy}</p>
                        <p className="text-xs font-medium text-gray-500">{formatDate(note.addedAt)}</p>
                      </div>
                      <p className="leading-relaxed text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location & Authority Card */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h3 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <MapPin className="h-5 w-5 mr-2 text-[#8D153A]" />
                Location & Authority
              </h3>
              <div className="space-y-4">
                <div className="p-3 border bg-white/40 rounded-xl border-white/60">
                  <p className="mb-1 text-sm font-semibold text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">{complaint.location}</p>
                </div>
                <div className="p-3 border bg-white/40 rounded-xl border-white/60">
                  <p className="mb-1 text-sm font-semibold text-gray-600">Assigned Authority</p>
                  <p className="font-medium text-gray-800">
                    {AUTHORITY_LABELS[complaint.assignedAuthority] || complaint.assignedAuthority}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h3 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <Clock className="h-5 w-5 mr-2 text-[#8D153A]" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="p-3 border bg-white/40 rounded-xl border-white/60">
                  <p className="mb-1 text-sm font-semibold text-gray-600">Submitted</p>
                  <p className="font-medium text-gray-800">{formatDate(complaint.submittedAt)}</p>
                </div>
                <div className="p-3 border bg-white/40 rounded-xl border-white/60">
                  <p className="mb-1 text-sm font-semibold text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-800">{formatDate(complaint.updatedAt)}</p>
                </div>
                {complaint.resolvedAt && (
                  <div className="p-3 border bg-green-50/60 rounded-xl border-green-200/60">
                    <p className="mb-1 text-sm font-semibold text-green-700">Resolved</p>
                    <p className="font-medium text-green-800">{formatDate(complaint.resolvedAt)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Overview Card */}
            <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h3 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <Shield className="h-5 w-5 mr-2 text-[#8D153A]" />
                Status Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border bg-white/40 rounded-xl border-white/60">
                  <span className="text-sm font-semibold text-gray-600">Current Status</span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${statusColor}`}>
                    {STATUS_LABELS[complaint.status]}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border bg-white/40 rounded-xl border-white/60">
                  <span className="text-sm font-semibold text-gray-600">Urgency Level</span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${urgencyColor}`}>
                    {URGENCY_LABELS[urgencyLevel]}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border bg-white/40 rounded-xl border-white/60">
                  <span className="text-sm font-semibold text-gray-600">Priority</span>
                  <span className="text-sm font-bold text-[#8D153A]">
                    {urgencyLevel === 'critical' ? 'High' : 
                     urgencyLevel === 'high' ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenComplaintDetail;