import axios from "axios";

// Backend deployed URL
const BASE_URL = "https://citi-solve2.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
// AUTH APIs
export const authAPI = {
  register: async (data) => {
    const res = await API.post("/auth/register", data);
    return res.data;
  },

  login: async (data) => {
    const res = await API.post("/auth/login", data);
    return res.data;
  }
};

// COMPLAINT APIs
export const complaintsAPI = {
  createComplaint: async (data) => {
    const res = await API.post("/complaints", data);
    return res.data;
  },

  getMyComplaints: async () => {
    const res = await API.get("/complaints/my");
    return res.data;
  },

  getComplaints: async () => {
    const res = await API.get("/complaints");
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await API.put(`/complaints/${id}/status`, { status });
    return res.data;
  }
};
