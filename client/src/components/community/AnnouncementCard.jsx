import {
  Bell,
  MapPin,
  Clock,
  Zap,
  Droplet,
  Calendar,
  Construction,
} from "lucide-react";

const AnnouncementCard = ({ announcement }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "power-cut":
        return <Zap className="h-5 w-5" />;
      case "water":
        return <Droplet className="h-5 w-5" />;
      case "infrastructure":
        return <Construction className="h-5 w-5" />;
      case "event":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "power-cut":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "water":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "infrastructure":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "event":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-blue-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-lg ${getTypeColor(
              announcement.type
            )} border`}
          >
            {getTypeIcon(announcement.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {announcement.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {formatTimestamp(announcement.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Severity Badge */}
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getSeverityColor(
            announcement.severity
          )}`}
        >
          {announcement.severity.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {announcement.description}
      </p>

      {/* Affected Areas */}
      {announcement.affectedAreas && announcement.affectedAreas.length > 0 && (
        <div className="flex items-start space-x-2 pt-4 border-t border-gray-100">
          <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Affected Areas:
            </p>
            <div className="flex flex-wrap gap-2">
              {announcement.affectedAreas.map((area, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;
