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
import Warranty from "../layouts/Warranty";

import "../assets/scss/components/content.scss";

export default function Content() {
  let { customPath } = useParams();
  const [Content, setContent] = useState([]);
  const columcOption = {
    1: "col-md-12",
    2: "col-md-6",
    3: "col-md-4",
    4: "col-md-3",
    5: "col-md-3",
  };
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
  const RenderColumn = (data) => {
    let count = data.content_col;
    if (count === 0) {
      count = 1;
    }
    for (let i = 0; i < count; i++) {
      return (
        <div className={columcOption[count]}>{codition(data, i, count)}</div>
      );
    }
  };
  const codition = (data, index, col) => {
    if (data.content_Type === 0 && customPath !== "การรับประกัน") {
      console.log("test nick nithi");
      return <ElementTextBox data={data} col={col} />;
    } else if (data.content_Type === 2) {
      return <ElementBanner img={data.file[index].path} />;
    } else if (data.content_Type === 3) {
      return <ElementPicture data={data} index={index} />;
    }

    // if (data.content_Type === 0) {

    // } else if (data.content_Type === 1) {
    //   return <ElementCol1 data={data} />;
    // } else if (data.content_Type === 2) {
    //   return <ElementCol2 data={data} />;
    // } else if (data.content_Type === 1) {
    //   return <ElementBanner img={data.image} />;
    // } else if (data.content_Type === 6) {
    //   return <ElementPicture data={data} />;
    // }
  };
  const coditionAddon = () => {
    if (customPath === "เข้าสู่ระบบสมาชิก") {
      return <Login />;
    } else if (customPath === "ลงทะเบียนสมัครสมาชิก") {
      return <Register />;
    } else if (customPath === "การรับประกัน") {
      return <Warranty />;
    }
  };
  return (
    <div>
      {Content.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            <div className={`row`}>
              {item.contentTitle && (
                <h1 className="font-weight-bold">{item.contentTitle || ""}</h1>
              )}
              {RenderColumn(item)}
            </div>
          </div>
        </div>
      ))}
      {coditionAddon()}
      <div className="row d-flex justify-content-center mb-5">
        <ButtonMain
          title="กลับ"
          color="#636363"
          BgColor="#f1c400"
          handleClick={() => goBack()}
        />
      </div>
    </div>
  );
}
