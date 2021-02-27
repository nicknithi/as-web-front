import axios from "axios";
const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      console.log("in reducer", action.data);
      return state.concat([action.data]);
    // case "GetProvince"
    // axios.post(`http://119.59.117.57/API/api/Master/GetProvince`)
    // .then((res) => {
    //   const persons = res.data;
    //   console.log("nithi", res);
    // });
    default:
      return state;
  }
};

export default postReducer;
