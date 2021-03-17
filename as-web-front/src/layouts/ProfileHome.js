import React, { useState, useEffect } from "react";
import "../assets/scss/profile.scss";
import ButtonMain from "../components/button/ButtonMain";
import "../assets/scss/components/input/radio.scss";
import TableWarranty from "../components/Customer/TableWarranty";
import { getCustomerById } from "../GetDataDropDown";
import { useCookies } from "react-cookie";
export default function ProfileHome() {
  const [cookies, setCookie] = useCookies(["customerID"]);
  if (!cookies.customerID) {
    window.location = "/login";
  }
  const [ProfileData, setProfileData] = useState({
    id: "",
    customer_Type: null,
    username: null,
    password: null,
    customer_Code: "",
    customer_Name: "",
    customer_Surname: "",
    customer_Tel: "",
    customer_Phone: "",
    customer_Email: "",
    customer_Address: "",
    customer_ZIP_Code: "",
    customer_Latitude: "",
    customer_Longitude: null,
    fK_Province_ID: "",
    fK_District_ID: "",
    fK_Sub_District_ID: "",
    service_Center: "",
    quota_Service: "",
    flag_Member: "",
    is_Active: "",
    create_By: "",
    create_Date: "",
    update_By: null,
    update_Date: null,
    customer_Company: null,
  });
  useEffect(async () => {
    const dataProfile = await getCustomerById(cookies.customerID);
    setProfileData(dataProfile);
    console.log(dataProfile);
  }, []);
  return (
    <div className="container profile-container">
      <h1 className="font-weight-bold mt-3">
        ยินดีต้อนรับคุณ
        {` ${ProfileData.customer_Name || ""} ${ProfileData.customer_Surname}`}
      </h1>
      <div className="row detail">
        <div className="col-md-10 font-weight-bold mb-4">
          <span>ข้อมูลส่วนตัว</span>
          <br />
          <span>ที่อยู่การติดตั้งสินค้า</span>
          <br />
          <span>เบอร์ทรศัพท์ {` ${ProfileData.customer_Tel}`}</span>
          <br />
          <span>เบอร์มือถือ {` ${ProfileData.customer_Phone}`}</span>
          <br />
          <span>อีเมล {` ${ProfileData.customer_Email}`}</span>
          <br />
          <span>ข้อมูลส่วนตัว</span>
          <br />
          <br />
          <span>ประเภทสมาชิก</span>
          <br />
          <span>รหัสสมาชิก {` ${ProfileData.customer_Code}`}</span>
          <br />
          <span>ศูนย์บริการที่ดูแล {` ${ProfileData.service_Center}`}</span>
          <br />
          <span>จำนวนสิทธิ์ที่เหลือ</span>
          <br />
        </div>
        <div className="col-md-2">
          <ButtonMain
            title="แก้ไขข้อมูลส่วนตัว"
            color="#636363"
            BgColor="#f1c400"
            handleClick={() => {
              window.location = `/edit-profile`;
            }}
          />
        </div>
      </div>
      <div className="menu font-weight-bold">
        <div className="row mt-3  ml-4">
          <label className="as-container font-weight-bold">
            ประวัติการใช้บริการ
            <input type="radio" name="customer-type" value="1" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="row  ml-4">
          <label className="as-container font-weight-bold">
            ประวัติการซื้ออะไหล่และสินค้า
            <input type="radio" name="customer-type" value="1" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="row ml-4">
          <label className="as-container font-weight-bold">
            ประวัติการต่ออายุสมาชิก
            <input type="radio" name="customer-type" value="1" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="text-center mt-3 mb-4">
        <ButtonMain
          title="กลับ"
          color="white"
          BgColor="#58a7af"
          handleClick={() => {
            window.location = "/";
          }}
        />
      </div>
      <TableWarranty customer_id={cookies.customerID} />
    </div>
  );
}
