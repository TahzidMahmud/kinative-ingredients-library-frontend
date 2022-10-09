import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://admin.glowscam.com",
  // baseURL: "http://localhost:8000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default axios;
