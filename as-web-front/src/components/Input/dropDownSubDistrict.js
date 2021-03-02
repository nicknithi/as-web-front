import React from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function dropDownSubDistrict({ data, handleEvent }) {
  const handleSelect = (e) => {
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
        <option selected>Open this select menu</option>
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.sub_District_Name}
          </option>
        ))}
      </select>
      <div className="custom-dropdown">
        {"test"}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
