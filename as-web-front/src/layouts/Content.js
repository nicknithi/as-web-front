/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getContent } from "../GetContent";
import { getMenuAll } from "../GetDataMenu";
import { useParams } from "react-router-dom";
import ElementBanner from "../components/Content/ElementBanner";
export default function Content() {
  let { customPath } = useParams();
  const [Content, setContent] = useState([]);
  useEffect(async () => {
    const resMemu = await getMenuAll();
    const dataUrl = resMemu.find(
      (m) => m.menu.toLowerCase() === customPath.toLowerCase()
    );

    console.log("data", dataUrl.id_main_menu);
    if (dataUrl !== undefined) {
      const resContent = await getContent(dataUrl.id_main_menu);
      setContent(resContent);
    } else {
      //window.location = "/";
    }
  }, []);
  const codition = (data) => {
    if (data.content_Type === 5) {
      // data.image = "Resources/File/HOME_BANNER2021-03-18_15-05-59-670.png";
      return <ElementBanner img={data.image} />;
    } else {
      return <div>151515</div>;
    }
  };

  return (
    <div>
      {Content.map((item, index) => (
        <div>{codition(item)}</div>
      ))}
    </div>
  );
}
