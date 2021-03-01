import React from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function dropDown({ data, handleEvent }) {
  const handleSelect = (e) => {
    handleEvent(e);
  };
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Customer_Province"
        onChange={handleSelect}
      >
        <option selected>Open this select menu</option>
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.province_Name}
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
