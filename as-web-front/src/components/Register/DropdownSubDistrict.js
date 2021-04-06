import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
import { useTranslation } from "react-i18next";
export default function DropDown({
  data,
  handleEvent,
  DataFromRegister,
  setDataFromRegister,
  Confirm,
}) {
  const [t, i18n] = useTranslation("common");
  const [title, setTitleState] = useState(t("register.selectSubDistrict"));
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
    if (DataFromRegister.FK_Sub_District_ID) {
      console.log("sd change");
      const findData = data.find(
        (a) => a.id === parseInt(DataFromRegister.FK_Sub_District_ID)
      );
      if (findData !== undefined) {
        setTitleState(findData.value);
      } else {
        setTitleState(t("register.selectSubDistrict"));
      }
    } else {
      setTitleState(t("register.selectSubDistrict"));
    }
  }, [DataFromRegister.FK_Sub_District_ID]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Customer_Province"
        onChange={handleSelect}
        required
        disabled={!Confirm}
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
