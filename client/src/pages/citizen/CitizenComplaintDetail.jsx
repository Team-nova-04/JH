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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Complaint not found</p>
        <Link
          to="/citizen/dashboard"
          className="mt-4 text-primary-600 hover:text-primary-700 inline-block"
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;
  const statusColor = STATUS_COLORS[complaint.status] || STATUS_COLORS.pending;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/citizen/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complaint Details</h1>
            <p className="text-gray-600 mt-1">ID: {complaint._id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${statusColor}`}>
            {STATUS_LABELS[complaint.status]}
          </span>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${urgencyColor}`}>
            {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Description
        </h2>
        <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
        {complaint.imageUrl && (
          <div className="mt-4">
            <img
              src={`http://localhost:5000${complaint.imageUrl}`}
              alt="Complaint"
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold text-gray-900 capitalize">{complaint.category}</p>
            <p className="text-xs text-gray-500">
              Confidence: {(complaint.categoryConfidence * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sentiment</p>
            <p className="font-semibold text-gray-900 capitalize">{complaint.sentiment}</p>
            <p className="text-xs text-gray-500">
              Score: {(complaint.sentimentScore * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Urgency</p>
            <p className="font-semibold text-gray-900">
              {(complaint.urgencyScore * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Trust Score</p>
            <p className="font-semibold text-gray-900">
              {(complaint.trustScore * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        {complaint.summary && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Summary</p>
            <p className="text-gray-700">{complaint.summary}</p>
          </div>
        )}
        {complaint.keyPhrases && complaint.keyPhrases.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Key Phrases</p>
            <div className="flex flex-wrap gap-2">
              {complaint.keyPhrases.map((phrase, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location & Authority */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Authority</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{complaint.location}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Assigned Authority</p>
                <p className="font-medium text-gray-900">
                  {AUTHORITY_LABELS[complaint.assignedAuthority] || complaint.assignedAuthority}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="font-medium text-gray-900">{formatDate(complaint.submittedAt)}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium text-gray-900">{formatDate(complaint.updatedAt)}</p>
              </div>
            </div>
            {complaint.resolvedAt && (
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="font-medium text-gray-900">{formatDate(complaint.resolvedAt)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notes (if any) */}
      {complaint.notes && complaint.notes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Authority Notes</h2>
          <div className="space-y-4">
            {complaint.notes.map((note, idx) => (
              <div key={idx} className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{note.addedBy}</p>
                  <p className="text-xs text-gray-500">{formatDate(note.addedAt)}</p>
                </div>
                <p className="text-gray-700">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenComplaintDetail;

