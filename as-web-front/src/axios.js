import axios from "axios";
const api = axios.create({
  baseURL: `https://lixilapps.com/CCC/API`,
  // baseURL: `https://www.mostactive.info/API`,
  // headers: {
  //   "Content-type": "multipart/form-data",
  // },
});

export default api;
