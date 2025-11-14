// Mock data for Community Module - Frontend only

export const mockCommunities = [
  {
    id: "comm-1",
    name: "Downtown District",
    description:
      "Connect with residents of downtown area. Stay updated on local issues, events, and community announcements.",
    location: "Downtown, City Center",
    memberCount: 1248,
    activeIssues: 15,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "comm-2",
    name: "Green Valley",
    description:
      "A peaceful residential community focused on environmental sustainability and neighborhood safety.",
    location: "Green Valley, North District",
    memberCount: 892,
    activeIssues: 8,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "comm-3",
    name: "Tech Hub Zone",
    description:
      "Tech professionals and startups unite! Discuss infrastructure needs and local development.",
    location: "Tech Hub, East Side",
    memberCount: 2103,
    activeIssues: 22,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "comm-4",
    name: "Riverside Community",
    description:
      "Residents along the riverside area. Focus on flood prevention, parks, and recreational facilities.",
    location: "Riverside, West District",
    memberCount: 756,
    activeIssues: 12,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "comm-5",
    name: "University Neighborhood",
    description:
      "Students and residents near the university campus. Share concerns about traffic, noise, and local amenities.",
    location: "University District, South",
    memberCount: 1567,
    activeIssues: 18,
    imageUrl: "/api/placeholder/400/300",
  },
  {
    id: "comm-6",
    name: "Old Town Heritage",
    description:
      "Preserve and enhance our historic district. Discuss heritage conservation and tourism improvements.",
    location: "Old Town, Central",
    memberCount: 634,
    activeIssues: 6,
    imageUrl: "/api/placeholder/400/300",
  },
];

export const mockAnnouncements = [
  {
    id: "ann-1",
    communityId: "comm-1",
    title: "Scheduled Power Maintenance",
    type: "power-cut",
    description:
      "Power will be shut down on December 15th from 2 PM to 5 PM for scheduled maintenance work in sectors A, B, and C.",
    timestamp: new Date("2025-12-10T09:00:00").toISOString(),
    severity: "medium",
    affectedAreas: ["Sector A", "Sector B", "Sector C"],
  },
  {
    id: "ann-2",
    communityId: "comm-1",
    title: "Water Supply Disruption Notice",
    type: "water",
    description:
      "Water supply will be temporarily suspended on December 12th from 6 AM to 12 PM due to pipeline repairs.",
    timestamp: new Date("2025-12-08T14:30:00").toISOString(),
    severity: "high",
    affectedAreas: ["Main Street", "Oak Avenue"],
  },
  {
    id: "ann-3",
    communityId: "comm-2",
    title: "Community Clean-up Drive",
    type: "event",
    description:
      "Join us for a community clean-up event this Saturday at 8 AM. Let's make our neighborhood beautiful!",
    timestamp: new Date("2025-12-05T10:00:00").toISOString(),
    severity: "low",
    affectedAreas: ["Green Valley Park"],
  },
  {
    id: "ann-4",
    communityId: "comm-3",
    title: "Road Construction Alert",
    type: "infrastructure",
    description:
      "Main road construction will begin next week. Expect traffic delays and use alternate routes.",
    timestamp: new Date("2025-12-11T08:00:00").toISOString(),
    severity: "medium",
    affectedAreas: ["Tech Hub Main Road"],
  },
  {
    id: "ann-5",
    communityId: "comm-2",
    title: "Power Cut - Emergency Maintenance",
    type: "power-cut",
    description:
      "Emergency power maintenance required. Outage expected for 3 hours starting 4 PM today.",
    timestamp: new Date("2025-12-13T15:00:00").toISOString(),
    severity: "high",
    affectedAreas: ["Green Valley", "Entire District"],
  },
  {
    id: "ann-6",
    communityId: "comm-4",
    title: "Flood Warning System Test",
    type: "water",
    description:
      "We will be testing the flood warning sirens tomorrow at 11 AM. This is a test only.",
    timestamp: new Date("2025-12-07T16:00:00").toISOString(),
    severity: "low",
    affectedAreas: ["Riverside Area"],
  },
];

export const mockComplaints = [
  {
    id: "comp-1",
    communityId: "comm-1",
    title: "Broken Street Light on Main Avenue",
    description:
      "The street light near building 42 has been broken for 2 weeks now. This area becomes very dark at night, creating safety concerns.",
    category: "infrastructure",
    urgencyScore: 0.65,
    status: "pending",
    upvotes: 23,
    createdAt: new Date("2025-11-28T18:30:00").toISOString(),
    location: "Main Avenue, Downtown",
  },
  {
    id: "comp-2",
    communityId: "comm-1",
    title: "Water Leakage in Park Area",
    description:
      "Continuous water leakage from underground pipe near the central park. Water is being wasted daily.",
    category: "water",
    urgencyScore: 0.78,
    status: "in-progress",
    upvotes: 45,
    createdAt: new Date("2025-11-25T10:15:00").toISOString(),
    location: "Central Park, Downtown",
  },
  {
    id: "comp-3",
    communityId: "comm-1",
    title: "Overflowing Garbage Bins",
    description:
      "The garbage collection bins at sector C are overflowing. Needs immediate attention to prevent health hazards.",
    category: "sanitation",
    urgencyScore: 0.82,
    status: "pending",
    upvotes: 67,
    createdAt: new Date("2025-11-30T12:00:00").toISOString(),
    location: "Sector C, Downtown",
  },
  {
    id: "comp-4",
    communityId: "comm-2",
    title: "Pothole on Green Valley Road",
    description:
      "Large pothole on the main road causing traffic issues and vehicle damage. Needs urgent repair.",
    category: "roads",
    urgencyScore: 0.71,
    status: "pending",
    upvotes: 34,
    createdAt: new Date("2025-11-26T14:45:00").toISOString(),
    location: "Green Valley Road",
  },
  {
    id: "comp-5",
    communityId: "comm-2",
    title: "Park Lights Not Working",
    description:
      "Multiple lights in the community park are not functioning. The park is unsafe after sunset.",
    category: "infrastructure",
    urgencyScore: 0.58,
    status: "pending",
    upvotes: 19,
    createdAt: new Date("2025-11-29T16:20:00").toISOString(),
    location: "Green Valley Park",
  },
  {
    id: "comp-6",
    communityId: "comm-3",
    title: "Noise Pollution from Construction",
    description:
      "Construction work starting at 6 AM every day creating excessive noise pollution in residential areas.",
    category: "noise",
    urgencyScore: 0.55,
    status: "resolved",
    upvotes: 28,
    createdAt: new Date("2025-11-20T08:00:00").toISOString(),
    location: "Tech Hub Zone",
  },
  {
    id: "comp-7",
    communityId: "comm-3",
    title: "Traffic Signal Malfunction",
    description:
      "Traffic signal at Tech Hub intersection is malfunctioning, causing traffic congestion during peak hours.",
    category: "traffic",
    urgencyScore: 0.88,
    status: "in-progress",
    upvotes: 92,
    createdAt: new Date("2025-12-01T07:30:00").toISOString(),
    location: "Tech Hub Intersection",
  },
  {
    id: "comp-8",
    communityId: "comm-4",
    title: "Drainage System Blocked",
    description:
      "The drainage system near riverside is completely blocked, causing water accumulation during rain.",
    category: "water",
    urgencyScore: 0.75,
    status: "pending",
    upvotes: 41,
    createdAt: new Date("2025-11-27T11:00:00").toISOString(),
    location: "Riverside Area",
  },
];
