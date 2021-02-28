import React from "react";
import BannerLogin from "../components/Banner/BannerLogin";
import FormForgotLogin from "../components/Login/FormForgotLogin";
import ButtonMain from "../components/button/ButtonMain";
export default function Forgotpassowrd() {
  return (
    <div>
      <BannerLogin />
      <div className="site-content">
        <FormForgotLogin />
      </div>
    </div>
  );
}
