import React, { useState } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownDistrict({ data, handleEvent, titleDistrict }) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    setTitleState(
      data.find((a) => a.id === parseInt(e.target.value)).district_Name
    );
    handleEvent(e);
  };
  return (
    <div className="position-relative as-dropdown">
      <input type="hidden" id="district" value="" />
      <select
        className="form-select position-absolute w-100"
        name="Customer_District"
        aria-label="Default select example"
        onChange={handleSelect}
      >
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.district_Name}
          </option>
        ))}
      </select>
      <div className="custom-dropdown">
        {titleDistrict ? "กรุณาเลือก" : title}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
