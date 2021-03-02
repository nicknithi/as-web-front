import React from "react";
import "../../assets/scss/components/button/button-main.scss";
export default function ButtonMain({ title, color, BgColor, handleClick }) {
  return (
    <div className="main-button">
      <button
        style={{ color: color, backgroundColor: BgColor }}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}
