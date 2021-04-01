import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDown({
  data,
  handleEvent,
  DataFromRegister,
  setDataFromRegister,
}) {
  const [t, i18n] = useTranslation("common");
  const [title, setTitleState] = useState(t("register.selectProvince"));
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
