import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
    Referer: "http://localhost:3000/",
  },
  withCredentials: true,
});

export default axios;
