import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,//add /v1 in production
  // baseURL: `https://trusukoon-backend-pvt.vercel.app/api/v1`,
  withCredentials: true, // ✅ so cookies (JWT) are sent automatically
});

// Optional: Add interceptors for handling token errors or 401s globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe token expired");
    }
    return Promise.reject(error);
  }
);

export default api;
