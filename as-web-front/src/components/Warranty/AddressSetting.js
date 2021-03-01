import React, { useState } from "react";
import { connect } from "react-redux";
import GoogleMap from "../map/googleMap";
import DropDownProvince from "../Input/dropDownProvince";
import DropDownDistrict from "../Input/dropDownDistrict";
import { getDistrict, setTempInput } from "../../actions/fetchAction";
function AddressSetting({ dataObject, handleChangInput, dispatch }) {
  console.log(dataObject);
  const handleFetchGetDistrict = (e) => {
    handleChangInput(e);
  };
  const handleFetchGetSubDistrict = (district_id) => {
    dispatch(setTempInput({ district: district_id }));
  };
  const handleMap = (e) => {
    handleChangInput(e);
  };
  return (
    <div className="mt-3">
      <h3 className="font-weight-bold mb-3">ที่อยู่การติดตั้ง</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-12">
            <label className="font-weight-bold">
              ที่อยู่ที่ติดตั้งสินค้า* (ไม่สามารถเปลี่ยนแปลงได้)
            </label>
            <input
              type="text"
              id="addressProduct"
              className="as-input"
              name="Customer_Address"
              onChange={handleChangInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">จังหวัด*</label>
            <DropDownProvince
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
            <input
              type="text"
              id="postCode"
              name="Customer_ZipCode"
              onChange={handleChangInput}
              className="as-input"
            />
          </div>
        </div>
        <div>
          <label className="font-weight-bold">แผนที่ (โปรดระบุ)</label>
          <GoogleMap handleMap={handleMap} />
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
