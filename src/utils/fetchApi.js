import axios from "axios";

// Create an instance of axios with the common headers
const fetchapi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to set the "Authorization" header with the token from localStorage
fetchapi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default fetchapi;
