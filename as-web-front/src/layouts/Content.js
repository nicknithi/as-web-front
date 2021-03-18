/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getContent } from "../GetContent";
import { getMenuAll } from "../GetDataMenu";
import { useParams } from "react-router-dom";
import ElementBanner from "../components/Content/ElementBanner";
import ElementTextBox from "../components/Content/ElementTextBox";

import ElementCol1 from "../components/Content/ElementCol1";
import ElementCol2 from "../components/Content/ElementCol2";
import ElementPicture from "../components/Content/ElementPicture";
import ButtonMain from "../components/button/ButtonMain";
import Login from "../layouts/Login";
import Register from "../layouts/Register";

export default function Content() {
  let { customPath } = useParams();
  const [Content, setContent] = useState([]);
  useEffect(async () => {
    const resMemu = await getMenuAll();
    const dataUrl = resMemu.find(
      (m) =>
        m.menu.toLowerCase().replace(/\s/g, "") ===
        customPath.toLowerCase().replace(/\s/g, "")
    );
    console.log("dataUrl", resMemu, customPath);
    if (dataUrl !== undefined) {
      console.log();
      const resContent = await getContent(dataUrl.id_main_menu);
      console.log("resContent", resContent);

      setContent(resContent);
    } else {
      //window.location = "/";
    }
  }, []);
  const goBack = () => {
    window.history.back();
  };
  const codition = (data) => {
    if (data.content_Type === 0) {
      return <ElementTextBox data={data} />;
    } else if (data.content_Type === 1) {
      return <ElementCol1 data={data} />;
    } else if (data.content_Type === 2) {
      return <ElementCol2 data={data} />;
    } else if (data.content_Type === 5) {
      return <ElementBanner img={data.image} />;
    } else if (data.content_Type === 6) {
      return <ElementPicture data={data} />;
    }
  };
  const coditionAddon = () => {
    if (customPath === "เข้าสู่ระบบสมาชิก") {
      return <Login />;
    } else if (customPath === "ลงทะเบียนสมัครสมาชิก") {
      return <Register />;
    }
  };
  return (
    <div>
      {/* {Content.map((item, index) => (
        <div key={index}>{codition(item)}</div>
      ))}
      {coditionAddon()}
      <div className="row d-flex justify-content-center mb-5">
        <ButtonMain
          title="กลับ"
          color="#636363"
          BgColor="#f1c400"
          handleClick={() => goBack()}
        />
      </div> */}
    </div>
  );
}
