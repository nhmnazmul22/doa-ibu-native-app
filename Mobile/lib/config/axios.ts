import axios from "axios";

const api = axios.create({
  baseURL: "https://doa-ibu-native-app.onrender.com/api",
});

export default api;
