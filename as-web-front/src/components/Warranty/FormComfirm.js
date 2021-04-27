import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BannerCover from "../../components/Banner/BannerCover";
import GoogleMapDisabled from "../map/googleMapDisabled";
import ButtonMain from "../button/ButtonMain";
import "../../assets/scss/form-comfirm.scss";
import http from "../../axios";
import { useTranslation } from "react-i18next";
function FormComfirm(props) {
  const dataSet = props.DataComfirm;
  console.log("dataSet", dataSet);
  const [t, i18n] = useTranslation("common");

  const imgPreviewShow = (file) => {
    // URL.createObjectURL(file);
    return URL.createObjectURL(file);
  };
  return (
    <div className="form-comfirm">
      {/* {props.ProvinceC} */}
      <div className="container">
        <h1 className="mt-3">{t("warrantyConfirm.title")}</h1>
        <div className="mb-4">
          <h2>{t("warrantyConfirm.titleCustomerData")}</h2>
          <div className="customer-section p-4">
            {t("warrantyConfirm.MemberID")} :{" "}
            {dataSet.datas[0].Customer_Code || ""}
            <br />
            {t("warrantyConfirm.Name")}:
            {`${dataSet.datas[0].Customer_Firstname || ""} ${
              dataSet.datas[0].Customer_Lastname || ""
            }`}
            <br />
            {t("warrantyConfirm.TelephoneNumber")}:{" "}
            {dataSet.datas[0].Customer_Tel}
            <br />
            {t("warrantyConfirm.MobileNumber")}:{" "}
            {dataSet.datas[0].Customer_Mobile}
            <br />
            {t("warrantyConfirm.Email")}: {dataSet.datas[0].Customer_Email}
            <br />
          </div>
        </div>
        <div className="mb-4">
          <h2>{t("warrantyConfirm.titleAddress")}</h2>
          <div className="address-section p-4">
            <div className="mb-3">
              {t("warrantyConfirm.address")} :{" "}
              {dataSet.datas[0].Customer_Address}{" "}
              {dataSet.datas[0].Customer_District}{" "}
              {dataSet.datas[0].Customer_SubDistrict}{" "}
              {dataSet.datas[0].Customer_Province}{" "}
              {dataSet.datas[0].Customer_ZipCode}
            </div>
            <GoogleMapDisabled
              lat={dataSet.datas[0].Customer_Latitude}
              lng={dataSet.datas[0].Customer_Longtitude}
            />
          </div>
        </div>
        {dataSet.datas.map((item, index) => (
          <div>
            <h2>{`${t("warrantyConfirm.titleProduct")} ${index + 1}`}</h2>
            <div className="product-section p-4 mb-4">
              <div>
                {t("warrantyConfirm.ProvinceOfPurchase")} :{" "}
                {item.Purchase_Province || ""}
                <br />
                {t("warrantyConfirm.date")} : {item.Purchase_Date || ""}
                <br />
                {t("warrantyConfirm.StoreName")}: {item.Store_ID || ""}
                <br />
                {t("warrantyConfirm.OtherStoreName")}:{" "}
                {item.Store_Name_Other || ""}
                <br />
                {t("warrantyConfirm.serviceCenter")}:{" "}
                {item.Service_Center_Name || ""}
                <br />
                {t("warrantyConfirm.ReceiptNumber")}:{" "}
                {item.Receipt_Number || ""}
                <br />
                {t("warrantyConfirm.WarrantyNumber")}:{" "}
                {item.Warranty_Number || ""}
                <br />
                {t("warrantyConfirm.ProductType")}: {item.Type_ID || ""}
                <br />
                {t("warrantyConfirm.ProductCode")}: {item.Product_code || ""}
                <br />
                {t("warrantyConfirm.ProductName")}: {item.product_Name || ""}
                <br />
                {t("warrantyConfirm.OtherProductCode")}:{" "}
                {item.Product_Code_Other || ""}
                <br />
                {t("warrantyConfirm.Qty")}: {item.QTY || ""}
                <br />
                {t("warrantyConfirm.Barcode")} : {item.Barcode_Number || ""}
              </div>
              <div className="img-preview row">
                <div className="col-md-4 mx-auto">
                  {dataSet.files[index].map((item, i) => (
                    <img
                      className="mb-3"
                      src={imgPreviewShow(item)}
                      alt={"preview"}
                      style={{ "max-width": "100%", "max-height": "100%" }}
                    />
                  ))}
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-4 mt-4">
                  {t("warrantyConfirm.remark")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(FormComfirm);
