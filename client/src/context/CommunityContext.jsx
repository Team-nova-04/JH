import { createContext, useContext, useState, useEffect } from "react";
import {
  mockCommunities,
  mockAnnouncements,
  mockComplaints,
} from "../data/mockCommunityData";

const CommunityContext = createContext();

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within CommunityProvider");
  }
  return context;
};

export const CommunityProvider = ({ children }) => {
  // Load initial state from localStorage
  const [joinedCommunities, setJoinedCommunities] = useState(() => {
    const saved = localStorage.getItem("joinedCommunities");
    return saved ? JSON.parse(saved) : [];
  });

  const [communities] = useState(mockCommunities);
  const [announcements] = useState(mockAnnouncements);
  const [complaints, setComplaints] = useState(mockComplaints);

  // Persist joined communities to localStorage
  useEffect(() => {
    localStorage.setItem(
      "joinedCommunities",
      JSON.stringify(joinedCommunities)
    );
  }, [joinedCommunities]);

  // Join a community
  const joinCommunity = (communityId) => {
    if (!joinedCommunities.includes(communityId)) {
      setJoinedCommunities([...joinedCommunities, communityId]);
      return true;
    }
    return false;
  };

  // Leave a community
  const leaveCommunity = (communityId) => {
    setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId));
  };

  // Check if user has joined a community
  const hasJoined = (communityId) => {
    return joinedCommunities.includes(communityId);
  };

  // Get community by ID
  const getCommunityById = (communityId) => {
    return communities.find((c) => c.id === communityId);
  };

  // Get announcements for a community
  const getAnnouncementsByCommunity = (communityId) => {
    return announcements.filter((a) => a.communityId === communityId);
  };

  // Get complaints for a community
  const getComplaintsByCommunity = (communityId) => {
    return complaints.filter((c) => c.communityId === communityId);
  };

  // Upvote a complaint
  const upvoteComplaint = (complaintId) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) => {
        if (complaint.id === complaintId) {
          return {
            ...complaint,
            upvotes: complaint.upvotes + 1,
            urgencyScore: Math.min(complaint.urgencyScore + 0.05, 1.0),
          };
        }
        return complaint;
      })
    );
  };

  // Check if user has upvoted (simple simulation - stored in component state)
  const value = {
    communities,
    joinedCommunities,
    announcements,
    complaints,
    joinCommunity,
    leaveCommunity,
    hasJoined,
    getCommunityById,
    getAnnouncementsByCommunity,
    getComplaintsByCommunity,
    upvoteComplaint,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};
