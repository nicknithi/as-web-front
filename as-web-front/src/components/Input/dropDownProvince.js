import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDown({
  data,
  handleEvent,
  FormDataWarranty,
  setFormDataWarranty,
}) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    if (e.target.value) {
      setTitleState(
        data.find((a) => a.id === parseInt(e.target.value)).province_Name
      );
      handleEvent(e);
    } else {
      setTitleState(data[0].province_Name);
      handleEvent(e);
    }
  };
  useEffect(() => {
    if (FormDataWarranty.Customer_Province) {
      const findData = data.find(
        (a) => a.id === parseInt(FormDataWarranty.Customer_Province)
      );
      if (findData !== undefined) {
        setTitleState(findData.province_Name);
      } else {
        setTitleState("กรุณาเลือก");
      }
    } else {
      setTitleState("กรุณาเลือก");
    }
  }, [FormDataWarranty.Customer_Province]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Customer_Province"
        value={FormDataWarranty.Customer_Province}
        onChange={handleSelect}
        required
      >
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
