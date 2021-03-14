import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
import http from "../../axios";

export default function DropDownStore_ID({
  data,
  handleEvent,
  index,
  FormDataProduct,
  setFormDataProduct,
  Confirm,
}) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    if (e.target) {
      const tempTitle = data.find((a) => a.id === parseInt(e.target.value));
      if (tempTitle !== undefined) {
        setTitleState(tempTitle.value);
        const dataSet = [...FormDataProduct];
        dataSet[index].Store_ID = e.target.value;
        setFormDataProduct(dataSet);
      } else {
        setTitleState("กรุณาเลือก");
        const dataSet = [...FormDataProduct];
        dataSet[index].Store_ID = "";
        setFormDataProduct(dataSet);
      }
    }
    //handleEvent(e);
  };
  useEffect(async () => {
    const dataTest = await data;
    if (dataTest[0]) {
      if (FormDataProduct[index].Store_ID) {
        const findData = dataTest.find(
          (a) => a.id === parseInt(FormDataProduct[index].Store_ID)
        );
        if (findData !== undefined) {
          setTitleState(findData.value);
        } else {
          setTitleState("กรุณาเลือก");
        }
      } else {
        setTitleState("กรุณาเลือก");
      }
    }
  }, [FormDataProduct[index].Store_ID]);
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
        value={FormDataProduct[index].Store_ID}
        disabled={FormDataProduct[index].Store_Name_Other || !Confirm}
        onChange={handleSelect}
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
