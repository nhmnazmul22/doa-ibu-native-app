import axios from "axios";

const api = axios.create({
  baseURL: "https://doa-ibu-native-app.vercel.app/api",
});

export default api;
