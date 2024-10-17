import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

request.interceptors.response.use((response) => response.data);

export default request;
