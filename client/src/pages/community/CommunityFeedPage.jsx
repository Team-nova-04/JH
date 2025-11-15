import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCommunity } from "../../context/CommunityContext";
import { useAuth } from "../../context/AuthContext";
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
  Shield,
  Heart,
} from "lucide-react";
import AOS from "aos";
import toast from "react-hot-toast";

const CommunityFeedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isCitizen } = useAuth();
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

  // Redirect if not authenticated or not a citizen
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access community feeds");
      navigate("/citizen/login", {
        state: {
          from: `/community/${id}/feed`,
          message: "Please login to access community feeds",
        },
      });
      return;
    }

    if (!isCitizen) {
      toast.error("Only citizens can access community feeds");
      navigate("/communities");
      return;
    }

    // Redirect if not joined
    if (!hasJoined(id)) {
      toast("Please join the community first", {
        icon: "ℹ️",
        style: {
          background: "#3B82F6",
          color: "#fff",
        },
      });
      navigate("/communities");
    }
  }, [id, hasJoined, navigate, isAuthenticated, isCitizen]);

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Community Not Found
          </h2>
          <p className="mb-6 text-gray-600">
            The community you're looking for doesn't exist.
          </p>
          <Link
            to="/communities"
            className="px-6 py-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl font-semibold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl"
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
      icon: <Bell className="w-4 h-4" />,
      count: announcements.length,
    },
    {
      id: "issues",
      label: "Local Issues",
      icon: <AlertCircle className="w-4 h-4" />,
      count: complaints.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/communities")}
            className="flex items-center mb-6 space-x-2 text-gray-600 hover:text-gray-900 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Communities</span>
          </button>

          {/* Community Header Card */}
          <div
            className="overflow-hidden border shadow-2xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-down"
          >
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-[#8D153A] via-[#00534E] to-[#D97706] relative">
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4 space-x-4">
                    <div className="bg-gradient-to-br from-[#8D153A] to-[#00534E] p-3 rounded-2xl shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-2">
                        {community.name}
                      </h1>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-lg font-medium">{community.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">{community.description}</p>

                  {/* Stats */}
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center px-4 py-2 space-x-3 border bg-white/40 backdrop-blur-sm rounded-2xl border-white/60">
                      <Users className="h-6 w-6 text-[#8D153A]" />
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {community.memberCount.toLocaleString()}
                        </span>
                        <span className="ml-2 text-gray-600">members</span>
                      </div>
                    </div>
                    <div className="flex items-center px-4 py-2 space-x-3 border bg-white/40 backdrop-blur-sm rounded-2xl border-white/60">
                      <TrendingUp className="h-6 w-6 text-[#00534E]" />
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {community.activeIssues}
                        </span>
                        <span className="ml-2 text-gray-600">active issues</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leave Button */}
                <button
                  onClick={handleLeaveCommunity}
                  className="px-6 py-3 font-semibold text-red-600 transition-all duration-300 border bg-white/40 backdrop-blur-md rounded-xl hover:bg-red-50/50 border-white/60 hover:border-red-200/50 hover:shadow-lg"
                >
                  Leave Community
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8" data-aos="fade-up">
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
                  className="py-16 text-center border shadow-2xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
                  data-aos="fade-up"
                >
                  <div className="bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-2xl w-20 h-20 mx-auto mb-4 shadow-lg">
                    <Bell className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    No Announcements Yet
                  </h3>
                  <p className="text-lg text-gray-600">
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
                    className="bg-[#00534E]/10 border border-[#00534E]/20 rounded-2xl p-6 mb-6"
                    data-aos="fade-up"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-[#00534E] to-[#008080] p-3 rounded-2xl">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-[#00534E] mb-2">
                          Help Prioritize Community Issues
                        </h3>
                        <p className="leading-relaxed text-gray-700">
                          Upvote issues that matter most to you. Higher upvotes
                          increase the urgency score and help authorities
                          prioritize resolutions for your community's benefit.
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
                  className="py-16 text-center border shadow-2xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
                  data-aos="fade-up"
                >
                  <div className="bg-gradient-to-br from-[#00534E] to-[#008080] p-4 rounded-2xl w-20 h-20 mx-auto mb-4 shadow-lg">
                    <AlertCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    No Issues Reported
                  </h3>
                  <p className="text-lg text-gray-600">
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