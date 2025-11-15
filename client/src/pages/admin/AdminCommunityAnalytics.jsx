import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  AlertTriangle,
  ThumbsUp,
  Bell,
  Activity,
  Award,
  Clock,
  Target,
  Megaphone,
} from "lucide-react";
import MetricCard from "../../components/analytics/MetricCard";
import ChartSection from "../../components/analytics/ChartSection";
import DataTable from "../../components/analytics/DataTable";
import { communityAnalyticsMockData } from "../../data/mockAnalyticsData";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminCommunityAnalytics = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setData(communityAnalyticsMockData);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D]">
        <div className="text-center">
          <p className="text-xl text-gray-700">No data available</p>
        </div>
      </div>
    );
  }

  // Table columns definitions
  const upvotedComplaintsColumns = [
    {
      header: "Rank",
      key: "rank",
      className: "w-16",
      render: (row) => (
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#8D153A] to-[#00534E] text-white font-bold rounded-xl">
          {row.rank}
        </div>
      ),
    },
    {
      header: "Complaint Title",
      key: "title",
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-800">{row.title}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
              {row.category}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                row.urgency === "Critical"
                  ? "bg-red-100 text-red-700"
                  : row.urgency === "High"
                  ? "bg-orange-100 text-orange-700"
                  : row.urgency === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {row.urgency}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Upvotes",
      key: "upvotes",
      className: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center space-x-1">
          <ThumbsUp className="h-4 w-4 text-[#8D153A]" />
          <span className="font-bold text-[#8D153A]">{row.upvotes}</span>
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
      className: "text-center",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : row.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const announcementColumns = [
    {
      header: "Announcement",
      key: "title",
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-800">{row.title}</p>
          <p className="text-xs text-gray-500 mt-1">{row.date}</p>
        </div>
      ),
    },
    {
      header: "Views",
      key: "views",
      className: "text-center",
      render: (row) => (
        <span className="font-bold text-gray-700">
          {row.views.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Reactions",
      key: "reactions",
      className: "text-center",
      render: (row) => (
        <span className="font-bold text-[#00534E]">{row.reactions}</span>
      ),
    },
    {
      header: "Engagement",
      key: "engagement",
      className: "text-center",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.engagement === "High"
              ? "bg-green-100 text-green-700"
              : row.engagement === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.engagement}
        </span>
      ),
    },
  ];

  const criticalAlertsColumns = [
    {
      header: "Issue",
      key: "title",
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-800">{row.title}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-500">{row.reportedAt}</span>
            <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
              {row.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Urgency",
      key: "urgency",
      className: "text-center",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.urgency === "Critical"
              ? "bg-red-100 text-red-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {row.urgency}
        </span>
      ),
    },
    {
      header: "Upvotes",
      key: "upvotes",
      className: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center space-x-1">
          <ThumbsUp className="h-4 w-4 text-[#8D153A]" />
          <span className="font-bold text-[#8D153A]">{row.upvotes}</span>
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
      className: "text-center",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] -m-6 p-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Community Analytics Dashboard
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
            Comprehensive insights and performance metrics for community
            engagement
          </p>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            icon={MessageSquare}
            title="Total Complaints"
            value={data.metrics.totalComplaints}
            subtitle="All time"
            trend={12}
            iconBg="from-[#8D153A] to-[#A52D5A]"
            color="from-[#8D153A] to-[#A52D5A]"
          />
          <MetricCard
            icon={ThumbsUp}
            title="Highly Upvoted"
            value={data.metrics.highlyUpvoted}
            subtitle="100+ upvotes"
            trend={8}
            iconBg="from-[#00534E] to-[#059669]"
            color="from-[#00534E] to-[#059669]"
          />
          <MetricCard
            icon={TrendingUp}
            title="Weekly Upvotes"
            value={data.metrics.weeklyUpvotes}
            subtitle="Last 7 days"
            trend={15}
            iconBg="from-[#D97706] to-[#F59E0B]"
            color="from-[#D97706] to-[#F59E0B]"
          />
          <MetricCard
            icon={Megaphone}
            title="Announcements"
            value={data.metrics.announcements}
            subtitle="Posted this month"
            trend={5}
            iconBg="from-[#059669] to-[#10B981]"
            color="from-[#059669] to-[#10B981]"
          />
          <MetricCard
            icon={Users}
            title="Active Users"
            value={data.metrics.activeUsers}
            subtitle="Community members"
            trend={10}
            iconBg="from-[#3B82F6] to-[#60A5FA]"
            color="from-[#3B82F6] to-[#60A5FA]"
          />
          <MetricCard
            icon={AlertTriangle}
            title="Critical Issues"
            value={data.metrics.criticalIssues}
            subtitle="Needs attention"
            trend={-20}
            iconBg="from-[#DC2626] to-[#EF4444]"
            color="from-[#DC2626] to-[#EF4444]"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartSection
            title="Complaints Per Day"
            icon={Activity}
            type="line"
            data={data.complaintsPerDay}
            dataKey="complaints"
            nameKey="date"
            colors={["#8D153A"]}
            height={300}
          />
          <ChartSection
            title="Complaints by Category"
            icon={Target}
            type="bar"
            data={data.complaintsByCategory}
            dataKey="count"
            nameKey="category"
            colors={["#8D153A", "#00534E", "#D97706", "#059669", "#DC2626"]}
            height={300}
          />
        </div>

        {/* Urgency Distribution */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartSection
            title="Urgency Distribution"
            icon={AlertTriangle}
            type="pie"
            data={data.urgencyDistribution}
            dataKey="value"
            nameKey="name"
            colors={["#10B981", "#F59E0B", "#EF4444", "#DC2626"]}
            height={350}
          />

          {/* Community Growth Chart */}
          <ChartSection
            title="Member Growth Trend"
            icon={Users}
            type="line"
            data={data.communityGrowth.memberGrowth}
            dataKey="members"
            nameKey="month"
            colors={["#00534E"]}
            height={350}
          />
        </div>

        {/* Most Upvoted Complaints */}
        <DataTable
          title="Most Upvoted Complaints"
          icon={Award}
          columns={upvotedComplaintsColumns}
          data={data.mostUpvotedComplaints}
        />

        {/* Critical Alerts */}
        <DataTable
          title="Critical Alerts - Needs Immediate Attention"
          icon={AlertTriangle}
          columns={criticalAlertsColumns}
          data={data.criticalAlerts}
        />

        {/* Announcement Performance */}
        <DataTable
          title="Announcement Performance"
          icon={Bell}
          columns={announcementColumns}
          data={data.announcementPerformance}
        />

        {/* Community Growth Metrics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-8 w-8 text-[#8D153A]" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {data.communityGrowth.newMembersThisWeek}
            </p>
            <p className="text-sm font-semibold text-gray-600 mt-2">
              New Members This Week
            </p>
            <div className="mt-4 pt-4 border-t border-white/60">
              <p className="text-xs text-gray-500">
                Total: {data.communityGrowth.totalMembers}
              </p>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-3">
              <Activity className="h-8 w-8 text-[#00534E]" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {data.communityGrowth.dailyActiveUsersPercent}%
            </p>
            <p className="text-sm font-semibold text-gray-600 mt-2">
              Daily Active Users
            </p>
            <div className="mt-4 pt-4 border-t border-white/60">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#00534E] to-[#059669] h-2 rounded-full"
                  style={{
                    width: `${data.communityGrowth.dailyActiveUsersPercent}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-3">
              <Target className="h-8 w-8 text-[#D97706]" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {data.communityGrowth.returningUsersPercent}%
            </p>
            <p className="text-sm font-semibold text-gray-600 mt-2">
              Returning Users
            </p>
            <div className="mt-4 pt-4 border-t border-white/60">
              <p className="text-xs text-gray-500">
                New: {data.communityGrowth.newUsersPercent}%
              </p>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center justify-between mb-3">
              <Clock className="h-8 w-8 text-[#059669]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {data.responseTimeMetrics.averageResponseTime}
            </p>
            <p className="text-sm font-semibold text-gray-600 mt-2">
              Avg Response Time
            </p>
            <div className="mt-4 pt-4 border-t border-white/60">
              <p className="text-xs text-gray-500">
                Resolution: {data.responseTimeMetrics.resolutionRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
          <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
            <Award className="h-6 w-6 mr-3 text-[#8D153A]" />
            Top Contributors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.topContributors.map((contributor, index) => (
              <div
                key={index}
                className="p-4 bg-white/60 rounded-2xl border border-white/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#8D153A] to-[#00534E] text-white font-bold rounded-full text-lg">
                  {index + 1}
                </div>
                <p className="font-bold text-gray-800 text-center mb-1">
                  {contributor.name}
                </p>
                <div className="text-center space-y-1">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">
                      {contributor.complaints}
                    </span>{" "}
                    complaints
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-[#8D153A]">
                      {contributor.upvotes}
                    </span>{" "}
                    upvotes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommunityAnalytics;
