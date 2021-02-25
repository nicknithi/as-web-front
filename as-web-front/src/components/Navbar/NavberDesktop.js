import React from "react";
import PropTypes from "prop-types";

export default function NavberDesktop({ NavbarItem }) {
  console.log(NavbarItem);
  return (
    <div>
      {NavbarItem.map((value, index) => (
        <div key={index}>teset</div>
      ))}
    </div>
  );
}

NavberDesktop.propTypes = {
  NavbarItem: PropTypes.array,
};
NavberDesktop.defaultProps = {
  NavbarItem: [],
};
