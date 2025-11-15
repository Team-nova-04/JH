import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCommunity } from "../../context/CommunityContext";
import {
  Users,
  AlertCircle,
  Bell,
  TrendingUp,
  MapPin,
  BarChart3,
  Plus,
  Settings,
  Shield,
  Target,
  MessageSquare,
} from "lucide-react";

const AdminCommunityDashboard = () => {
  const { communities, announcements, complaints } = useCommunity();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Calculate analytics
  const totalMembers = communities.reduce((sum, c) => sum + c.memberCount, 0);
  const totalIssues = complaints.length;
  const totalAnnouncements = announcements.length;
  const totalUpvotes = complaints.reduce((sum, c) => sum + c.upvotes, 0);

  // Get top issues by community
  const getTopIssuesByCommunity = (communityId) => {
    return complaints
      .filter((c) => c.communityId === communityId)
      .sort((a, b) => b.upvotes - a.upvotes)
      .slice(0, 3);
  };

  // Get announcement count by community
  const getAnnouncementCount = (communityId) => {
    return announcements.filter((a) => a.communityId === communityId).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Community Management
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Monitor and manage communities, announcements, and local issues
            across Sri Lanka
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#8D153A] to-[#A52D5A] p-3 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#8D153A]" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">
              {totalMembers.toLocaleString()}
            </h3>
            <p className="text-sm font-semibold text-gray-600">Total Members</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div
                className="bg-gradient-to-r from-[#8D153A] to-[#A52D5A] h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#00534E] to-[#008080] p-3 rounded-2xl shadow-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#00534E]" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">
              {totalIssues}
            </h3>
            <p className="text-sm font-semibold text-gray-600">Active Issues</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div
                className="bg-gradient-to-r from-[#00534E] to-[#008080] h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-3 rounded-2xl shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#D97706]" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">
              {totalAnnouncements}
            </h3>
            <p className="text-sm font-semibold text-gray-600">Announcements</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div
                className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-[#059669] to-[#10B981] p-3 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-[#059669]" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">
              {totalUpvotes.toLocaleString()}
            </h3>
            <p className="text-sm font-semibold text-gray-600">Total Upvotes</p>
            <div className="w-full h-2 mt-3 rounded-full bg-white/60">
              <div
                className="bg-gradient-to-r from-[#059669] to-[#10B981] h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-8 text-white">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Platform Performance
          </h2>
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
            <div>
              <div className="text-4xl font-bold text-[#FFBE29] mb-2">
                {communities.length}
              </div>
              <p className="text-white/90">Active Communities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFBE29] mb-2">
                {(
                  (totalIssues > 0
                    ? complaints.filter((c) => c.status === "resolved").length /
                      totalIssues
                    : 0) * 100
                ).toFixed(1)}
                %
              </div>
              <p className="text-white/90">Issue Resolution Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFBE29] mb-2">
                {totalMembers > 0 ? Math.round(totalUpvotes / totalMembers) : 0}
              </div>
              <p className="text-white/90">Avg. Engagement per Member</p>
            </div>
          </div>
        </div>

        {/* Communities List */}
        <div>
          <div className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                Communities Overview
              </h2>
              <p className="text-lg text-gray-700">
                Manage and monitor all communities across the platform
              </p>
            </div>
            <div className="px-4 py-2 mt-4 border sm:mt-0 bg-white/60 backdrop-blur-md rounded-xl border-white/60">
              <span className="text-sm font-semibold text-gray-700">
                {communities.length} total communities
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {communities.map((community) => {
              const topIssues = getTopIssuesByCommunity(community.id);
              const announcementCount = getAnnouncementCount(community.id);
              const communityComplaints = complaints.filter(
                (c) => c.communityId === community.id
              );
              const avgUrgency =
                communityComplaints.length > 0
                  ? (
                      (communityComplaints.reduce(
                        (sum, c) => sum + c.urgencyScore,
                        0
                      ) /
                        communityComplaints.length) *
                      100
                    ).toFixed(1)
                  : 0;

              return (
                <div
                  key={community.id}
                  className="overflow-hidden transition-all duration-300 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl hover:shadow-2xl"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-4 space-x-4">
                          <div className="p-3 bg-white/20 rounded-2xl">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="mb-2 text-3xl font-bold text-white">
                              {community.name}
                            </h3>
                            <div className="flex items-center space-x-3 text-white/90">
                              <MapPin className="w-5 h-5" />
                              <span className="text-lg">
                                {community.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="max-w-3xl text-lg leading-relaxed text-white/80">
                          {community.description}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                          to={`/admin/communities/${community.id}/analytics`}
                          className="flex items-center px-6 py-3 space-x-2 font-bold text-white transition-all duration-300 border group bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 border-white/40"
                        >
                          <BarChart3 className="w-5 h-5" />
                          <span>View Analytics</span>
                        </Link>
                        <Link
                          to={`/admin/communities/${community.id}/manage`}
                          className="flex items-center px-6 py-3 space-x-2 font-bold text-white transition-all duration-300 border group bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 border-white/40"
                        >
                          <Settings className="w-5 h-5" />
                          <span>Manage Community</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 p-8 border-b md:grid-cols-4 bg-white/40 border-white/60">
                    <div className="p-4 text-center border bg-white/60 rounded-2xl border-white/60">
                      <div className="flex items-center justify-center mb-2 space-x-2">
                        <Users className="h-5 w-5 text-[#8D153A]" />
                        <span className="text-sm font-semibold text-gray-600">
                          Members
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {community.memberCount.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 text-center border bg-white/60 rounded-2xl border-white/60">
                      <div className="flex items-center justify-center mb-2 space-x-2">
                        <AlertCircle className="h-5 w-5 text-[#00534E]" />
                        <span className="text-sm font-semibold text-gray-600">
                          Active Issues
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {community.activeIssues}
                      </p>
                    </div>
                    <div className="p-4 text-center border bg-white/60 rounded-2xl border-white/60">
                      <div className="flex items-center justify-center mb-2 space-x-2">
                        <Bell className="h-5 w-5 text-[#D97706]" />
                        <span className="text-sm font-semibold text-gray-600">
                          Announcements
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {announcementCount}
                      </p>
                    </div>
                    <div className="p-4 text-center border bg-white/60 rounded-2xl border-white/60">
                      <div className="flex items-center justify-center mb-2 space-x-2">
                        <BarChart3 className="h-5 w-5 text-[#059669]" />
                        <span className="text-sm font-semibold text-gray-600">
                          Avg Urgency
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {avgUrgency}%
                      </p>
                    </div>
                  </div>

                  {/* Top Issues */}
                  <div className="p-8">
                    <h4 className="flex items-center mb-6 text-xl font-bold text-gray-800">
                      <MessageSquare className="h-6 w-6 mr-2 text-[#8D153A]" />
                      Top Community Issues
                    </h4>
                    {topIssues.length > 0 ? (
                      <div className="space-y-4">
                        {topIssues.map((issue, idx) => (
                          <div
                            key={issue.id}
                            className="flex items-center justify-between p-4 transition-all duration-300 border bg-white/40 rounded-2xl border-white/60 hover:bg-white/60"
                          >
                            <div className="flex-1">
                              <div className="flex items-center mb-2 space-x-3">
                                <span className="text-sm font-bold text-[#8D153A] bg-[#8D153A]/10 px-3 py-1 rounded-full">
                                  #{idx + 1}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                    issue.status === "resolved"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : issue.status === "in-progress"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  }`}
                                >
                                  {issue.status.toUpperCase().replace("-", " ")}
                                </span>
                              </div>
                              <p className="mb-2 text-lg font-semibold text-gray-800">
                                {issue.title}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{issue.location}</span>
                                </span>
                                <span>•</span>
                                <span className="font-semibold text-[#00534E]">
                                  {issue.upvotes} upvotes
                                </span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    issue.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 text-center">
                              <div
                                className={`text-2xl font-bold ${
                                  issue.urgencyScore >= 0.8
                                    ? "text-red-600"
                                    : issue.urgencyScore >= 0.6
                                    ? "text-orange-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {(issue.urgencyScore * 100).toFixed(0)}%
                              </div>
                              <div className="text-xs font-semibold text-gray-500">
                                urgency
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center border bg-white/40 rounded-2xl border-white/60">
                        <Target className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-semibold text-gray-700">
                          No issues reported in this community yet
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Community members are satisfied with their
                          neighborhood
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommunityDashboard;
