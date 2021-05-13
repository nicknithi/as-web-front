import React, { useState, useEffect } from "react";
// import "../assets/scss/profile.scss";
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
  const imgContent = [
    "https://tmladenov.tech/images/img-test.png",
    "https://tmladenov.tech/images/img-test.png",
    "https://tmladenov.tech/images/img-test.png",
  ];
  const imgContent1 = ["https://tmladenov.tech/images/img-test.png"];
  useEffect(async () => {
    const dataProfile = await getCustomerById(cookies.customerID);
    setProfileData(dataProfile);
  }, []);
  return (
    <div className="container profile-container mb-4">
      <h1 className=" mt-3">
        ยินดีต้อนรับคุณ
        {` ${ProfileData.customer_Name || ""} ${ProfileData.customer_Surname}`}
      </h1>
      <div className="row detail">
        <div className="col-md-10 mb-4">
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
      <div className="menu">
        <div className="row mt-3  ml-4">
          <label className="as-container">
            ประวัติการใช้บริการ
            <input type="radio" name="customer-type" value="1" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="row  ml-4">
          <label className="as-container">
            ประวัติการซื้ออะไหล่และสินค้า
            <input type="radio" name="customer-type" value="1" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="row ml-4">
          <label className="as-container">
            ประวัติการต่ออายุสมาชิก
            <input type="radio" name="customer-type" value="1" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <TableWarranty customer_id={cookies.customerID} />
      <div className="content-data p-3">
        <div className="content-text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat
        </div>
      </div>
      <div className="content-img">
        <h3 className="pl-3">รูปภาพประกอบ</h3>
        <div class="d-flex">
          {imgContent.map((item, index) => (
            <div className="">
              <img src={item} alt="" className="img-fluid" />
            </div>
          ))}
        </div>
        <div className="row pl-3 pt-4">
          <div className="col-md-2">ค่าบริการ</div>
          <div className="col-md-5 price">500</div>
        </div>
        <div className="row pt-3 pl-3">
          <div className="col-md-2">ค่าอะไหล่</div>
          <div className="col-md-5 price">500</div>
        </div>
      </div>
      <div className="content-img pt-4">
        <h3 className="pl-3">ไฟล์ภาพใบเสร็จ</h3>
        <div class="d-flex">
          {imgContent1.map((item, index) => (
            <div className="">
              <img src={item} alt="" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="row p-4 content-img justify-content-center">
          <div className="col-md-4 text-center">
            <h4>ลายเซ็นต์ สมาชิก/ผู้แทน</h4>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%A0%E0%B8%9E_%E0%B9%82%E0%B8%AB%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <h4>สุขใจ ใจดี</h4>
          </div>
          <div className="col-md-4 text-center">
            <h4>ลายเซ็นต์ เจ้าหน้าที่บริการ</h4>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%A0%E0%B8%9E_%E0%B9%82%E0%B8%AB%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <h4>สุขใจ ใจดี</h4>
          </div>
        </div>
      </div>
      <div className="content-img pt-4">
        <h4 className="pl-3 text-center">ประเมินความพึงพอใจ</h4>
        <div className="row justify-content-center mt-3">
          <div className="col-md-5 d-flex justify-content-center">
            <div className="ml-4">
              <label className="as-container">
                ดีมาก
                <input type="radio" name="customer-type" value="1" />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="ml-4">
              <label className="as-container">
                พอใช้
                <input type="radio" name="customer-type" value="1" />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="ml-4">
              <label className="as-container">
                ควรปรับปรุง
                <input type="radio" name="customer-type" value="1" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
