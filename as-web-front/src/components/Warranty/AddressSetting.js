import React, { useState } from "react";
import GoogleMap from "../map/googleMap";
import DropDown from "../Input/dropDown";
export default function AddressSetting() {
  const [currentLocation, setcurrentLocation] = useState({ lat: 0, lng: 0 });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setcurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  } else {
    alert(
      "It seems like Geolocation, which is required for this page, is not enabled in your browser."
    );
  }
  return (
    <div className="mt-3">
      <h3 className="font-weight-bold mb-3">ที่อยู่การติดตั้ง</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">
              ที่อยู่ที่ติดตั้งสินค้า* (ไม่สามารถเปลี่ยนแปลงได้)
            </label>
            <input type="text" className="as-input" required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">จังหวัด*</label>
            <DropDown />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">อำเภอ/เขต*</label>
            <input type="textarea" className="as-input" required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">รหัสไปรษณีย์*</label>
            <input type="textarea" className="as-input" required />
          </div>
        </div>
        <div>
          <label className="font-weight-bold">แผนที่ (โปรดระบุ)</label>
          <GoogleMap currLocation={currentLocation} />
        </div>
      </div>
    </div>
  );
}
