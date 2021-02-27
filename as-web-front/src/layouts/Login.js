import React from "react";
import BannerLogin from "../components/Banner/BannerLogin";
import FromLogin from "../components/Login/FromLogin";
import ButtonMain from "../components/button/ButtonMain";
export default function Login() {
  return (
    <div>
      <BannerLogin />
      <div className="site-content">
        <FromLogin />
        <div className="text-center mb-5  ">
          <ButtonMain title="กลับ" color="white" BgColor="#4ea4cd" />
        </div>
      </div>
    </div>
  );
}
