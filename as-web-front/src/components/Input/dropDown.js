import React from "react";
import "../../assets/scss/components/input/dropdown.scss";
export default function dropDown() {
  const handleSelect = (e) => {
    // console.log("test", document.querySelector(".form-select"));
    console.log(e.target.getAttribute("value"));
  };
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        onChange={handleSelect}
      >
        <option selected>Open this select menu</option>
        <option value="1" name="One">
          One
        </option>
        <option value="2" name="Two">
          Two
        </option>
        <option value="3" name="Three">
          Three
        </option>
      </select>
      <div className="custom-dropdown">
        {"test"}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
