import React from "react";
import PropTypes from "prop-types";
import "../../assets/scss/components/navbar.scss";
import logo from "../../assets/img/Logo.png";
import InputSearch from "../Input/InputSearch";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
export default function NavberDesktop({ NavbarItem }) {
  const placeholderSearch = "ค้นหา...";
  return (
    <div>
      <div className="as-navbar-desktop mx-auto d-none d-md-block">
        <div className="navbar-header d-flex">
          <div className="logo position-relative">
            <img src={logo} />
          </div>
          <div className="right-content ml-auto d-flex align-items-center">
            <span className="mr-3 official-website">Official Website</span>
            <button className="btn-lang th mr-3">TH</button>
            <button className="btn-lang en mr-3">EN</button>
            <InputSearch placehoder={placeholderSearch} />
          </div>
        </div>
        <hr className="navbar-hr my-0" />
        <div className="navbar-menu d-flex align-items-center">
          <NavbarDesktopMenu menu={NavbarItem} />
        </div>
      </div>
      <div className="as-navbar-mobile d-md-none"></div>
    </div>
  );
}

NavberDesktop.propTypes = {
  NavbarItem: PropTypes.array,
};
NavberDesktop.defaultProps = {
  NavbarItem: [],
};
