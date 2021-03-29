import React, { useState } from "react";
import ElementBanner from "../components/Content/ElementBanner";
import "../assets/scss/content-tab.scss";
export default function TabContent({
  data,
  RenderColumn,
  getBannerContent,
  title,
}) {
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
      <div className="container tab-header my-3 py-3">
        {title && <h3>{title}</h3>}
        {data.map((item, index) => (
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
      {data.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            {item.content_Type !== 2 && (
              <div className={isActive(index)}>{RenderColumn(item)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
