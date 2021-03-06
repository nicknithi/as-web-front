import React, { useState, useEffect } from "react";
import dataMock from "../../dataMock";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownStore_ID({ data, handleEvent, index }) {
  data = dataMock.Purchase_Province;
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    setTitleState(data.find((a) => a.id === parseInt(e.target.value)).value);
    handleEvent(e);
  };
  useEffect(() => {
    setTitleState(data[0].value);
  }, [data]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Store_ID"
        index={index}
        onChange={handleSelect}
      >
        <option selected>Open this select menu</option>
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
