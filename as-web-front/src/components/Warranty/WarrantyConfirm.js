import React from "react";
import "../../assets/scss/warranty.scss";
import ButtonConfirmWarranty from "../button/WarrantyConfirm";
import InputCheckBox from "../Input/inputCheckBox";
export default function WarrantyConfirm({ title, description }) {
  return (
    <div className="warranty-confirm">
      <h3 className="title">{title}</h3>
      <div className="description">{description}</div>
      <InputCheckBox lable={"ยอมรับนโยบายความเป็นส่วนตัว"} />
      <ButtonConfirmWarranty title={"อ่านรายละเอียด"} />
    </div>
  );
}
