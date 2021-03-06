import React from "react";
import "../../assets/scss/components/input/checkbox.scss";
export default function inputCheckBox({ lable, handleCheck }) {
  return (
    <div className="d-flex justify-content-center">
      <label className="as-checkbox">
        {lable}
        <input type="checkbox" onChange={handleCheck} />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}
