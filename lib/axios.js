import Axios from "axios";

const axios = Axios.create({
  // baseURL: "https://rocky-garden-12404.herokuapp.com",
  baseURL: "http://139.59.11.234:8080",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default axios;
