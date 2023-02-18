import axios, { type AxiosInstance  } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://todo-backend-xi.vercel.app/posts",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;