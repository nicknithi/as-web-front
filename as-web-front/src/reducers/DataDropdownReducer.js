const initialState = {
  province: [],
  district: [],
  subdistrict: [],
  isError: false,
  temp_data_input_warranty: [],
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROVINCE":
      return Object.assign({}, state, {
        province: [],
      });
    case "FETCHED_PROVINCE":
      return Object.assign({}, state, {
        province: action.data,
      });
    case "FETCH_district":
      return Object.assign({}, state, {
        district: [],
      });
    case "FETCHED_district":
      return Object.assign({}, state, {
        district: action.data,
      });
    case "FETCHED_ERROR":
      return Object.assign({}, state, {
        isError: true,
      });
    case "FETCHED_subDistrict":
      return Object.assign({}, state, {
        subdistrict: action.data,
      });
    case "SETTEMP_DATA_INPUT":
      return Object.assign({}, state, {
        temp_data_input_warranty: {
          ...state.temp_data_input_warranty,
          ...action.data,
        },
      });
    default:
      break;
  }
  return state;
};
export default asyncReducer;
