import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default axiosClient;
