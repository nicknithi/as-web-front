import React, { useState, useEffect } from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function DropDownDistrict({
  data,
  handleEvent,
  titleDistrict,
  FormDataWarranty,
  setFormDataWarranty,
}) {
  const [title, setTitleState] = useState("กรุณาเลือก");
  const handleSelect = (e) => {
    if (e.target.value) {
      setTitleState(
        data.find((a) => a.id === parseInt(e.target.value)).district_Name
      );
      handleEvent(e);
    } else {
      setTitleState(data[0].district_Name);
      handleEvent(e);
    }
  };
  useEffect(() => {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("name", "Customer_District");
    x.setAttribute("value", data[0].id);
    handleEvent(x);
    setTitleState(data[0].district_Name);
  }, [data]);
  useEffect(async () => {
    const dataTest = await data;
    if (dataTest[0]) {
      if (FormDataWarranty.Customer_District) {
        const findData = dataTest.find(
          (a) => a.id === parseInt(FormDataWarranty.Customer_District)
        );
        if (findData !== undefined) {
          setTitleState(findData.district_Name);
        } else {
          setTitleState("กรุณาเลือก");
        }
      } else {
        setTitleState("กรุณาเลือก");
      }
    }
  }, [FormDataWarranty.Customer_District]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        name="Customer_District"
        aria-label="Default select example"
        value={FormDataWarranty.Customer_District}
        onChange={handleSelect}
        required
      >
        {data.map((item, index) => (
          <option key={index} value={item.id}>
            {item.district_Name}
          </option>
        ))}
      </select>
      <div className="custom-dropdown">
        {titleDistrict ? "กรุณาเลือก" : title}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
