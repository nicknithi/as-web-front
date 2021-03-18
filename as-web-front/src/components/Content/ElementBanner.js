import React from "react";
import Banner from "../Banner/Banner";
export default function ElementBanner({ img }) {
  return (
    <div>
      <Banner img={`http://www.mostactive.info/${img}`} />
    </div>
  );
}
