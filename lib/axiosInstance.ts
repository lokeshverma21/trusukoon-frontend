import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`,//add /v1 in production
  // baseURL: `https://trusukoon-backend-pvt.vercel.app/api/v1`,
  withCredentials: true, // ✅ so cookies (JWT) are sent automatically
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;

    if (
      host.endsWith(".lokeshverma.in") &&
      host !== "lokeshverma.in" &&
      host !== "www.lokeshverma.in"
    ) {
      const subdomain = host.replace(".lokeshverma.in", "");
      config.headers["x-tenant-subdomain"] = subdomain;
    }
  }

  return config;
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
