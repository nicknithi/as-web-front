import React, { useState, useEffect } from "react";
import "../../assets/scss/login.scss";
import ButtonMain from "../button/ButtonMain";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ForgetPasswordCustomer } from "../../GetDataMenu";
import LoadingContent from "../LoadingContent";
export default function FormForgotLogin() {
  const [t, i18n] = useTranslation("common");
  let { customPath, langContent } = useParams();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (langContent) {
      if (langContent === "th") {
        i18n.changeLanguage("th");
      } else {
        i18n.changeLanguage("en");
      }
    }
  }, []);
  const submit = async (form) => {
    form.preventDefault();
    setLoading(true);
    const res = await ForgetPasswordCustomer(form.target.email.value);
    alert(res.message);
    setLoading(false);
    if (res.message === "Success!") {
      window.location = `${
        process.env.REACT_APP_SUB_DIRECTORY
      }/${langContent}/Membership Login_${langContent.toUpperCase()}`;
    }
  };
  return (
    <form className="as-login pt-5 pb-5 mb-4" onSubmit={submit}>
      <h3 className="title">{t("formEdit.forgettitle")}</h3>
      <div className="description mb-4">{t("formEdit.forgetdetail")}</div>
      <div className="as-login-form py-5">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <label className="">{t("formEdit.forgetlable")}</label>
            <input type="email" name="email" className="as-input" required />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="mx-auto">
          {Loading ? (
            <LoadingContent />
          ) : (
            <ButtonMain title="ส่งข้อมูล" color="#636363" BgColor="#f1c400" />
          )}
        </div>
      </div>
    </form>
  );
}
