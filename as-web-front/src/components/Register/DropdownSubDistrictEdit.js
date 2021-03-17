import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDown({
  data,
  handleEvent,
  DataFromRegister,
  setDataFromRegister,
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
    if (DataFromRegister.fK_Sub_District_ID) {
      const findData = data.find(
        (a) => a.id === parseInt(DataFromRegister.fK_Sub_District_ID)
      );
      if (findData !== undefined) {
        setTitleState(findData.value);
      } else {
        setTitleState("กรุณาเลือก");
      }
    } else {
      setTitleState("กรุณาเลือก");
    }
  }, [DataFromRegister.fK_Sub_District_ID]);
  useEffect(() => {
    if (DataFromRegister.fK_Sub_District_ID) {
      const findData = data.find(
        (a) => a.id === parseInt(DataFromRegister.fK_Sub_District_ID)
      );
      if (findData !== undefined) {
        setTitleState(findData.value);
      } else {
        setTitleState("กรุณาเลือก");
      }
    } else {
      setTitleState("กรุณาเลือก");
    }
  }, [data]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Customer_Province"
        value={DataFromRegister.fK_Sub_District_ID}
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
