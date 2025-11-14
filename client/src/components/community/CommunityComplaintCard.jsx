import { MapPin, Clock, AlertCircle, ArrowUp } from "lucide-react";
import { useState } from "react";
import { useCommunity } from "../../context/CommunityContext";

const CommunityComplaintCard = ({ complaint }) => {
  const { upvoteComplaint } = useCommunity();
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(complaint.upvotes);

  const getCategoryColor = (category) => {
    const colors = {
      infrastructure: "bg-blue-100 text-blue-800 border-blue-200",
      water: "bg-cyan-100 text-cyan-800 border-cyan-200",
      sanitation: "bg-green-100 text-green-800 border-green-200",
      roads: "bg-orange-100 text-orange-800 border-orange-200",
      noise: "bg-purple-100 text-purple-800 border-purple-200",
      traffic: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getUrgencyLevel = (score) => {
    if (score >= 0.8)
      return {
        label: "Critical",
        color: "bg-red-100 text-red-800 border-red-200",
      };
    if (score >= 0.6)
      return {
        label: "High",
        color: "bg-orange-100 text-orange-800 border-orange-200",
      };
    if (score >= 0.4)
      return {
        label: "Medium",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      };
    return {
      label: "Normal",
      color: "bg-green-100 text-green-800 border-green-200",
    };
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleUpvote = () => {
    if (!hasUpvoted) {
      upvoteComplaint(complaint.id);
      setHasUpvoted(true);
      setLocalUpvotes((prev) => prev + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const urgency = getUrgencyLevel(complaint.urgencyScore);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
      {/* Header with badges */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
              complaint.status
            )}`}
          >
            {complaint.status.toUpperCase().replace("-", " ")}
          </span>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${urgency.color}`}
          >
            {urgency.label} ({(complaint.urgencyScore * 100).toFixed(0)}%)
          </span>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(
              complaint.category
            )}`}
          >
            {complaint.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-200">
        {complaint.title}
      </h3>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {complaint.description}
      </p>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{complaint.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(complaint.createdAt)}</span>
          </div>
        </div>

        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            hasUpvoted
              ? "bg-blue-100 text-blue-700 cursor-not-allowed"
              : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
          }`}
        >
          <ArrowUp className={`h-4 w-4 ${hasUpvoted ? "fill-current" : ""}`} />
          <span className="font-semibold">{localUpvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityComplaintCard;
