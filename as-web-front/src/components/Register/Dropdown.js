import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDown({ data, handleEvent }) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    if (e.target.value) {
      setTitleState(data.find((a) => a.id === parseInt(e.target.value)).value);
      handleEvent(e);
    } else {
      setTitleState(data[0].value);
      handleEvent(e);
    }
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
        {data.map((item, index) => (
          <option key={index} value={item.id} titleSet={item.value}>
            {item.value}
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
