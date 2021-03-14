import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDown({
  data,
  handleEvent,
  FormDataWarranty,
  setFormDataWarranty,
  DisableFromSearch,
  Confirm,
}) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    console.log("eeeee");
    if (e.target.value) {
      let index1 = e.nativeEvent.target.selectedIndex;
      setTitleState(e.nativeEvent.target[index1].text);
      handleEvent(e);
    } else {
      setTitleState(data[0].value);
      handleEvent(e);
    }
  };
  useEffect(() => {
    if (FormDataWarranty.Customer_SubDistrict) {
      const findData = data.find(
        (a) => a.id === parseInt(FormDataWarranty.Customer_SubDistrict)
      );
      if (findData !== undefined) {
        setTitleState(findData.value);
      } else {
        setTitleState("กรุณาเลือก");
      }
    } else {
      setTitleState("กรุณาเลือก");
    }
  }, [FormDataWarranty.Customer_SubDistrict]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Customer_Province"
        disabled={DisableFromSearch || !Confirm}
        onChange={handleSelect}
        value={FormDataWarranty.Customer_SubDistrict}
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
