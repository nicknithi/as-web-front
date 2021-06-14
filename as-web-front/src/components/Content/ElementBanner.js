import React from "react";
import Banner from "../Banner/Banner";
export default function ElementBanner({ img }) {
  return (
    <div>
      {/* <Banner img={`${process.env.REACT_APP_DOMAIN_NAME}/${img}`} /> */}
      <Banner img={img} />
    </div>
  );
}
