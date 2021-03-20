/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getContent } from "../GetContent";
import { getMenuAll } from "../GetDataMenu";
import { useParams } from "react-router-dom";

import ElementBanner from "../components/Content/ElementBanner";
import ElementTextBox from "../components/Content/ElementTextBox";
import ElementPicture from "../components/Content/ElementPicture";
import ElementVideo from "../components/Content/ElementVideo";
import ElementCard from "../components/Content/ElementCard";
import ElementPDF from "../components/Content/ElementPDF";
import ElementAudio from "../components/Content/ElementAudio";
import ElementCarousel from "../components/Content/ElementCarousel";

import ButtonMain from "../components/button/ButtonMain";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Warranty from "../layouts/Warranty";

import "../assets/scss/components/content.scss";

export default function Content() {
  let { customPath } = useParams();
  const [Content, setContent] = useState([]);
  const columcOption = {
    0: "col-md-12",
    1: "col-md-12",
    2: "col-md-6",
    3: "col-md-4",
    4: "col-md-3",
    5: "col-md-2_5",
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
    return (
      <div className="content">
        {data.content_Title && (
          <h1 className="font-weight-bold">{data.content_Title}</h1>
        )}
        {data.content_Desc && (
          <h3 className="font-weight-bold">{data.content_Desc}</h3>
        )}
        {data.content_body && (
          <div
            className="font-weight-bold content-body"
            dangerouslySetInnerHTML={{ __html: data.content_body }}
          />
        )}
        <div>{RenderElement(data)}</div>
      </div>
    );

    // for (let i = 0; i < count; i++) {
    //   return (
    //     <div className={columcOption[count]}>{codition(data, i, count)}</div>
    //   );
    // }
  };
  const RenderElement = (data) => {
    const dataRender = data.file;
    const col = data.content_col;
    const type = data.content_Type;
    if (dataRender.length) {
      return (
        <div className="row">
          {dataRender.map((item, index) => (
            <React.Fragment key={item.id}>
              {codition(item, index, col, type)}
            </React.Fragment>
          ))}
        </div>
      );
    }
  };
  const codition = (data, index, col, type) => {
    console.log(type);
    if (type === 0) {
      return (
        <div className={columcOption[col]}>
          <ElementTextBox data={data} />
        </div>
      );
    } else if (type === 1) {
      return (
        <div className={columcOption[col]}>
          <ElementCard data={data} />
        </div>
      );
    } else if (type === 2) {
      return (
        <div className={columcOption[col]}>
          <ElementBanner img={data.path} />
        </div>
      );
    } else if (type === 3) {
      return (
        <div className={columcOption[col]}>
          <ElementPicture data={data} index={index} />
        </div>
      );
    } else if (type === 4) {
      return (
        <div className={columcOption[col]}>
          <ElementPDF data={data} index={index} />
        </div>
      );
    } else if (type === 5) {
      return (
        <div className={columcOption[col]}>
          <ElementVideo data={data} />
        </div>
      );
    } else if (type === 6) {
      return (
        <div className={columcOption[col]}>
          <ElementAudio data={data} index={index} />
        </div>
      );
    } else if (type === 8) {
      return (
        <div className={columcOption[col]}>
          <ElementCarousel data={data} />
        </div>
      );
    }

    // if (type === 0 && customPath !== "การรับประกัน") {
    //   console.log("test nick nithi");
    //   return <ElementTextBox data={data} col={col} />;
    // } else if (type === 2) {
    //   return <ElementBanner img={data.file[index].path} />;
    // } else if (type === 3) {
    //   return <ElementPicture data={data} index={index} />;
    // }

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
            <div>{RenderColumn(item)}</div>
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
