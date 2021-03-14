import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BannerCover from "../../components/Banner/BannerCover";
import GoogleMapDisabled from "../map/googleMapDisabled";
import ButtonMain from "../button/ButtonMain";
import "../../assets/scss/form-comfirm.scss";
import http from "../../axios";

function FormComfirm(props) {
  const dataSet = props.DataComfirm;
  console.log("dataSet", dataSet);

  return (
    <div className="form-comfirm">
      {props.ProvinceC}
      <div className="container">
        <h1 className="mt-3">การลงทะเบียนสินค้า</h1>
        <div className="mb-4">
          <h2>ข้อมูลลูกค้า</h2>
          <div className="customer-section p-4">
            สมาชิกบริการ (ถ้ามี) : {dataSet.datas[0].Customer_Code || ""}
            <br />
            ชื่อ:
            {`${dataSet.datas[0].Customer_Firstname || ""} ${
              dataSet.datas[0].Customer_Lastname || ""
            }`}
            <br />
            เบอร์โทรศัพท์: {dataSet.datas[0].Customer_Tel}
            <br />
            มือถือ: {dataSet.datas[0].Customer_Mobile}
            <br />
            อีเมล: {dataSet.datas[0].Customer_Email}
            <br />
          </div>
        </div>
        <div className="mb-4">
          <h2>ที่อยู่การติดตั้ง</h2>
          <div className="address-section p-4">
            <div className="mb-3">
              ที่อยู่การติดตั้งสินค้า : {dataSet.datas[0].Customer_Address}{" "}
              {dataSet.datas[0].Customer_Province}{" "}
              {dataSet.datas[0].Customer_District}{" "}
              {dataSet.datas[0].Customer_SubDistrict}{" "}
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
            <h2>ข้อมูลสินค้า</h2>
            <div className="product-section p-4 mb-4">
              <div>
                จังหวัดที่ซื้อ : {item.Purchase_Province || ""}
                <br />
                วันที่ซื้อ: {item.Purchase_Date || ""}
                <br />
                ชื่อร้านค้า: {item.Store_ID || ""}
                <br />
                หมายเลขใบเสร็จ: {item.Receipt_Number || ""}
                <br />
                หมายเลขรับประกัน: {item.Warranty_Number || ""}
                <br />
                ประเภทสินค้า: {item.Type_ID || ""}
                <br />
                รหัสสินค้า: {item.Product_code || ""}
                <br />
                รหัสสินค้า (อื่น ๆ): {item.Product_Code_Other || ""}
                <br />
                จำนวนชิ้นที่ซื้อ: {item.QTY || ""}
                <br />
                รหัสบาร์โค๊ด : {item.Barcode_Number || ""}
              </div>
              <div className="img-preview row">
                <div className="col-md-4 mx-auto">
                  <img
                    src={URL.createObjectURL(dataSet.files[index])}
                    alt={"preview"}
                    style={{ "max-width": "100%", "max-height": "100%" }}
                  />
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
