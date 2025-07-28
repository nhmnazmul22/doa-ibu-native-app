import axios from "axios";

const api = axios.create({
  baseURL: "http://appdoaibu.my.id/api",
});

export default api;
