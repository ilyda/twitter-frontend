// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// 🔐 REQUEST INTERCEPTOR (HER REQUEST'E TOKEN EKLER)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;