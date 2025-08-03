import axios from "axios";

const api = axios.create({
  baseURL: "https://appdoaibu.my.id/api",
});

export default api;
