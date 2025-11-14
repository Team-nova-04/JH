import { useEffect } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { Link } from "react-router-dom";
import CommunityCard from "../../components/community/CommunityCard";
import { Users, Search, TrendingUp, MapPin, MessageSquare, Heart } from "lucide-react";
import AOS from "aos";
import 'aos/dist/aos.css';

const CommunityListPage = () => {
  const { communities, joinedCommunities } = useCommunity();

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    // Scroll to top when component mounts (on reload)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#FEF3C7' : '#FDE68A'}30, transparent)`,
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center" data-aos="fade-down" data-aos-delay="100">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <Users className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Community Hub
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Connect with your local community, stay updated on announcements,
            and collaborate on solving neighborhood issues across Sri Lanka.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3" data-aos="fade-up" data-aos-delay="200">
          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-[#8D153A] to-[#A52D5A] p-3 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{communities.length}</p>
                <p className="text-sm font-semibold text-gray-600">Total Communities</p>
              </div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-[#00534E] to-[#008080] p-3 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{joinedCommunities.length}</p>
                <p className="text-sm font-semibold text-gray-600">Joined Communities</p>
              </div>
            </div>
          </div>

          <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-3 rounded-2xl shadow-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {communities.reduce((sum, c) => sum + c.activeIssues, 0)}
                </p>
                <p className="text-sm font-semibold text-gray-600">Active Issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Joined Communities Section */}
        {joinedCommunities.length > 0 && (
          <div className="mb-12" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-gray-800">My Communities</h2>
                <p className="text-gray-700">Communities you're actively participating in</p>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-full text-sm font-semibold shadow-lg">
                {joinedCommunities.length} joined
              </span>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {communities
                .filter((community) => joinedCommunities.includes(community.id))
                .map((community, index) => (
                  <div key={community.id} className="relative" data-aos="zoom-in" data-aos-delay={400 + (index * 100)}>
                    <CommunityCard community={community} />
                    <Link
                      to={`/community/${community.id}/feed`}
                      className="mt-4 block w-full text-center py-3 px-4 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      View Community Feed →
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Communities Section */}
        <div data-aos="fade-up" data-aos-delay="500">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                {joinedCommunities.length > 0
                  ? "Discover More Communities"
                  : "Explore Communities in Sri Lanka"}
              </h2>
              <p className="text-gray-700">
                {joinedCommunities.length > 0
                  ? "Join more communities to stay connected with different areas"
                  : "Join communities to connect with locals and stay updated on neighborhood matters"}
              </p>
            </div>
          </div>
          
          {communities.filter((community) => !joinedCommunities.includes(community.id)).length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {communities
                .filter((community) => !joinedCommunities.includes(community.id))
                .map((community, index) => (
                  <div key={community.id} data-aos="zoom-in" data-aos-delay={600 + (index * 100)}>
                    <CommunityCard community={community} />
                  </div>
                ))}
            </div>
          ) : (
            <div className="py-12 text-center border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-3 text-2xl font-bold text-gray-800">You've Joined All Communities!</h3>
              <p className="mb-6 text-lg text-gray-700">
                You're now connected to all available communities. Stay active and engage with your neighbors.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-[#8D153A]" />
                  <span>Share updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-[#00534E]" />
                  <span>Support neighbors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-[#D97706]" />
                  <span>Build connections</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State - No Communities Available */}
        {communities.length === 0 && (
          <div className="py-16 text-center border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl" data-aos="fade-up" data-aos-delay="600">
            <Users className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h3 className="mb-3 text-2xl font-bold text-gray-800">No Communities Available Yet</h3>
            <p className="max-w-2xl mx-auto mb-6 text-lg text-gray-700">
              We're working on setting up communities in your area. Check back soon to connect with your neighbors and stay updated on local matters.
            </p>
            <div className="max-w-md p-6 mx-auto border bg-white/40 rounded-2xl border-white/60">
              <h4 className="mb-3 font-semibold text-gray-800">What to expect:</h4>
              <ul className="space-y-2 text-left text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="bg-[#8D153A] rounded-full w-2 h-2"></div>
                  <span>Local neighborhood communities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="bg-[#00534E] rounded-full w-2 h-2"></div>
                  <span>Real-time community updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="bg-[#D97706] rounded-full w-2 h-2"></div>
                  <span>Collaborative issue resolution</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Community Benefits Section */}
        {communities.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-8 text-white" data-aos="zoom-in" data-aos-delay="700">
            <h2 className="mb-6 text-3xl font-bold text-center">Why Join Communities?</h2>
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
              <div>
                <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-white/20 rounded-2xl">
                  <MessageSquare className="h-8 w-8 text-[#FFBE29]" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Stay Informed</h3>
                <p className="text-sm text-white/90">Get real-time updates about your neighborhood and local issues</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-white/20 rounded-2xl">
                  <Users className="h-8 w-8 text-[#FFBE29]" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Connect Locally</h3>
                <p className="text-sm text-white/90">Build relationships with neighbors and local authorities</p>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-white/20 rounded-2xl">
                  <Heart className="h-8 w-8 text-[#FFBE29]" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Collaborate</h3>
                <p className="text-sm text-white/90">Work together to solve community problems effectively</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityListPage;