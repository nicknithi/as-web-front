import axios from "axios";
const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return state.concat([action.data]);
    // case "GetProvince"
    // axios.post(`http://119.59.117.57/API/api/Master/GetProvince`)
    // .then((res) => {
    //   const persons = res.data;
    // });
    default:
      return state;
  }
};

export default postReducer;
