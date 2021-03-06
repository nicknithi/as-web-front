import React, { useState } from "react";
import { connect } from "react-redux";
import GoogleMap from "../map/googleMap";
import DropDownProvince from "../Input/dropDownProvince";
import DropDownDistrict from "../Input/dropDownDistrict";
import DropDownSubDistrict from "../Input/dropDownSubDistrict";
import { getDistrict, setTempInput } from "../../actions/fetchAction";
function AddressSetting({
  handleChangInput,
  dispatch,
  Province,
  District,
  SubDistrict,
}) {
  const [ZipCode, setZipCode] = useState(null);
  const [tempProvince, setTempProvince] = useState(0);
  const [tempDistrict, setTempDistrict] = useState(0);
  const [titleDistric, setTitleDistric] = useState(false);
  const [DistrictDP, setDistrictDP] = useState([
    {
      id: 0,
      district_Name: "กรุณาเลือก",
    },
  ]);
  const [subDistrictDP, setSubDistrictDP] = useState([
    {
      id: 0,
      sub_District_Name: "กรุณาเลือก",
    },
  ]);

  const handleProvince = (e) => {
    handleChangInput(e);
    setTempProvince(e.target.value);
    setDistrictDP([
      {
        id: 0,
        district_Name: "กรุณาเลือก",
      },
    ]);
    setSubDistrictDP([
      {
        id: 0,
        sub_District_Name: "กรุณาเลือก",
      },
    ]);
    let data = District.find(
      (p) => p.fK_Province_ID === parseInt(e.target.value)
    );
    if (data !== undefined) {
      setDistrictDP([
        {
          id: 0,
          district_Name: "กรุณาเลือก",
        },
        data,
      ]);
      console.log(data);
    }
  };
  const handleDistrict = (e) => {
    handleChangInput(e);
    setTempDistrict(e.target.value);
    let data = SubDistrict.find(
      (p) =>
        p.fK_District_ID === parseInt(e.target.value) &&
        p.fK_Province_ID === parseInt(tempProvince)
    );

    if (data !== undefined) {
      console.log("tstest", data);
      setSubDistrictDP([
        {
          id: 0,
          sub_District_Name: "กรุณาเลือก",
        },
        data,
      ]);
    }
  };
  const handleSubDistrict = (e) => {
    handleChangInput(e);
    console.log(e.target.value);
    let data = SubDistrict.find(
      (d) =>
        d.id === parseInt(e.target.value) &&
        d.fK_District_ID === parseInt(tempDistrict) &&
        d.fK_Province_ID === parseInt(tempProvince)
    );
    if (data !== undefined) {
      setZipCode(data.zip_Code);
      let x = document.createElement("INPUT");
      x.setAttribute("type", "text");
      x.setAttribute("name", "Customer_ZipCode");
      x.setAttribute("value", data.zip_Code);
      handleChangInput(x);
    }
  };
  // const handleFetchGetSubDistrict = (district_id) => {
  //   dispatch(setTempInput({ district: district_id }));
  // };
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
            <DropDownProvince data={Province} handleEvent={handleProvince} />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">อำเภอ/เขต*</label>
            <DropDownDistrict
              data={DistrictDP}
              handleEvent={handleDistrict}
              title={titleDistric}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold mt-3">ตำบล*</label>
            <DropDownSubDistrict
              data={subDistrictDP}
              handleEvent={handleSubDistrict}
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold mt-3">รหัสไปรษณีย์*</label>
            <input
              type="text"
              id="postCode"
              defaultValue={ZipCode}
              name="Customer_ZipCode"
              onChange={handleChangInput}
              className="as-input"
              required
            />
          </div>
        </div>
        <div>
          <label className="font-weight-bold mt-3">แผนที่ (โปรดระบุ)</label>
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
