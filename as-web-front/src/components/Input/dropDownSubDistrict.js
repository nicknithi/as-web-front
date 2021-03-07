import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownSubDistrict({
  data,
  handleEvent,
  FormDataWarranty,
  setFormDataWarranty,
}) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    if (e.target.value) {
      setTitleState(
        data.find((a) => a.id === parseInt(e.target.value)).sub_District_Name
      );
      handleEvent(e);
    } else {
      setTitleState(data[0].sub_District_Name);
      handleEvent(e);
    }
  };
  useEffect(() => {
    if (data[0]) {
      console.log("data", data[0].id);
      let x = document.createElement("INPUT");
      x.setAttribute("type", "text");
      x.setAttribute("name", "Customer_SubDistrict");
      x.setAttribute("value", data[0].id);
      handleEvent(x);
      setTitleState(data[0].sub_District_Name);
    }
  }, [data]);
  useEffect(async () => {
    const dataTest = await data;
    if (dataTest[0]) {
      if (FormDataWarranty.Customer_SubDistrict) {
        const findData = dataTest.find(
          (a) => a.id === parseInt(FormDataWarranty.Customer_SubDistrict)
        );
        if (findData !== undefined) {
          setTitleState(findData.sub_District_Name);
        } else {
          setTitleState("กรุณาเลือก");
        }
      } else {
        setTitleState("กรุณาเลือก");
      }
    }
  }, [FormDataWarranty.Customer_SubDistrict]);
  return (
    <div className="position-relative as-dropdown">
      <input type="hidden" id="district" value="" />
      <select
        className="form-select position-absolute w-100"
        name="Customer_SubDistrict"
        aria-label="Default select example"
        value={FormDataWarranty.Customer_SubDistrict}
        onChange={handleSelect}
        required
      >
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.sub_District_Name}
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
