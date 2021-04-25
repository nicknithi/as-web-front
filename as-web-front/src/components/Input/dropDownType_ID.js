import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
import { useTranslation } from "react-i18next";
export default function DropDownType_ID({
  data,
  handleEvent,
  index,
  Confirm,
  FormDataProduct,
  setFormDataProduct,
}) {
  const [t, i18n] = useTranslation("common");
  const [title, setTitleState] = useState(t("warranthForm.selectType"));
  const handleSelect = (e) => {
    setTitleState(data.find((a) => a.id === parseInt(e.target.value)).value);
    // handleEvent(e);
    const dataSet = [...FormDataProduct];
    dataSet[index].Type_ID = e.target.value;
    setFormDataProduct(dataSet);
  };

  useEffect(() => {
    // let x = document.createElement("INPUT");
    // x.setAttribute("type", "text");
    // x.setAttribute("name", "Type_ID");
    // x.setAttribute("index", index);
    // x.setAttribute("value", data[0].id);
    // handleEvent(x);
    console.log("jjjj", data);
    setTitleState(data[0].value);
  }, [data]);
  useEffect(() => {
    setTitleState(t("warranthForm.selectType"));
  }, []);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Type_ID"
        index={index}
        disabled={!Confirm}
        onChange={handleSelect}
        required
      >
        {data.map((item, index) => (
          <option key={index} value={item.id} titleSet={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      <div className="custom-dropdown text-truncate">
        {title}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
