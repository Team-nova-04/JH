import axiosClient from "./axiosClient";

/**
 * API Service
 * All API calls to the backend
 */

// ============ Citizen APIs ============
export const citizenAPI = {
  register: (data) => axiosClient.post("/citizens/register", data),
  login: (data) => axiosClient.post("/citizens/login", data),
  getProfile: () => axiosClient.get("/citizens/me"),
};

// ============ Complaint APIs ============
export const complaintAPI = {
  submit: (data, config) => axiosClient.post("/complaints", data, config),
  getMyComplaints: () => axiosClient.get("/complaints/my-complaints"),
  getById: (id) => axiosClient.get(`/complaints/${id}`),
};

// ============ Authority APIs ============
export const authorityAPI = {
  login: (data) => axiosClient.post("/authority/login", data),
  getComplaints: (params) =>
    axiosClient.get("/authority/complaints", { params }),
  getComplaintById: (id) => axiosClient.get(`/authority/complaints/${id}`),
  updateStatus: (id, status) =>
    axiosClient.patch(`/authority/complaints/${id}/status`, { status }),
  addNote: (id, content) =>
    axiosClient.post(`/authority/complaints/${id}/notes`, { content }),
  requestContact: (id) =>
    axiosClient.post(`/authority/complaints/${id}/request-contact`),
};

// ============ Admin APIs ============
export const adminAPI = {
  login: (data) => axiosClient.post("/admin/login", data),
  createAuthorityUser: (data) =>
    axiosClient.post("/admin/authority-users", data),
  getAllComplaints: (params) =>
    axiosClient.get("/admin/complaints", { params }),
  uploadCSV: (file) => {
    const formData = new FormData();
    formData.append("csv", file);
    return axiosClient.post("/admin/upload-csv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// ============ Statistics APIs ============
export const statsAPI = {
  getOverview: () => axiosClient.get("/stats/overview"),
  getCategoryStats: () => axiosClient.get("/stats/category"),
  getUrgentStats: () => axiosClient.get("/stats/urgent"),
  getLocationStats: () => axiosClient.get("/stats/location"),
  getTrends: (days) => axiosClient.get("/stats/trends", { params: { days } }),
};
