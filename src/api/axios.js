import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT + "/api",
  // withCredentials: true,
  headers: {
    // "Access-Control-Allow-Credentials": true, //쿠키 access
  },
});

export default instance;
