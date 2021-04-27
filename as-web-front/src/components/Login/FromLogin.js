import React, { useState } from "react";
import "../../assets/scss/login.scss";
import ButtonMain from "../button/ButtonMain";
import http from "../../axios";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
export default function FromLogin() {
  const [t, i18n] = useTranslation("common");
  const [cookies, setCookie] = useCookies(["customerID"]);
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await http.post("/api/Login/CustomerLogin", DataLogin);
    if (res.data.message === "Login Success!") {
      setCookie("customerID", res.data.data.customerID, {
        path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
      });
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
      <h3 className="title">{t("Login.title")}</h3>
      <form onSubmit={handleLogin}>
        <div className="as-login-form py-5">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <label className="">{t("Login.username")}</label>
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
              <label className="">{t("Login.password")}</label>
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
                <a href="/forgotpassowrd">{t("Login.forget")}</a>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="mx-auto">
              <ButtonMain
                title={t("Login.btn")}
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
