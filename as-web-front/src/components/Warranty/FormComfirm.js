import React from "react";
import { connect } from "react-redux";
import BannerCover from "../../components/Banner/BannerCover";
import GoogleMapDisabled from "../map/googleMapDisabled";
import ButtonMain from "../button/ButtonMain";
import "../../assets/scss/form-comfirm.scss";
import axios from "axios";

function FormComfirm(props) {
  console.log(props.data.DataDropdownReducer.temp_data_input_warranty);
  let dataSet = props.data.DataDropdownReducer.temp_data_input_warranty;
  let dataMock = {
    Customer_Code: "ทดสอบรับประกัน",
    Customer_Firstname: "ทดสอบรับประกัน1",
    Customer_Lastname: "ทดสอบรับประกัน2",
    Customer_Tel: "0123456789",
    Customer_Mobile: "0123456789",
    Customer_Email: "ทดสอบรับประกัน@email.com",
    Customer_Address: "ทดสอบรับประกัน address",
    Customer_Province: 1,
    Customer_District: 1,
    Customer_SubDistrict: 1,
    Customer_ZipCode: "12345",
    Customer_Latitude: "123.456",
    Customer_Longtitude: "456.123",
    Purchase_Province: 1,
    Purchase_Date: "2021-02-28T16:49:06.885Z",
    Store_ID: 1,
    Store_Name_Other: "ทดสอบรับประกัน",
    Receipt_Number: "123456789",
    Barcode_Number: "123456789",
    Warranty_Number: "123456789",
    Type_ID: 1,
    Product_ID: 1,
    Model_ID: 1,
    Product_Code_Other: "ทดสอบรับประกัน",
    QTY: 23,
    Score: 4,
    Description: "ทดสอบรับประกัน description",
  };
  const handleClickSubmit = () => {
    if (dataSet) {
      dataSet.datas.forEach((items, index) => {
        console.log(items);
        let FormLastData = new FormData();
        FormLastData.append("files", dataSet.files[index]);
        FormLastData.append("datas", JSON.stringify(items));
        axios
          .post(
            "http://www.mostactive.info/API/api/Warranty/AddDataWarranty",
            FormLastData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log(res);
          });
      });
    }
  };

  return (
    <div className="form-comfirm">
      <BannerCover />
      {/* <div className="container">
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
              ที่อยู่การติดตั้งสินค้า :{" "}
              {dataSet.datas[0].Customer_Address || ""}
            </div>
            <GoogleMapDisabled
              lat={dataSet.datas[0].Customer_Latitude}
              lng={dataSet.datas[0].Customer_Longtitude}
            />
          </div>
        </div>
        <div>
          <h2>ข้อมูลสินค้า</h2>
          <div className="product-section p-4 mb-4">
            <div>
              จังหวัดที่ซื้อ : {dataSet.datas[0].Purchase_Province || ""}
              <br />
              วันที่ซื้อ: {dataSet.datas[0].Purchase_Date || ""}
              <br />
              ชื่อร้านค้า: {dataSet.datas[0].Store_ID || ""}
              <br />
              หมายเลขใบเสร็จ: {dataSet.datas[0].Receipt_Number || ""}
              <br />
              หมายเลขรับประกัน: {dataSet.datas[0].Warranty_Number || ""}
              <br />
              ประเภทสินค้า: {dataSet.datas[0].Type_ID || ""}
              <br />
              รหัสสินค้า: {dataSet.datas[0].Product_Code_Other || ""}
              <br />
              รหัสสินค้า (อื่น ๆ): ชื่อรุ่น:{" "}
              {dataSet.datas[0].Product_Code_Other || ""}
              <br />
              จำนวนชิ้นที่ซื้อ: {dataSet.datas[0].QTY || ""}
              <br />
              รหัสบาร์โค๊ด : {dataSet.datas[0].Barcode_Number || ""}
            </div>
          </div>
        </div>
      </div> */}
      <div className="d-flex justify-content-center mt-3 mb-4">
        <div className="mr-4">
          <ButtonMain
            title="ยืนยัน"
            color="#636363"
            BgColor="#ffaa29"
            handleClick={handleClickSubmit}
          />
        </div>
        <div>
          <ButtonMain title="แก้ไขข้อมูล" color="#636363" BgColor="#4ea4cd" />
        </div>
      </div>
      <div className="text-center mt-3 mb-4">
        <ButtonMain title="กลับ" color="#636363" BgColor="#ffaa29" />
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
