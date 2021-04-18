import axios from "axios";
const api = axios.create({
  //baseURL: `https://lixilapps.com/CCC/API`,
  baseURL: `${process.env.REACT_APP_API_ENVPOINT}`,
  // headers: {
  //   "Content-type": "multipart/form-data",
  // },
});

export default api;
