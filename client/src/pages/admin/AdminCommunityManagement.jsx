import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCommunity } from "../../context/CommunityContext";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Bell,
  AlertCircle,
  Users,
  MapPin,
  TrendingUp,
  X,
  Save,
  Shield,
  MessageSquare,
  Target
} from "lucide-react";

const AdminCommunityManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getCommunityById,
    getAnnouncementsByCommunity,
    getComplaintsByCommunity,
  } = useCommunity();

  const [activeTab, setActiveTab] = useState("announcements");
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "event",
    description: "",
    severity: "medium",
    affectedAreas: "",
  });

  const community = getCommunityById(id);
  const communityAnnouncements = getAnnouncementsByCommunity(id);
  const communityComplaints = getComplaintsByCommunity(id);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Community Not Found
          </h2>
          <Link
            to="/admin/communities"
            className="inline-block bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Back to Communities
          </Link>
        </div>
      </div>
    );
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    // Mock create - in real app, this would call API
    console.log("Creating announcement:", formData);
    alert("Announcement created successfully! (Mock - no backend)");
    setShowAnnouncementForm(false);
    resetForm();
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      type: announcement.type,
      description: announcement.description,
      severity: announcement.severity,
      affectedAreas: announcement.affectedAreas.join(", "),
    });
    setShowAnnouncementForm(true);
  };

  const handleUpdateAnnouncement = (e) => {
    e.preventDefault();
    // Mock update - in real app, this would call API
    console.log("Updating announcement:", editingAnnouncement.id, formData);
    alert("Announcement updated successfully! (Mock - no backend)");
    setShowAnnouncementForm(false);
    setEditingAnnouncement(null);
    resetForm();
  };

  const handleDeleteAnnouncement = (announcementId) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      // Mock delete - in real app, this would call API
      console.log("Deleting announcement:", announcementId);
      alert("Announcement deleted successfully! (Mock - no backend)");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "event",
      description: "",
      severity: "medium",
      affectedAreas: "",
    });
    setEditingAnnouncement(null);
  };

  const getTypeColor = (type) => {
    const colors = {
      "power-cut": "bg-yellow-100 text-yellow-800 border-yellow-200",
      water: "bg-blue-100 text-blue-800 border-blue-200",
      infrastructure: "bg-orange-100 text-orange-800 border-orange-200",
      event: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-orange-100 text-orange-800 border-orange-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[severity] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="space-y-6">
          <button
            onClick={() => navigate("/admin/communities")}
            className="flex items-center space-x-3 text-gray-700 transition-colors duration-300 group hover:text-gray-900"
          >
            <div className="p-2 transition-all duration-300 border shadow-lg bg-white/60 backdrop-blur-md border-white/40 rounded-xl group-hover:shadow-xl">
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            </div>
            <span className="text-lg font-semibold">Back to Communities</span>
          </button>

          {/* Community Header */}
          <div className="overflow-hidden border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] p-8">
              <div className="flex items-center mb-4 space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-white">
                    {community.name}
                  </h1>
                  <div className="flex items-center space-x-3 text-white/90">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{community.location}</span>
                  </div>
                </div>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-white/80">
                {community.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-4">
              <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                <div className="flex items-center justify-center mb-2 space-x-2">
                  <Users className="h-5 w-5 text-[#8D153A]" />
                  <span className="text-sm font-semibold text-gray-600">
                    Members
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {community.memberCount.toLocaleString()}
                </p>
              </div>
              <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                <div className="flex items-center justify-center mb-2 space-x-2">
                  <AlertCircle className="h-5 w-5 text-[#00534E]" />
                  <span className="text-sm font-semibold text-gray-600">
                    Active Issues
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {communityComplaints.length}
                </p>
              </div>
              <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                <div className="flex items-center justify-center mb-2 space-x-2">
                  <Bell className="h-5 w-5 text-[#D97706]" />
                  <span className="text-sm font-semibold text-gray-600">
                    Announcements
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {communityAnnouncements.length}
                </p>
              </div>
              <div className="p-4 text-center border bg-white/40 rounded-2xl border-white/60">
                <div className="flex items-center justify-center mb-2 space-x-2">
                  <TrendingUp className="h-5 w-5 text-[#059669]" />
                  <span className="text-sm font-semibold text-gray-600">
                    Total Upvotes
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {communityComplaints.reduce((sum, c) => sum + c.upvotes, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("announcements")}
              className={`group px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "announcements"
                  ? "bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white shadow-lg"
                  : "bg-white/60 backdrop-blur-md text-gray-700 hover:bg-white/80 border border-white/60"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Announcements ({communityAnnouncements.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`group px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === "issues"
                  ? "bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white shadow-lg"
                  : "bg-white/60 backdrop-blur-md text-gray-700 hover:bg-white/80 border border-white/60"
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Community Issues ({communityComplaints.length})</span>
              </div>
            </button>
          </div>

          {activeTab === "announcements" && (
            <button
              onClick={() => {
                setShowAnnouncementForm(true);
                setEditingAnnouncement(null);
                resetForm();
              }}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              <span>Create Announcement</span>
            </button>
          )}
        </div>

        {/* Announcement Form Modal */}
        {showAnnouncementForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAnnouncementForm(false)}
          >
            <div
              className="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {editingAnnouncement
                      ? "Edit Announcement"
                      : "Create New Announcement"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAnnouncementForm(false);
                      resetForm();
                    }}
                    className="p-2 transition-all duration-300 hover:bg-white/60 rounded-xl"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form
                  onSubmit={
                    editingAnnouncement
                      ? handleUpdateAnnouncement
                      : handleCreateAnnouncement
                  }
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-3 text-sm font-semibold text-gray-700">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                        placeholder="Enter announcement title"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">
                          Type *
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                        >
                          <option value="event">Community Event</option>
                          <option value="power-cut">Power Cut</option>
                          <option value="water">Water Supply</option>
                          <option value="infrastructure">Infrastructure</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-3 text-sm font-semibold text-gray-700">
                          Severity Level *
                        </label>
                        <select
                          name="severity"
                          value={formData.severity}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-3 text-sm font-semibold text-gray-700">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Enter announcement description"
                      />
                    </div>

                    <div>
                      <label className="block mb-3 text-sm font-semibold text-gray-700">
                        Affected Areas (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="affectedAreas"
                        value={formData.affectedAreas}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                        placeholder="e.g., Sector A, Sector B, Main Street"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-6 mt-8 space-x-4 border-t border-white/60">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAnnouncementForm(false);
                        resetForm();
                      }}
                      className="px-6 py-3 font-semibold text-gray-700 transition-all duration-300 border bg-white/60 backdrop-blur-md rounded-xl hover:bg-white/80 border-white/60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingAnnouncement ? "Update" : "Create"} Announcement</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-6">
          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <>
              {communityAnnouncements.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {communityAnnouncements
                    .sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                    )
                    .map((announcement) => (
                      <div
                        key={announcement.id}
                        className="p-6 transition-all duration-300 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl hover:shadow-2xl"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(
                                    announcement.type
                                  )}`}
                                >
                                  {announcement.type
                                    .toUpperCase()
                                    .replace("-", " ")}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                                    announcement.severity
                                  )}`}
                                >
                                  {announcement.severity.toUpperCase()}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {announcement.title}
                              </h3>
                              <p className="leading-relaxed text-gray-700">
                                {announcement.description}
                              </p>
                              {announcement.affectedAreas &&
                                announcement.affectedAreas.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {announcement.affectedAreas.map(
                                      (area, idx) => (
                                        <span
                                          key={idx}
                                          className="px-3 py-1 text-sm text-gray-700 border rounded-lg bg-white/60 border-white/60"
                                        >
                                          {area}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                            <div className="flex items-center ml-4 space-x-2">
                              <button
                                onClick={() =>
                                  handleEditAnnouncement(announcement)
                                }
                                className="p-2 bg-[#8D153A]/10 text-[#8D153A] rounded-xl hover:bg-[#8D153A]/20 transition-all duration-300"
                                title="Edit"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteAnnouncement(announcement.id)
                                }
                                className="p-2 text-red-600 transition-all duration-300 bg-red-100 rounded-xl hover:bg-red-200"
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center pt-4 space-x-3 text-sm text-gray-600 border-t border-white/60">
                            <Bell className="w-4 h-4" />
                            <span>
                              Posted{" "}
                              {new Date(
                                announcement.timestamp
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-16 text-center border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
                  <Bell className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-3 text-2xl font-bold text-gray-800">
                    No Announcements Yet
                  </h3>
                  <p className="max-w-md mx-auto mb-6 text-lg text-gray-700">
                    Create your first announcement to keep the community informed and engaged.
                  </p>
                  <button
                    onClick={() => {
                      setShowAnnouncementForm(true);
                      resetForm();
                    }}
                    className="bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-8 py-3 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Create First Announcement
                  </button>
                </div>
              )}
            </>
          )}

          {/* Issues Tab */}
          {activeTab === "issues" && (
            <>
              {communityComplaints.length > 0 ? (
                <div className="space-y-6">
                  {communityComplaints
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map((complaint) => (
                      <div
                        key={complaint.id}
                        className="p-6 transition-all duration-300 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl hover:shadow-2xl"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                    complaint.status === "resolved"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : complaint.status === "in-progress"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  }`}
                                >
                                  {complaint.status
                                    .toUpperCase()
                                    .replace("-", " ")}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-[#8D153A]/10 text-[#8D153A] border-[#8D153A]/20">
                                  {complaint.category.toUpperCase()}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                    complaint.urgencyScore >= 0.8
                                      ? "bg-red-100 text-red-800 border-red-200"
                                      : complaint.urgencyScore >= 0.6
                                      ? "bg-orange-100 text-orange-800 border-orange-200"
                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  }`}
                                >
                                  URGENCY:{" "}
                                  {(complaint.urgencyScore * 100).toFixed(0)}%
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {complaint.title}
                              </h3>
                              <p className="leading-relaxed text-gray-700">
                                {complaint.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{complaint.location}</span>
                                </div>
                                <span>•</span>
                                <span className="font-semibold text-[#00534E]">
                                  {complaint.upvotes} upvotes
                                </span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    complaint.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-16 text-center border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
                  <Target className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-3 text-2xl font-bold text-gray-800">
                    No Issues Reported
                  </h3>
                  <p className="max-w-md mx-auto text-lg text-gray-700">
                    Excellent! This community currently has no reported issues. 
                    The community members are satisfied with their neighborhood.
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

export default AdminCommunityManagement;