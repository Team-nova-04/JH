import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCommunity } from "../../context/CommunityContext";
import AnnouncementCard from "../../components/community/AnnouncementCard";
import CommunityComplaintCard from "../../components/community/CommunityComplaintCard";
import TabSwitch from "../../components/community/TabSwitch";
import {
  Bell,
  AlertCircle,
  Users,
  ArrowLeft,
  MapPin,
  TrendingUp,
} from "lucide-react";
import AOS from "aos";

const CommunityFeedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getCommunityById,
    getAnnouncementsByCommunity,
    getComplaintsByCommunity,
    hasJoined,
    leaveCommunity,
  } = useCommunity();

  const [activeTab, setActiveTab] = useState("announcements");
  const community = getCommunityById(id);
  const announcements = getAnnouncementsByCommunity(id);
  const complaints = getComplaintsByCommunity(id);

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  // Redirect if not joined
  useEffect(() => {
    if (!hasJoined(id)) {
      navigate("/communities");
    }
  }, [id, hasJoined, navigate]);

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Community Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The community you're looking for doesn't exist.
          </p>
          <Link
            to="/communities"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Communities
          </Link>
        </div>
      </div>
    );
  }

  const handleLeaveCommunity = () => {
    if (window.confirm(`Are you sure you want to leave ${community.name}?`)) {
      leaveCommunity(id);
      navigate("/communities");
    }
  };

  const tabs = [
    {
      id: "announcements",
      label: "Announcements",
      icon: <Bell className="h-4 w-4" />,
      count: announcements.length,
    },
    {
      id: "issues",
      label: "Local Issues",
      icon: <AlertCircle className="h-4 w-4" />,
      count: complaints.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/communities")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Communities</span>
          </button>

          {/* Community Header Card */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            data-aos="fade-down"
          >
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {community.name}
                  </h1>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{community.location}</span>
                  </div>
                  <p className="text-gray-700 mb-6">{community.description}</p>

                  {/* Stats */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        {community.memberCount.toLocaleString()}
                      </span>
                      <span className="text-gray-600">members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-gray-900">
                        {community.activeIssues}
                      </span>
                      <span className="text-gray-600">active issues</span>
                    </div>
                  </div>
                </div>

                {/* Leave Button */}
                <button
                  onClick={handleLeaveCommunity}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                >
                  Leave Community
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center" data-aos="fade-up">
          <TabSwitch
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <>
              {announcements.length > 0 ? (
                <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
                  {announcements
                    .sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                    )
                    .map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        announcement={announcement}
                      />
                    ))}
                </div>
              ) : (
                <div
                  className="text-center py-16 bg-white rounded-xl shadow-sm"
                  data-aos="fade-up"
                >
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Announcements Yet
                  </h3>
                  <p className="text-gray-600">
                    Stay tuned for important updates from your community.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Local Issues Tab */}
          {activeTab === "issues" && (
            <>
              {complaints.length > 0 ? (
                <>
                  <div
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
                    data-aos="fade-up"
                  >
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">
                          Help Prioritize Community Issues
                        </h3>
                        <p className="text-sm text-blue-700">
                          Upvote issues that matter most to you. Higher upvotes
                          increase the urgency score and help authorities
                          prioritize resolutions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
                    {complaints
                      .sort((a, b) => b.upvotes - a.upvotes)
                      .map((complaint) => (
                        <CommunityComplaintCard
                          key={complaint.id}
                          complaint={complaint}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <div
                  className="text-center py-16 bg-white rounded-xl shadow-sm"
                  data-aos="fade-up"
                >
                  <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Issues Reported
                  </h3>
                  <p className="text-gray-600">
                    Great news! There are currently no reported issues in this
                    community.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedPage;
