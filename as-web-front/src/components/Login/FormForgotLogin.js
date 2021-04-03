import React from "react";
import "../../assets/scss/login.scss";
import ButtonMain from "../button/ButtonMain";
export default function FormForgotLogin() {
  return (
    <div className="as-login pt-5 pb-5 mb-4">
      <h3 className="title">ลืมรหัสผ่าน</h3>
      <div className="description mb-4">
        กรุณากรอกอีเมลที่เคยใช้สมัครสมาชิก ระบบจะทำการตรวจสอบข้อมูล
        และจะจัดส่งลิงค์สำหรับตั้งรหัสผ่านใหม่ไปยังอีเมลนี้
      </div>
      <div className="as-login-form py-5">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <label className="">กรุณากรอกอีเมลที่สมัครไว้</label>
            <input type="text" className="as-input" required />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="mx-auto">
          <ButtonMain title="ส่งข้อมูล" color="#636363" BgColor="#f1c400" />
        </div>
      </div>
    </div>
  );
}
