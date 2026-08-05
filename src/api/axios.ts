import axios from "axios";

const NEXT_PUBLIC_API_URL = "https://dummyjson.com/"

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;