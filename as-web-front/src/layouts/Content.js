/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { GetContent } from "../GetContent";
import { getMenuAll } from "../GetDataMenu";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import ElementBanner from "../components/Content/ElementBanner";
import ElementTextBox from "../components/Content/ElementTextBox";
import ElementPicture from "../components/Content/ElementPicture";
import ElementVideo from "../components/Content/ElementVideo";
import ElementCard from "../components/Content/ElementCard";
import ElementPDF from "../components/Content/ElementPDF";
import ElementAudio from "../components/Content/ElementAudio";
import ElementCarousel from "../components/Content/ElementCarousel";
import SpareListByModel from "../layouts/SpareListByModel";
import SpareDetail from "../layouts/SpareDetail";
import TabContent from "../layouts/TabContent";
import TapBenefit from "../layouts/TapBenefit";
import ButtonMain from "../components/button/ButtonMain";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Warranty from "../layouts/Warranty";
import Spare from "../layouts/Spare";
import Installation from "../layouts/Installation";
import ProfileHome from "../layouts/ProfileHome";
import "../assets/scss/components/content.scss";
import Maintain from "./Maintain";
import { useTranslation } from "react-i18next";
export default function Content() {
  const [t, i18n] = useTranslation("common");
  let { customPath, langContent } = useParams();
  const [Content, setContent] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["as_lang"]);
  const [maintain, setMaintain] = useState(0);
  const columcOption = {
    0: "col-md-12",
    1: "col-md-12",
    2: "col-md-6",
    3: "col-md-4",
    4: "col-md-3",
    5: "col-md-2_5",
    6: "col-md-2",
  };
  useEffect(async () => {
    let lang = "TH";

    if (cookies.as_lang) {
      lang = cookies.as_lang;
    }
    let tempCustomPath = customPath;
    lang = langContent.toUpperCase();

    //logout
    if (tempCustomPath === "logout") {
      document.cookie = `customerID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.REACT_APP_SUB_DIRECTORY};`;
      window.location = `${
        process.env.REACT_APP_SUB_DIRECTORY
      }/${langContent}/${langContent === "th" ? "Home_TH" : "Home_EN"}`;
    }
    const resMemu = await getMenuAll(lang);
    // console.log("resMemu:", resMemu);
    const dataUrl = resMemu.find(
      (m) =>
        m.menu_link.toLowerCase().replace(/\s/g, "") ===
        tempCustomPath.toLowerCase().replace(/\s/g, "")
    );
    // console.log("dataUrl", dataUrl);
    if (dataUrl !== undefined) {
      setMaintain(dataUrl.id_menu);
      const resContent = await GetContent(dataUrl.id_main_menu, lang);
      console.log(resContent);
      setContent(resContent);
    } else {
      //window.location = "/";
    }
    setTimeout(() => {
      document.querySelector(".as-loading").style.display = "none";
    }, 800);
  }, []);
  const goBack = () => {
    window.history.back();
  };
  const RenderColumn = (data) => {
    // fix content

    return (
      <div className={`content ${!data.line_status && "disable-underline"}`}>
        {data.content_Title && (
          <h1
            className=""
            dangerouslySetInnerHTML={{ __html: data.content_Title }}
          />
        )}
        {data.content_Desc && (
          <h3
            className=""
            dangerouslySetInnerHTML={{ __html: data.content_Desc }}
          />
        )}
        {data.content_body && (
          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: data.content_body }}
          />
        )}
        <div>{RenderElement(data)}</div>
      </div>
    );
  };
  const RenderElement = (data) => {
    let dataRender = data.file;
    const col = data.content_col;
    const type = data.content_Type;
    console.log("dataRender", dataRender);
    if (dataRender.length) {
      if (data.content_Type === 8) {
        const group = [];
        let tempOrder = dataRender[0].file_order;
        group.push(dataRender.filter((d) => d.file_order === tempOrder));
        data.file.forEach((item, index) => {
          if (item.file_order !== tempOrder) {
            group.push(
              dataRender.filter((d) => d.file_order === item.file_order)
            );
            tempOrder = item.file_order;
          }
        });
        return (
          <div className="row position-relative">
            {group.map((item, index) => (
              <React.Fragment key={index}>
                {codition(item, index, col, type)}
              </React.Fragment>
            ))}
          </div>
        );
      }
      if (type === 2) {
        return (
          <div className="row no-gutters">
            {/* {dataRender.map((item, index) => (
              <React.Fragment key={item.id}>
                {codition(item, index, col, type)}
              </React.Fragment>
            ))} */}
            {codition(dataRender, 0, col, type)}
          </div>
        );
      }
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
        <div className={`${columcOption[col]} p-0`}>
          <ElementBanner img={data} />
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
        <div className={`${columcOption[col]} position-static`}>
          <ElementCarousel data={data} />
        </div>
      );
    }
  };
  const getBannerContent = (data) => {
    const banner = data.find((b) => b.content_Type === 2);
    if (banner !== undefined) {
      return banner.image;
    }
    return "";
  };
  if (customPath === "Warranty_TH" || customPath === "Warranty_EN") {
    return (
      <>
        <Warranty data={Content} RenderColumn={RenderColumn} />
        {/* <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div> */}
      </>
    );
  } else if (
    customPath === "Spare Parts_EN" ||
    customPath === "Spare Parts_TH"
  ) {
    return <Spare data={Content} RenderColumn={RenderColumn} />;
  } else if (
    customPath === "Installation_TH" ||
    customPath === "Installation_EN"
  ) {
    return <Installation data={Content} RenderColumn={RenderColumn} />;
  } else if (
    customPath === "Membership Login_TH" ||
    customPath === "Membership Login_EN"
  ) {
    return (
      <>
        <Login data={Content} />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </>
    );
  } else if (
    customPath === "Membership Registration_EN" ||
    customPath === "Membership Registration_TH"
  ) {
    return (
      <>
        <Register data={Content} />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </>
    );
  } else if (maintain === 20 || maintain === 38) {
    return <Maintain data={Content} RenderColumn={RenderColumn} />;
  } else if (
    customPath === "Customer Care Center Branch_TH" ||
    customPath === "Customer Care Center Branch_EN"
  ) {
    return (
      <>
        <TapBenefit
          title={""}
          data={Content}
          RenderColumn={RenderColumn}
          getBannerContent={getBannerContent}
        />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </>
    );
  } else if (
    customPath === "Troubleshooting_EN" ||
    customPath === "Troubleshooting_TH"
  ) {
    return (
      <>
        <TabContent
          data={Content}
          RenderColumn={RenderColumn}
          getBannerContent={getBannerContent}
        />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </>
    );
  } else if (customPath === "Benefit_EN" || customPath === "Benefit_TH") {
    return (
      <>
        <TapBenefit
          title={""}
          data={Content}
          RenderColumn={RenderColumn}
          getBannerContent={getBannerContent}
        />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </>
    );
  } else if (customPath === "profile" || customPath === "profile") {
    return (
      <>
        <ProfileHome />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        {Content.map((item, index) => (
          <div key={index}>
            <div className={`${item.content_Type !== 2 && "container"}`}>
              <div>{RenderColumn(item)}</div>
            </div>
          </div>
        ))}
        {/* {coditionAddon()} */}
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => goBack()}
            />
          </div>
        </div>
      </div>
    );
  }
}
