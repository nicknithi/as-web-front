import React, { useState } from "react";
import "../../assets/scss/warranty.scss";
import ButtonConfirmWarranty from "../button/WarrantyConfirm";
import InputCheckBox from "../Input/inputCheckBox";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
export default function WarrantyConfirm({ title, description, handleCheck }) {
  const handleClick = () => {};
  return (
    <div className="warranty-confirm px-3">
      <h3 className="title">{title}</h3>
      <div className="description">{description}</div>
      <InputCheckBox
        lable={"ยอมรับนโยบายความเป็นส่วนตัว"}
        handleCheck={handleCheck}
      />
      <ButtonConfirmWarranty
        title={"อ่านรายละเอียด"}
        handleClick={handleClick}
      />
    </div>
  );
}
