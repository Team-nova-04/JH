import { Link } from 'react-router-dom';
import { MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { STATUS_LABELS, STATUS_COLORS, URGENCY_LABELS, URGENCY_COLORS, getUrgencyLevel, formatDate } from '../utils/constants';

const ComplaintCard = ({ complaint, showActions = false, onStatusChange = null }) => {
  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const statusColor = STATUS_COLORS[complaint.status] || STATUS_COLORS.pending;
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
              {STATUS_LABELS[complaint.status] || complaint.status}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium border ${urgencyColor}`}>
              {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {complaint.description?.substring(0, 100)}
            {complaint.description?.length > 100 && '...'}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{complaint.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(complaint.submittedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Category:</span> {complaint.category || 'N/A'}
        </div>
        {showActions && onStatusChange && (
          <div className="flex space-x-2">
            {complaint.status !== 'seen' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'seen')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Mark Seen
              </button>
            )}
            {complaint.status !== 'in_progress' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'in_progress')}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
              >
                In Progress
              </button>
            )}
            {complaint.status !== 'resolved' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'resolved')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                Resolve
              </button>
            )}
          </div>
        )}
        {!showActions && (
          <Link
            to={`/authority/complaints/${complaint._id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;

