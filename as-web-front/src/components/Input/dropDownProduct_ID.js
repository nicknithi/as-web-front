import React, { useState, useEffect } from "react";
import dataMock from "../../dataMock";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownProduct_ID({ data, handleEvent, index }) {
  // data = dataMock.Purchase_Province;
  const [title, setTitleState] = useState("กรุณาเลือก");
  // setTitleState(data[0].value);
  const handleSelect = (e) => {
    setTitleState(data.find((a) => a.id === parseInt(e.target.value)).value);
    handleEvent(e);
  };
  useEffect(() => {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("name", "Product_ID");
    x.setAttribute("index", index);
    x.setAttribute("value", data[0].id);
    handleEvent(x);
    setTitleState(data[0].value);
  }, [data]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Product_ID"
        index={index}
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
