import React from "react";
import "../../assets/scss/components/button/button-main.scss";
import PropTypes from "prop-types";
export default function ButtonMain({
  title,
  color,
  BgColor,
  handleClick,
  Confirm,
}) {
  return (
    <div className="main-button">
      <button
        disabled={!Confirm}
        style={{ color: color, backgroundColor: BgColor }}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}

ButtonMain.propTypes = {
  Confirm: PropTypes.bool,
};
ButtonMain.defaultProps = {
  Confirm: true,
};
