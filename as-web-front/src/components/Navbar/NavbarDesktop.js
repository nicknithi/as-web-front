import React from "react";
import PropTypes from "prop-types";
import "../../assets/scss/components/navbar.scss";
import logo from "../../assets/img/Logo_300ppi.png";
import InputSearch from "../Input/InputSearch";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import { useTranslation } from "react-i18next";
export default function NavbarDesktop({ NavbarItem }) {
  const [t, i18n] = useTranslation("common");
  const placeholderSearch = "ค้นหา...";
  const changToThai = () => {
    i18n.changeLanguage("th");
    document.querySelector("body").style.fontFamily =
      "helvetica_neueregular,sans-serif";
  };
  const changToEng = () => {
    i18n.changeLanguage("en");
    document.querySelector("body").style.fontFamily =
      "psl_kittithadaregular,sans-serif";
  };
  return (
    <div>
      <div className="as-navbar-desktop mx-auto d-none d-md-block">
        <div className="navbar-header d-flex">
          <a href="/" className="logo position-relative">
            <img className="img-fluid" src={logo} />
          </a>
          <div className="right-content ml-auto d-flex align-items-center">
            <span className="mr-3 official-website">{t("website.navbar")}</span>
            <button className="btn-lang th mr-3" onClick={() => changToThai()}>
              TH
            </button>
            <button className="btn-lang en mr-3" onClick={() => changToEng()}>
              EN
            </button>
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

NavbarDesktop.propTypes = {
  NavbarItem: PropTypes.array,
};
NavbarDesktop.defaultProps = {
  NavbarItem: [],
};
