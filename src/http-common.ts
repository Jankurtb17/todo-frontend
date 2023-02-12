import axios, { type AxiosInstance  } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://todo-backend-3xhc6fyx3-jankurtb17.vercel.app/posts",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;