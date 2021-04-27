import React from "react";
import { useTranslation } from "react-i18next";
import ButtonMain from "../button/ButtonMain";
import GoogleMapDisabled from "../../components/map/googleMapDisabled";
export default function RegisterConfirm({ data, setCheckData, Lastsubmit }) {
  const [t, i18n] = useTranslation("common");
  return (
    <div className="container ">
      <h1>{t("register.title")}</h1>
      <div className="container register-check p-4">
        <div className="">
          {t("registerConfirm.type")}:{" "}
          <span className="font-weight-normal">
            {data.Customer_Type || ""}{" "}
            {data.Customer_Contractor_Type && (
              <>{`(${data.Customer_Contractor_Type})`}</>
            )}
          </span>
        </div>
        <div className="">
          {t("registerConfirm.name")}:{" "}
          <span className="font-weight-normal">{data.FirstName || ""}</span>
        </div>
        <div className="">
          {t("registerConfirm.surname")}:{" "}
          <span className="font-weight-normal">{data.LastName || ""}</span>
        </div>
        <div className="">
          {t("registerConfirm.company")}:{" "}
          <span className="font-weight-normal">
            {data.Customer_Company || ""}
          </span>
        </div>
        <div className="">
          {t("registerConfirm.tel")}:
          <span className="font-weight-normal"> {data.Tel || ""}</span>
        </div>
        <div className="">
          {t("registerConfirm.mobile")}:
          <span className="font-weight-normal">{data.Phone || ""}</span>
        </div>
        <div className="">
          {t("registerConfirm.email")}:
          <span className="font-weight-normal"> {data.Email || ""}</span>
        </div>
        <div className="">
          {t("registerConfirm.serviceCenter")}:{" "}
          <span className="font-weight-normal">
            {data.Service_Center_Name || ""}
          </span>
        </div>
        <div className="">
          {t("registerConfirm.address")}:{" "}
          <span className="font-weight-normal">
            {" "}
            {data.Address || ""} <br />
            {` ${data.FK_District_ID || ""} ${data.FK_Sub_District_ID || ""} ${
              data.FK_Province_ID || ""
            } ${data.ZIP_Code || ""}`}
          </span>
        </div>
        <div>
          <label className=" mt-3">{t("register.map")}</label>
          <GoogleMapDisabled lat={data.Latitude} lng={data.Longitude} />
        </div>
      </div>

      <div className="row mt-3 d-flex justify-content-center mb-3">
        <ButtonMain
          title={t("register.Submit")}
          color="#636363"
          BgColor="#58a7af"
          handleClick={() => {
            Lastsubmit();
          }}
        />
        <div className="ml-3">
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
    </div>
  );
}
