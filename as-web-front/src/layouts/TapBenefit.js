import React, { useState } from "react";
import ElementBanner from "../components/Content/ElementBanner";
import "../assets/scss/content-tab.scss";
import { useTranslation } from "react-i18next";
import ButtonMain from "../components/button/ButtonMain";
export default function TabContent({
  data,
  RenderColumn,
  getBannerContent,
  title,
}) {
  const [t, i18n] = useTranslation("common");
  let dataTitle = data[1] === undefined ? [] : [data[1]];
  let dataTap = [...data];
  dataTap.splice(1, 1);
  console.log("dataTap", dataTap);
  const [Active, setActive] = useState(1);
  const isActive = (tab) => {
    if (Active === tab) {
      return "d-block";
    }
    return "d-none";
  };
  const isActiveMenu = (tab) => {
    if (Active === tab) {
      return "active";
    }
    return "";
  };
  const setActiveTab = (tab) => {
    setActive(tab);
  };

  return (
    <div className="content-tab">
      <ElementBanner img={getBannerContent(data)} />
      {dataTitle.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            {item.content_Type !== 2 && (
              <div className="row">{RenderColumn(item)}</div>
            )}
          </div>
        </div>
      ))}
      <div className="container tab-header mb-3 py-3 border-top-0 mt--">
        {title && <h3>{title}</h3>}
        {dataTap.map((item, index) => (
          <>
            {item.content_Type !== 2 && (
              <div
                className={`header-menu ${isActiveMenu(index)}`}
                onClick={() => setActiveTab(index)}
              >
                {item.contentTitle}
              </div>
            )}
          </>
        ))}
      </div>
      {dataTap.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            {item.content_Type !== 2 && (
              <div className={isActive(index)}>{RenderColumn(item)}</div>
            )}
          </div>
        </div>
      ))}
      <div className="row d-flex justify-content-center mb-5">
        <ButtonMain
          title={t("website.btnBack")}
          color="#636363"
          BgColor="#f1c400"
          handleClick={() => (window.location = "/")}
        />
      </div>
    </div>
  );
}
