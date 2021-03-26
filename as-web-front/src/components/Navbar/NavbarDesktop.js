import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../assets/scss/components/navbar.scss";
import logo from "../../assets/img/Logo_300ppi.png";
import InputSearch from "../Input/InputSearch";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
export default function NavbarDesktop({ NavbarItem }) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [lang, setLang] = useState(cookies.as_lan);
  // let lang = "TH";

  // if (cookies.as_lang) {
  //   setLang(cookies.as_lang);
  // }

  const [t, i18n] = useTranslation("common");
  const placeholderSearch = "ค้นหา...";

  if (!cookies.as_lang) {
    setCookie("as_lang", "TH");
  }

  // if (cookies.as_lang) {
  //   if (cookies.as_lang === "TH") {
  //     document.body.style.fontFamily = "psl_kittithadaregular,sans-serif";
  //     document.body.style.fontSize = "22px !important";
  //   } else {
  //     document.body.style.fontFamily = "helvetica_neueregular,sans-serif";
  //     document.body.style.fontSize = "12px !important";
  //   }
  // }
  useEffect(() => {
    if (cookies.as_lang) {
      if (cookies.as_lang === "TH") {
        document.body.style.fontFamily = "psl_kittithadaregular,sans-serif";
        document.body.style.setProperty("font-size", "24px", "important");
        document.body.style.setProperty("font-weight", "bold", "important");
      } else {
        document.body.style.fontFamily = "helvetica_neueregular,sans-serif";
        document.body.style.setProperty("font-size", "16px", "important");
        document.body.style.setProperty("font-weight", "normal", "important");
      }
    }
  }, [lang]);
  const changToThai = () => {
    i18n.changeLanguage("th");
    setCookie("as_lang", "TH");
    setLang("TH");
    window.location = "/หน้าแรก";
    // window.location.reload(false);
  };
  const changToEng = () => {
    i18n.changeLanguage("en");
    setCookie("as_lang", "EN");
    setLang("EN");
    window.location = "/home";
    // window.location.reload(false);
  };
  return (
    <div>
      <div className="as-navbar-desktop mx-auto d-none d-lg-block">
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
