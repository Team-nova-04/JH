import { Users, MapPin, AlertCircle } from "lucide-react";
import { useCommunity } from "../../context/CommunityContext";

const CommunityCard = ({ community }) => {
  const { hasJoined, joinCommunity, leaveCommunity } = useCommunity();
  const isJoined = hasJoined(community.id);

  const handleJoinToggle = () => {
    if (isJoined) {
      leaveCommunity(community.id);
    } else {
      joinCommunity(community.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
      {/* Community Image */}
      <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
            {community.name}
          </h3>
        </div>
      </div>

      {/* Community Content */}
      <div className="p-6">
        <div className="flex items-start space-x-2 mb-4">
          <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-600">{community.location}</p>
        </div>

        <p className="text-gray-700 mb-6 line-clamp-3 min-h-[4.5rem]">
          {community.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {community.memberCount.toLocaleString()} members
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">
                {community.activeIssues} active issues
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleJoinToggle}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isJoined
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isJoined ? "✓ Joined" : "Join Community"}
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
