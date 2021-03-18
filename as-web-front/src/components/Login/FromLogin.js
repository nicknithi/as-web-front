import React, { useState } from "react";
import "../../assets/scss/login.scss";
import ButtonMain from "../button/ButtonMain";
import http from "../../axios";
import { useCookies } from "react-cookie";
export default function FromLogin() {
  const [cookies, setCookie] = useCookies(["customerID"]);
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await http.post("/api/Login/CustomerLogin", DataLogin);
    console.log(res);
    if (res.data.message === "Login Success!") {
      console.log(res.data.data);
      setCookie("customerID", res.data.data.customerID);
      window.location = "/profile";
    } else {
      alert("usename or password incorrect");
    }
  };
  const [DataLogin, setDataLogin] = useState({
    Username: "",
    Password: "",
  });
  return (
    <div className="as-login  pb-5 mb-4">
      <h3 className="title">ลงทะเบียนสมัครสมาชิก</h3>
      <form onSubmit={handleLogin}>
        <div className="as-login-form py-5">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <label className="font-weight-bold">ชื่อล็อกอิน</label>
              <input
                type="text"
                className="as-input"
                onChange={(e) => {
                  setDataLogin({ ...DataLogin, Username: e.target.value });
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mx-auto">
              <label className="font-weight-bold">รหัสผ่าน</label>
              <input
                type="password"
                className="as-input"
                onChange={(e) => {
                  setDataLogin({ ...DataLogin, Password: e.target.value });
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mx-auto text-right">
              <label>
                <a href="/forgotpassowrd">ลืมรหัสผ่าน</a>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto">
              <ButtonMain
                title="เข้าสู่ระบบ"
                color="#636363"
                BgColor="#f1c400"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
