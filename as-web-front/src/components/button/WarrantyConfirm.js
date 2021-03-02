import React from "react";
import "../../assets/scss/components/button/warranty-confirm.scss";
export default function ButtonConfirmWarranty({ title }) {
  return (
    <div className="button-confirm-warranty text-center">
      <button>{title}</button>
    </div>
  );
}
