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
} from "lucide-react";
import AOS from "aos";

const AdminCommunityDashboard = () => {
  const { communities, announcements, complaints } = useCommunity();

  useEffect(() => {
    AOS.refresh();
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8" data-aos="fade-down">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Community Management
              </h1>
              <p className="text-gray-600">
                Manage communities, announcements, and monitor local issues
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          data-aos="fade-up"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalMembers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-xs text-green-600 mt-2">
              ↑ Across all communities
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalIssues}
            </h3>
            <p className="text-sm text-gray-600">Active Issues</p>
            <p className="text-xs text-orange-600 mt-2">Requires attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalAnnouncements}
            </h3>
            <p className="text-sm text-gray-600">Announcements</p>
            <p className="text-xs text-purple-600 mt-2">Published</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {totalUpvotes.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Upvotes</p>
            <p className="text-xs text-green-600 mt-2">Community engagement</p>
          </div>
        </div>

        {/* Communities List */}
        <div data-aos="fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Communities Overview
            </h2>
            <span className="text-sm text-gray-500">
              {communities.length} total communities
            </span>
          </div>

          <div className="space-y-6">
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
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {community.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-white/90 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{community.location}</span>
                        </div>
                        <p className="text-white/80 text-sm max-w-2xl">
                          {community.description}
                        </p>
                      </div>
                      <Link
                        to={`/admin/communities/${community.id}/manage`}
                        className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Manage</span>
                      </Link>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-600 font-medium">
                          Members
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {community.memberCount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-600 font-medium">
                          Active Issues
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {community.activeIssues}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Bell className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-600 font-medium">
                          Announcements
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {announcementCount}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-600 font-medium">
                          Avg Urgency
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {avgUrgency}%
                      </p>
                    </div>
                  </div>

                  {/* Top Issues */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Top Issues (by upvotes)
                    </h4>
                    {topIssues.length > 0 ? (
                      <div className="space-y-3">
                        {topIssues.map((issue, idx) => (
                          <div
                            key={issue.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-xs font-bold text-gray-500">
                                  #{idx + 1}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                    issue.status === "resolved"
                                      ? "bg-green-100 text-green-800"
                                      : issue.status === "in-progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {issue.status.toUpperCase().replace("-", " ")}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                {issue.title}
                              </p>
                              <div className="flex items-center space-x-3 text-xs text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{issue.location}</span>
                                </span>
                                <span>•</span>
                                <span className="font-semibold text-blue-600">
                                  {issue.upvotes} upvotes
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-center">
                                <div
                                  className={`text-lg font-bold ${
                                    issue.urgencyScore >= 0.8
                                      ? "text-red-600"
                                      : issue.urgencyScore >= 0.6
                                      ? "text-orange-600"
                                      : "text-yellow-600"
                                  }`}
                                >
                                  {(issue.urgencyScore * 100).toFixed(0)}%
                                </div>
                                <div className="text-xs text-gray-500">
                                  urgency
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No issues reported yet
                      </p>
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
