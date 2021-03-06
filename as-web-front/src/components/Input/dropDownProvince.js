import React, { useState } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDown({ data, handleEvent }) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    setTitleState(
      data.find((a) => a.id === parseInt(e.target.value)).province_Name
    );
    handleEvent(e);
  };

  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Customer_Province"
        onChange={handleSelect}
        required
      >
        <option selected>Open this select menu</option>
        {data.map((item, index) => (
          <option key={index} value={item.id} titleSet={item.province_Name}>
            {item.province_Name}
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
