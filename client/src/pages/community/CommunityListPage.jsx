import { useEffect } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CommunityCard from "../../components/community/CommunityCard";
import { Users, Search, TrendingUp, LogIn, AlertCircle } from "lucide-react";
import AOS from "aos";

const CommunityListPage = () => {
  const { communities, joinedCommunities } = useCommunity();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12" data-aos="fade-down">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Community Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with your local community, stay updated on announcements,
            and collaborate on solving neighborhood issues.
          </p>
        </div>

        {/* Login Banner for Unauthenticated Users */}
        {!isAuthenticated && (
          <div className="mb-8" data-aos="fade-up">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4 text-white">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <AlertCircle className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        Login Required to Join Communities
                      </h3>
                      <p className="text-green-50 text-lg">
                        Sign in to your citizen account to join communities,
                        participate in discussions, and stay updated with local
                        announcements.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/citizen/login"
                    state={{
                      from: "/communities",
                      message: "Please login to join communities",
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                  >
                    <LogIn className="h-5 w-5" />
                    Login to Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          data-aos="fade-up"
        >
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {communities.length}
                </p>
                <p className="text-sm text-gray-600">Total Communities</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {joinedCommunities.length}
                </p>
                <p className="text-sm text-gray-600">Joined Communities</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {communities.reduce((sum, c) => sum + c.activeIssues, 0)}
                </p>
                <p className="text-sm text-gray-600">Active Issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Joined Communities Section */}
        {joinedCommunities.length > 0 && (
          <div className="mb-12" data-aos="fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                My Communities
              </h2>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {joinedCommunities.length} joined
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities
                .filter((community) => joinedCommunities.includes(community.id))
                .map((community) => (
                  <div key={community.id} className="relative">
                    <CommunityCard community={community} />
                    <Link
                      to={`/community/${community.id}/feed`}
                      className="mt-3 block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Feed →
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Communities Section */}
        <div data-aos="fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {joinedCommunities.length > 0
                ? "Discover More Communities"
                : "All Communities"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities
              .filter((community) => !joinedCommunities.includes(community.id))
              .map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
          </div>
        </div>

        {/* Empty State */}
        {communities.length === 0 && (
          <div className="text-center py-16" data-aos="fade-up">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Communities Available
            </h3>
            <p className="text-gray-600">
              Check back later for new communities in your area.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityListPage;
