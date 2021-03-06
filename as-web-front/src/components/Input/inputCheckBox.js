import React from "react";
import "../../assets/scss/components/input/checkbox.scss";
export default function inputCheckBox({ lable }) {
  return (
    <div className="d-flex justify-content-center">
      <label className="as-checkbox">
        {lable}
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
