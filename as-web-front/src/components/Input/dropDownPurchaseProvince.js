import React, { useState, useEffect } from "react";
import dataMock from "../../dataMock";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownPurchaseProvince({
  data,
  handleEvent,
  index,
  FormDataProduct,
  setFormDataProduct,
}) {
  // data = dataMock.Purchase_Province;
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    if (e.target) {
      const dataSet = [...FormDataProduct];
      dataSet[index].Purchase_Province = e.target.value;
      setFormDataProduct(dataSet);
      const title = data.find((a) => a.id === parseInt(e.target.value))
        .province_Name;
      console.log("set titel province ", title);
      setTitleState(title);
      handleEvent(e.target.value);
    }
  };
  useEffect(() => {
    const dataTest = data;
    if (dataTest[0]) {
      if (FormDataProduct[index].Purchase_Province) {
        const findData = dataTest.find(
          (a) => a.id === parseInt(FormDataProduct[index].Purchase_Province)
        );
        if (findData !== undefined) {
          setTitleState(findData.province_Name);
        } else {
          setTitleState("กรุณาเลือก");
        }
      } else {
        setTitleState("กรุณาเลือก");
      }
    }
  }, [FormDataProduct[index].Purchase_Province]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Purchase_Province"
        value={FormDataProduct[index].Purchase_Province}
        index={index}
        onChange={handleSelect}
        required
      >
        <option selected>Open this select menu</option>
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
