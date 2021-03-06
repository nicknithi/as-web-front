import React, { useState } from "react";
import http from "../../axios";
export default function MemberData({ handleChangInput, handleGetMemberData }) {
  const [defultData, setDefultData] = useState({
    Customer_Firstname: "",
    Customer_Lastname: "",
    Customer_Tel: "",
    Customer_Mobile: "",
    Customer_Email: "",
  });
  const [firstname, setFirstname] = useState("");
  const getDataMember = (e) => {
    handleChangInput(e);
    handleGetMemberData(e.target.value);
    http
      .post(
        `/api/Customer/GetDataCustomerByCode?Customer_Code=${e.target.value}`
      )
      .then((res) => {
        if (res.data.message == "Success!") {
          console.log("res1", res);
          const data = res.data.data;
          defultData.Customer_Firstname = data.customer_Name;
          defultData.Customer_Lastname = data.customer_Surname;
          defultData.Customer_Tel = data.customer_Tel;
          defultData.Customer_Mobile = data.customer_Phone;
          defultData.Customer_Email = data.customer_Email;
          setDefultData(defultData);
          setFirstname(data.customer_Name);
        }
      });
  };
  return (
    <div className="mt-3">
      <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">สมาชิกบริการ (ถ้ามี)</label>
            <input
              type="text"
              className="as-input"
              name="Customer_Code"
              onChange={getDataMember}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">ชื่อ</label>
            <input
              type="textarea"
              id="name"
              name="Customer_Firstname"
              className="as-input"
              defaultValue={defultData.Customer_Firstname}
              onChange={handleChangInput}
              Customer_Firstname
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">นามสกุล</label>
            <input
              type="textarea"
              id="surname"
              defaultValue={defultData.Customer_Lastname}
              className="as-input"
              name="Customer_Lastname"
              onChange={handleChangInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">เบอร์โทรศัพท์</label>
            <input
              type="textarea"
              id="tel"
              defaultValue={defultData.Customer_Tel}
              className="as-input"
              name="Customer_Tel"
              onChange={handleChangInput}
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">มือถือ*</label>
            <input
              type="textarea"
              id="phone"
              defaultValue={defultData.Customer_Mobile}
              className="as-input"
              name="Customer_Mobile"
              onChange={handleChangInput}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="font-weight-bold">
              อีเมล (โปรดระบุเพื่อให้ระบบส่งข้อความยืนยันการลงทะเบียน)
            </label>
            <input
              type="textarea"
              id="email"
              defaultValue={defultData.Customer_Email}
              className="as-input"
              name="Customer_Email"
              onChange={handleChangInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
