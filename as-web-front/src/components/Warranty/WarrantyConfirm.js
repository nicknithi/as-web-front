import React, { useState } from "react";
import "../../assets/scss/warranty.scss";
import ButtonConfirmWarranty from "../button/WarrantyConfirm";
import InputCheckBox from "../Input/inputCheckBox";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useTranslation } from "react-i18next";
export default function WarrantyConfirm({
  title,
  description,
  handleCheck,
  handleShowModal,
  checked,
}) {
  const [t, i18n] = useTranslation("common");
  return (
    <div className="warranty-confirm px-3">
      <h3 className="title">{title}</h3>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <InputCheckBox
        lable={t("warranthForm.confirmInput")}
        handleCheck={handleCheck}
        checked={checked}
      />
      <ButtonConfirmWarranty
        title={t("warranthForm.readDetail")}
        handleClick={handleShowModal}
      />
    </div>
  );
}
