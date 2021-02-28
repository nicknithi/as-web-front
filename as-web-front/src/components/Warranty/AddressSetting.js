import React, { useState } from "react";
import { connect } from "react-redux";
import GoogleMap from "../map/googleMap";
import DropDown from "../Input/dropDown";
import DropDownDistrict from "../Input/dropDownDistrict";
import { getDistrict, setTempInput } from "../../actions/fetchAction";
function AddressSetting({ dataObject, dispatch }) {
  // const [currentLocation, setcurrentLocation] = useState({ lat: 0, lng: 0 });
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setcurrentLocation({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //   });
  // } else {
  //   alert(
  //     "It seems like Geolocation, which is required for this page, is not enabled in your browser."
  //   );
  // }

  console.log(dataObject);
  const handleFetchGetDistrict = (province_id) => {
    document.getElementById("province").value = province_id;
    dispatch(setTempInput({ province: province_id }));
    dispatch(getDistrict(province_id));
  };
  const handleFetchGetSubDistrict = (district_id) => {
    dispatch(setTempInput({ district: district_id }));
  };
  return (
    <div className="mt-3">
      <input type="hidden" id="province" value="" />
      <h3 className="font-weight-bold mb-3">ที่อยู่การติดตั้ง</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-12">
            <label className="font-weight-bold">
              ที่อยู่ที่ติดตั้งสินค้า* (ไม่สามารถเปลี่ยนแปลงได้)
            </label>
            <input type="text" id="addressProduct" className="as-input" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">จังหวัด*</label>
            <DropDown
              data={dataObject.province}
              handleEvent={handleFetchGetDistrict}
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">อำเภอ/เขต*</label>
            <DropDownDistrict
              data={dataObject.district}
              handleEvent={handleFetchGetSubDistrict}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">รหัสไปรษณีย์*</label>
            <input type="text" id="postCode" className="as-input" />
          </div>
        </div>
        <div>
          <label className="font-weight-bold">แผนที่ (โปรดระบุ)</label>
          <GoogleMap />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(AddressSetting);
