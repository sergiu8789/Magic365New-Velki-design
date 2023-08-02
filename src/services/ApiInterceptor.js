import axios from "axios";
import { API_BASE_URL } from "../config/AppConfig";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "authorization";

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("token") || null;

    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
