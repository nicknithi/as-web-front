import axios from "axios";
const api = axios.create({
  baseURL: `http://www.mostactive.info/API`,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

export default api;
