import Axios from "axios";

const axios = Axios.create({
  // baseURL: "https://rocky-garden-12404.herokuapp.com",
  baseURL: "http://admin.glowscam.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default axios;
