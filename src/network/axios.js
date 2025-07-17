import axios from "axios";

const instance = axios.create({
  baseURL: "https://booking-app-db.vercel.app/",
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
