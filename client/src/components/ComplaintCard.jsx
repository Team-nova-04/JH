// components/ComplaintCard.js - Enhanced with modern design and gamification
import { Link } from 'react-router-dom';
import { MapPin, Clock, AlertCircle, CheckCircle, Star, Zap, Award } from 'lucide-react';
import { STATUS_LABELS, STATUS_COLORS, URGENCY_LABELS, URGENCY_COLORS, getUrgencyLevel, formatDate } from '../utils/constants';

const ComplaintCard = ({ complaint, showActions = false, onStatusChange = null, userPoints = 0 }) => {
  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const statusColor = STATUS_COLORS[complaint.status] || STATUS_COLORS.pending;
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;

  // Gamification: Calculate points for this complaint
  const complaintPoints = Math.floor((complaint.urgencyScore || 0) * 100) + 10;
  const isResolved = complaint.status === 'resolved';
  const isUrgent = urgencyLevel === 'critical' || urgencyLevel === 'high';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
      {/* Gamification Badge */}
      {isResolved && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-3 py-1">
            <Award className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Resolved +{complaintPoints} pts</span>
          </div>
          {isUrgent && (
            <div className="flex items-center space-x-1 bg-orange-100 rounded-full px-2 py-1">
              <Zap className="h-3 w-3 text-orange-600" />
              <span className="text-xs font-medium text-orange-700">Urgent</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColor} border`}>
              {STATUS_LABELS[complaint.status] || complaint.status}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${urgencyColor}`}>
              {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
            {complaint.description?.substring(0, 100)}
            {complaint.description?.length > 100 && '...'}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-3 py-1.5">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{complaint.location}</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1.5">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="font-medium">{formatDate(complaint.submittedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress and Points Section */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="font-semibold text-gray-700">Category:</span> 
            <span className="ml-1 text-gray-900 font-medium">{complaint.category || 'N/A'}</span>
          </div>
          
          {/* Points indicator for citizens */}
          {showActions && userPoints > 0 && (
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-yellow-600" />
              <span className="text-xs font-semibold text-yellow-700">{userPoints} pts</span>
            </div>
          )}
        </div>
        
        {showActions && onStatusChange && (
          <div className="flex space-x-2">
            {/* Show "Mark Seen" only if status is pending */}
            {complaint.status === 'pending' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'seen')}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition-all duration-200 transform hover:scale-105"
              >
                Mark Seen
              </button>
            )}
            {/* Show "In Progress" only if status is seen */}
            {complaint.status === 'seen' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'in_progress')}
                className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium transition-all duration-200 transform hover:scale-105"
              >
                In Progress
              </button>
            )}
            {/* Show "Resolve" only if status is in_progress */}
            {complaint.status === 'in_progress' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'resolved')}
                className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 font-medium shadow-md transition-all duration-200 transform hover:scale-105"
              >
                Resolve
              </button>
            )}
            {/* Show "Back to Seen" if status is in_progress (optional flexibility) */}
            {complaint.status === 'in_progress' && (
              <button
                onClick={() => onStatusChange(complaint._id, 'seen')}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-all duration-200"
              >
                Back to Seen
              </button>
            )}
          </div>
        )}
        {!showActions && (
          <Link
            to={`/citizen/complaints/${complaint._id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center space-x-1 group-hover:underline transition-all duration-200"
          >
            <span>View Details</span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;