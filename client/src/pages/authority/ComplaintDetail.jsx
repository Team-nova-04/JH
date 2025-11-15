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
  Edit,
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

  const handleRequestContact = async () => {
    try {
      const res = await authorityAPI.requestContact(id);
      toast.success('Contact information retrieved');
      // Show contact info in a modal or alert
      const contact = res.data.data.citizenContact;
      alert(`Contact Information:\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'N/A'}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to request contact');
    }
  };

  // FR2: Handle identity request for anonymous complaints
  const handleRequestIdentity = async () => {
    try {
      setRequestingIdentity(true);
      await complaintAPI.requestIdentity(id);
      toast.success('Identity request sent to citizen');
      fetchComplaint();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to request identity');
    } finally {
      setRequestingIdentity(false);
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
        <button
          onClick={() => navigate('/authority/complaints')}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          ← Back to Complaints
        </button>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;
  const statusColor = STATUS_COLORS[complaint.status] || STATUS_COLORS.pending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/authority/complaints')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
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
            <div className="grid grid-cols-2 gap-4">
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
                <p className="text-sm text-gray-600">Hazard Keywords</p>
                <p className="font-semibold text-gray-900">
                  {(complaint.hazardKeywordScore * 100).toFixed(0)}%
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

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Internal Notes
            </h2>
            <div className="space-y-4">
              {complaint.notes && complaint.notes.length > 0 ? (
                complaint.notes.map((note, idx) => (
                  <div key={idx} className="border-l-4 border-primary-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{note.addedBy}</p>
                      <p className="text-xs text-gray-500">{formatDate(note.addedAt)}</p>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No notes yet</p>
              )}
              <div className="pt-4 border-t">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleAddNote}
                  disabled={addingNote}
                  className="mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {addingNote ? 'Adding...' : 'Add Note'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {/* Show current status as disabled */}
              <div className="px-4 py-2 rounded-lg bg-primary-100 text-primary-700 font-medium">
                Current: {STATUS_LABELS[complaint.status]}
              </div>
              
              {/* Show next valid status button based on current status */}
              {complaint.status === 'pending' && (
                <button
                  onClick={() => handleStatusChange('seen')}
                  disabled={updatingStatus}
                  className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  → Mark as Seen
                </button>
              )}
              
              {complaint.status === 'seen' && (
                <button
                  onClick={() => handleStatusChange('in_progress')}
                  disabled={updatingStatus}
                  className="w-full text-left px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  → Mark as In Progress
                </button>
              )}
              
              {complaint.status === 'in_progress' && (
                <>
                  <button
                    onClick={() => handleStatusChange('resolved')}
                    disabled={updatingStatus}
                    className="w-full text-left px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    → Mark as Resolved
                  </button>
                  <button
                    onClick={() => handleStatusChange('seen')}
                    disabled={updatingStatus}
                    className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    ← Back to Seen
                  </button>
                </>
              )}
              
              {complaint.status === 'resolved' && (
                <div className="px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm">
                  ✓ Complaint has been resolved
                </div>
              )}
            </div>
          </div>

          {/* Location & Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{complaint.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-medium text-gray-900">{formatDate(complaint.submittedAt)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Assigned Authority</p>
                  <p className="font-medium text-gray-900">
                    {AUTHORITY_LABELS[complaint.assignedAuthority] || complaint.assignedAuthority}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Citizen Contact - FR2 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Citizen Information</h3>
            
            {complaint.anonymous ? (
              <div className="space-y-4">
                {/* Anonymous Status */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Anonymous User</span>
                  </div>
                  <p className="text-sm text-yellow-800">
                    {complaint.identityRequested && !complaint.identityApproved
                      ? "Identity request sent to citizen. Waiting for approval..."
                      : complaint.identityApproved && complaint.revealedUser
                      ? "Identity approved and revealed below"
                      : "Identity available upon request"}
                  </p>
                </div>

                {/* Request Identity Button */}
                {!complaint.identityRequested && !complaint.identityApproved && (
                  <button
                    onClick={handleRequestIdentity}
                    disabled={requestingIdentity}
                    className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <User className="h-4 w-4" />
                    <span>{requestingIdentity ? 'Requesting...' : 'Request Identity'}</span>
                  </button>
                )}

                {/* Revealed Identity (if approved) */}
                {complaint.identityApproved && complaint.revealedUser && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
                    <p className="font-medium text-green-900 mb-3">Revealed Identity:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">
                          <span className="font-medium">Name:</span> {complaint.revealedUser.name}
                        </span>
                      </div>
                      {complaint.revealedUser.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            <span className="font-medium">Email:</span> {complaint.revealedUser.email}
                          </span>
                        </div>
                      )}
                      {complaint.revealedUser.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">
                            <span className="font-medium">Phone:</span> {complaint.revealedUser.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {complaint.name && (
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{complaint.name}</p>
                    </div>
                  </div>
                )}
                {complaint.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{complaint.email}</p>
                    </div>
                  </div>
                )}
                {complaint.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{complaint.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Anonymous</span>
                <span className="font-medium">{complaint.anonymous ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">{formatDate(complaint.updatedAt)}</span>
              </div>
              {complaint.resolvedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolved At</span>
                  <span className="font-medium">{formatDate(complaint.resolvedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;

