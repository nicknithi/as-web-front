import React, { useState } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownSubDistrict({ data, handleEvent }) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    setTitleState(
      data.find((a) => a.id === parseInt(e.target.value)).sub_District_Name
    );
    handleEvent(e);
  };
  return (
    <div className="position-relative as-dropdown">
      <input type="hidden" id="district" value="" />
      <select
        className="form-select position-absolute w-100"
        name="Customer_SubDistrict"
        aria-label="Default select example"
        onChange={handleSelect}
      >
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.sub_District_Name}
          </option>
        ))}
      </select>
      <div className="custom-dropdown">
        {title}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
