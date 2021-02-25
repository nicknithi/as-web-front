const postReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      console.log("in reducer", action.data);
      return state.concat([action.data]);
    default:
      return state;
  }
};

export default postReducer;
