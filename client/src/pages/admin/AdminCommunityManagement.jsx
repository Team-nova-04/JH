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
} from "lucide-react";
import AOS from "aos";

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
    AOS.refresh();
  }, [activeTab]);

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Community Not Found
          </h2>
          <Link
            to="/admin/communities"
            className="text-blue-600 hover:text-blue-700 font-medium"
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/communities")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Communities</span>
          </button>

          {/* Community Header */}
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            data-aos="fade-down"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {community.name}
              </h1>
              <div className="flex items-center space-x-2 text-white/90 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{community.location}</span>
              </div>
              <p className="text-white/80">{community.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    Members
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
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
                <p className="text-2xl font-bold text-gray-900">
                  {communityComplaints.length}
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    Announcements
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {communityAnnouncements.length}
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    Total Upvotes
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {communityComplaints.reduce((sum, c) => sum + c.upvotes, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex items-center justify-between mb-6"
          data-aos="fade-up"
        >
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("announcements")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "announcements"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Announcements ({communityAnnouncements.length})
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "issues"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Issues ({communityComplaints.length})
            </button>
          </div>

          {activeTab === "announcements" && (
            <button
              onClick={() => {
                setShowAnnouncementForm(true);
                setEditingAnnouncement(null);
                resetForm();
              }}
              className="flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span>Create Announcement</span>
            </button>
          )}
        </div>

        {/* Announcement Form Modal */}
        {showAnnouncementForm && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAnnouncementForm(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              data-aos="zoom-in"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingAnnouncement
                      ? "Edit Announcement"
                      : "Create New Announcement"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAnnouncementForm(false);
                      resetForm();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <form
                  onSubmit={
                    editingAnnouncement
                      ? handleUpdateAnnouncement
                      : handleCreateAnnouncement
                  }
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter announcement title"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Type *
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="event">Event</option>
                          <option value="power-cut">Power Cut</option>
                          <option value="water">Water</option>
                          <option value="infrastructure">Infrastructure</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Severity *
                        </label>
                        <select
                          name="severity"
                          value={formData.severity}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter announcement description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Affected Areas (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="affectedAreas"
                        value={formData.affectedAreas}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Sector A, Sector B, Main Street"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAnnouncementForm(false);
                        resetForm();
                      }}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingAnnouncement ? "Update" : "Create"}</span>
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
                <div className="space-y-4" data-aos="fade-up">
                  {communityAnnouncements
                    .sort(
                      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                    )
                    .map((announcement) => (
                      <div
                        key={announcement.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {announcement.title}
                            </h3>
                            <p className="text-gray-700 mb-3">
                              {announcement.description}
                            </p>
                            {announcement.affectedAreas &&
                              announcement.affectedAreas.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {announcement.affectedAreas.map(
                                    (area, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                      >
                                        {area}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() =>
                                handleEditAnnouncement(announcement)
                              }
                              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteAnnouncement(announcement.id)
                              }
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center space-x-2 pt-3 border-t border-gray-100">
                          <Bell className="h-3 w-3" />
                          <span>
                            Posted{" "}
                            {new Date(
                              announcement.timestamp
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div
                  className="text-center py-16 bg-white rounded-xl shadow-sm"
                  data-aos="fade-up"
                >
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Announcements Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first announcement for this community.
                  </p>
                  <button
                    onClick={() => {
                      setShowAnnouncementForm(true);
                      resetForm();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create Announcement
                  </button>
                </div>
              )}
            </>
          )}

          {/* Issues Tab */}
          {activeTab === "issues" && (
            <>
              {communityComplaints.length > 0 ? (
                <div className="space-y-4" data-aos="fade-up">
                  {communityComplaints
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map((complaint) => (
                      <div
                        key={complaint.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
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
                              <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-orange-100 text-orange-800 border-orange-200">
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {complaint.title}
                            </h3>
                            <p className="text-gray-700 mb-3">
                              {complaint.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{complaint.location}</span>
                              </div>
                              <span>•</span>
                              <span className="font-semibold text-blue-600">
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
                    ))}
                </div>
              ) : (
                <div
                  className="text-center py-16 bg-white rounded-xl shadow-sm"
                  data-aos="fade-up"
                >
                  <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Issues Reported
                  </h3>
                  <p className="text-gray-600">
                    Great! There are currently no reported issues in this
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

export default AdminCommunityManagement;
