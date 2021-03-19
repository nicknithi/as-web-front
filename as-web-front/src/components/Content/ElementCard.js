import React from "react";
import "../../assets/scss/Element/Card.scss";
export default function ElementCard({ img, detail }) {
  return (
    <div className="element-card">
      {img && <img src={img} alt="" />}
      {detail && <div className="detail">{detail}</div>}
      <button className="ml-auto">{">"}</button>
    </div>
  );
}
