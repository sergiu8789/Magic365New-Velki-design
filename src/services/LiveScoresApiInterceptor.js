import axios from "axios";

const service = axios.create({
  baseURL: '',
  timeout: 60000,
});


// API Request interceptor
service.interceptors.request.use(
  (config) => {
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
