import React from "react";
import "../../assets/scss/components/button/warranty-confirm.scss";
export default function ButtonConfirmWarranty({ title, handleClick }) {
  return (
    <div className="button-confirm-warranty text-center" onClick={handleClick}>
      <button>{title}</button>
    </div>
  );
}
