import React, { useEffect, useState } from "react";
import FromLogin from "../components/Login/FromLogin";
import ElementBanner from "../../src/components/Content/ElementBanner";

export default function Login({ data }) {
  const [ImgBanner, setImgBanner] = useState("");
  useEffect(() => {
    console.log("tests ggggg");
    const banner = data.find((b) => b.content_Type === 2);
    if (banner !== undefined) {
      console.log("bannerbanner", banner.image);
      setImgBanner(banner.image);
    }
  }, [data]);
  return (
    <div>
      <ElementBanner img={ImgBanner} />
      <div className="container under-line mb-4" />
      <div className="container p-0">
        <FromLogin />
      </div>
    </div>
  );
}
