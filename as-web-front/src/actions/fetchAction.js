import store from "../store";
import axios from "axios";
export const fetch_province = () => {
  return {
    type: "FETCH_PROVINCE",
  };
};
export const receive_province = (post) => {
  return {
    type: "FETCHED_PROVINCE",
    data: post,
  };
};
export const fetch_district = () => {
  return {
    type: "FETCH_district",
  };
};
export const receive_district = (post) => {
  return {
    type: "FETCHED_district",
    data: post,
  };
};
export const receive_subDistrict = (post) => {
  return {
    type: "FETCHED_subDistrict",
    data: post,
  };
};
export const receive_error = () => {
  return {
    type: "FETCHED_ERROR",
  };
};

export const setTempInput = (post) => {
  return {
    type: "SETTEMP_DATA_INPUT",
    data: post,
  };
};
export const getProvince = () => {
  // store.dispatch(fetch_province());
  return function (dispatch, getState) {
    return axios
      .post(`http://119.59.117.57/API/api/Master/GetProvince`)
      .then((res) => {
        dispatch(receive_province(res.data.data));
      })
      .catch((err) => dispatch(receive_error()));
  };
};
export const getDistrict = () => {
  // store.dispatch(fetch_district());
  return function (dispatch, getState) {
    return axios
      .post(`http://119.59.117.57/API/api/Master/GetDistrict`)
      .then((res) => {
        dispatch(receive_district(res.data.data));
      })
      .catch((err) => dispatch(receive_error()));
  };
};
export const getSubDistrict = () => {
  // store.dispatch(fetch_district());
  return function (dispatch, getState) {
    return axios
      .post(`http://119.59.117.57/API/api/Master/GetSubDistrict`)
      .then((res) => {
        dispatch(receive_subDistrict(res.data.data));
      })
      .catch((err) => dispatch(receive_error()));
  };
};
