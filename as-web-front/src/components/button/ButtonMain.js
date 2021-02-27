import React from "react";
import "../../assets/scss/components/button/button-main.scss";
export default function ButtonMain({ title, color, BgColor }) {
  return (
    <div className="main-button">
      <button style={{ color: color, backgroundColor: BgColor }}>
        {title}
      </button>
    </div>
  );
}
