import React, { useState, useEffect } from "react";
import http from "../../axios";
export default function MemberData({
  FormDataWarranty,
  setFormDataWarranty,
  handleSearchByCustomerCode,
  Confirm,
}) {
  const changeCode = (e) => {
    handleSearchByCustomerCode(e.target.value);
    const data = { ...FormDataWarranty };
    setFormDataWarranty({
      ...data,
      Customer_Code: e.target.value,
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
              // disabled={Confirm}
              onChange={(e) => changeCode(e)}
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
              value={FormDataWarranty.Customer_Firstname}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Firstname: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">นามสกุล</label>
            <input
              type="textarea"
              id="surname"
              className="as-input"
              name="Customer_Lastname"
              value={FormDataWarranty.Customer_Lastname}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Lastname: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">เบอร์โทรศัพท์</label>
            <input
              type="textarea"
              id="tel"
              className="as-input"
              name="Customer_Tel"
              value={FormDataWarranty.Customer_Tel}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Tel: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">มือถือ*</label>
            <input
              type="textarea"
              id="phone"
              className="as-input"
              name="Customer_Mobile"
              value={FormDataWarranty.Customer_Mobile}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Mobile: e.target.value,
                })
              }
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
              className="as-input"
              name="Customer_Email"
              value={FormDataWarranty.Customer_Email}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Email: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
