// Mock data for community analytics

export const communityAnalyticsMockData = {
  // Summary metrics
  metrics: {
    totalComplaints: 145,
    highlyUpvoted: 23,
    weeklyUpvotes: 487,
    announcements: 12,
    activeUsers: 1248,
    criticalIssues: 5,
  },

  // Complaints per day (last 7 days)
  complaintsPerDay: [
    { date: "Mon", complaints: 18 },
    { date: "Tue", complaints: 25 },
    { date: "Wed", complaints: 15 },
    { date: "Thu", complaints: 32 },
    { date: "Fri", complaints: 28 },
    { date: "Sat", complaints: 12 },
    { date: "Sun", complaints: 15 },
  ],

  // Complaints by category
  complaintsByCategory: [
    { category: "Infrastructure", count: 45, color: "#8D153A" },
    { category: "Sanitation", count: 32, color: "#00534E" },
    { category: "Traffic", count: 28, color: "#D97706" },
    { category: "Utilities", count: 22, color: "#059669" },
    { category: "Safety", count: 18, color: "#DC2626" },
  ],

  // Urgency distribution
  urgencyDistribution: [
    { name: "Low", value: 45, color: "#10B981" },
    { name: "Medium", value: 58, color: "#F59E0B" },
    { name: "High", value: 37, color: "#EF4444" },
    { name: "Critical", value: 5, color: "#DC2626" },
  ],

  // Most upvoted complaints
  mostUpvotedComplaints: [
    {
      rank: 1,
      title: "Street lighting broken on Main Road for 3 weeks",
      upvotes: 147,
      status: "In Progress",
      category: "Infrastructure",
      urgency: "High",
    },
    {
      rank: 2,
      title: "Overflowing garbage bins near Community Center",
      upvotes: 132,
      status: "Resolved",
      category: "Sanitation",
      urgency: "Medium",
    },
    {
      rank: 3,
      title: "Pothole causing accidents on Highway 45",
      upvotes: 128,
      status: "In Progress",
      category: "Infrastructure",
      urgency: "Critical",
    },
    {
      rank: 4,
      title: "Noise pollution from construction site",
      upvotes: 95,
      status: "Pending",
      category: "Safety",
      urgency: "Medium",
    },
    {
      rank: 5,
      title: "Water supply interruption in Block A",
      upvotes: 89,
      status: "Resolved",
      category: "Utilities",
      urgency: "High",
    },
    {
      rank: 6,
      title: "Illegal parking blocking emergency exit",
      upvotes: 76,
      status: "In Progress",
      category: "Traffic",
      urgency: "High",
    },
    {
      rank: 7,
      title: "Playground equipment needs repair",
      upvotes: 64,
      status: "Pending",
      category: "Infrastructure",
      urgency: "Low",
    },
    {
      rank: 8,
      title: "Stray dog menace in residential area",
      upvotes: 58,
      status: "Pending",
      category: "Safety",
      urgency: "Medium",
    },
  ],

  // Announcement performance
  announcementPerformance: [
    {
      id: 1,
      title: "Community Clean-up Drive This Weekend",
      views: 1247,
      engagement: "High",
      date: "2025-11-10",
      reactions: 324,
    },
    {
      id: 2,
      title: "Water Supply Maintenance Schedule",
      views: 2156,
      engagement: "High",
      date: "2025-11-08",
      reactions: 456,
    },
    {
      id: 3,
      title: "New Community Guidelines Released",
      views: 892,
      engagement: "Medium",
      date: "2025-11-05",
      reactions: 145,
    },
    {
      id: 4,
      title: "Road Construction Update - Main Street",
      views: 1834,
      engagement: "High",
      date: "2025-11-03",
      reactions: 389,
    },
    {
      id: 5,
      title: "Community Meeting Scheduled for Nov 20",
      views: 567,
      engagement: "Medium",
      date: "2025-11-01",
      reactions: 98,
    },
    {
      id: 6,
      title: "Festival Celebration Planning",
      views: 423,
      engagement: "Low",
      date: "2025-10-28",
      reactions: 67,
    },
  ],

  // Critical alerts
  criticalAlerts: [
    {
      id: 1,
      title: "Gas leak reported near School Complex",
      urgency: "Critical",
      status: "Pending",
      reportedAt: "2 hours ago",
      upvotes: 45,
      category: "Safety",
    },
    {
      id: 2,
      title: "Pothole causing accidents on Highway 45",
      urgency: "Critical",
      status: "In Progress",
      reportedAt: "1 day ago",
      upvotes: 128,
      category: "Infrastructure",
    },
    {
      id: 3,
      title: "Electrical wiring exposed in public park",
      urgency: "Critical",
      status: "Pending",
      reportedAt: "3 hours ago",
      upvotes: 67,
      category: "Safety",
    },
    {
      id: 4,
      title: "Sewage overflow on residential street",
      urgency: "High",
      status: "In Progress",
      reportedAt: "5 hours ago",
      upvotes: 89,
      category: "Sanitation",
    },
    {
      id: 5,
      title: "Bridge structure damage needs immediate attention",
      urgency: "Critical",
      status: "Pending",
      reportedAt: "12 hours ago",
      upvotes: 156,
      category: "Infrastructure",
    },
  ],

  // Community growth metrics
  communityGrowth: {
    newMembersThisWeek: 47,
    totalMembers: 1248,
    returningUsersPercent: 68,
    newUsersPercent: 32,
    dailyActiveUsersPercent: 24,
    weeklyActiveUsersPercent: 61,
    monthlyActiveUsersPercent: 89,
    memberGrowth: [
      { month: "Jun", members: 856 },
      { month: "Jul", members: 923 },
      { month: "Aug", members: 1045 },
      { month: "Sep", members: 1134 },
      { month: "Oct", members: 1201 },
      { month: "Nov", members: 1248 },
    ],
  },

  // Additional insights
  responseTimeMetrics: {
    averageResponseTime: "4.2 hours",
    fastestResponse: "15 minutes",
    slowestResponse: "2.3 days",
    resolutionRate: 76,
  },

  topContributors: [
    { name: "John Silva", complaints: 23, upvotes: 456 },
    { name: "Sarah Fernando", complaints: 18, upvotes: 389 },
    { name: "Michael Perera", complaints: 15, upvotes: 334 },
    { name: "Anjali Wijesinghe", complaints: 12, upvotes: 278 },
    { name: "Kasun Rajapakse", complaints: 11, upvotes: 245 },
  ],
};
