import React from "react";
import { useTranslation } from "react-i18next";
import ButtonMain from "../button/ButtonMain";
export default function RegisterConfirm({ data, setCheckData, Lastsubmit }) {
  const [t, i18n] = useTranslation("common");
  console.log("test data form register", data);
  return (
    <div className="container">
      <h1>{t("register.title")}</h1>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row">
        {t("register.title")}:{data.FirstName || ""}
      </div>
      <div className="row mt-3 d-flex justify-content-center">
        <ButtonMain
          title={t("register.Submit")}
          color="#636363"
          BgColor="#f1c400"
          handleClick={() => {
            Lastsubmit();
          }}
        />
        <ButtonMain
          title={t("register.btnedit")}
          color="#636363"
          BgColor="#f1c400"
          handleClick={() => {
            setCheckData(false);
          }}
        />
      </div>
    </div>
  );
}
