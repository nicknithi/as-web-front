import axios from "axios";
const api = axios.create({
  baseURL: `http://119.59.117.57/API`,
  headers: {
    "Content-type": "multipart/form-data",
  },
});
