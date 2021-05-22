/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import "../../assets/scss/components/navbar.scss";
import logo from "../../assets/img/Logo_300ppi.png";
import InputSearchAll from "../Input/inputSearchAll";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { getMenuAll } from "../../GetDataMenu";
import { useParams } from "react-router-dom";
export default function NavbarDesktop({ NavbarItem }) {
  let { customPath } = useParams();
  const [cookies, setCookie] = useCookies(["as_lang"]);

  // let lang = "TH";

  // if (cookies.as_lang) {
  //   setLang(cookies.as_lang);
  // }

  const [t, i18n] = useTranslation("common");
  const placeholderSearch = "ค้นหา...";

  // if (cookies.as_lang) {
  //   if (cookies.as_lang === "TH") {
  //     document.body.style.fontFamily = "psl_kittithadaregular,sans-serif";
  //     document.body.style.fontSize = "22px !important";
  //   } else {
  //     document.body.style.fontFamily = "helvetica_neueregular,sans-serif";
  //     document.body.style.fontSize = "12px !important";
  //   }
  // }

  const ChangToThai = async () => {
    setCookie("as_lang", "TH", {
      path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
    });
    const datamenuEN = await getMenuAll("EN");
    let tempMenuEN = datamenuEN.find(
      (m) =>
        m.menu.toLowerCase().replace(/\s/g, "") ===
        customPath.toLowerCase().replace(/\s/g, "")
    );

    if (tempMenuEN && Object.keys(tempMenuEN).length) {
      const datamenuTH = await getMenuAll("TH");
      if (datamenuTH && datamenuTH.length) {
        const res = datamenuTH.find(
          (e) => e.fK_MENU_EN_ID === tempMenuEN.fK_MENU_EN_ID
        );
        // setCookie("as_lang", "TH", {
        //   path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
        // });
        window.location = `${
          process.env.REACT_APP_SUB_DIRECTORY
        }/${res.menu.trim()}`;
        //window.location = "/";
      }
    }
    // setCookie("as_lang", "TH");
    // window.location = "หน้าแรก";
    //window.location.reload(false);
  };
  const ChangToEng = async () => {
    setCookie("as_lang", "EN", {
      path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
    });
    const datamenuEN = await getMenuAll("TH");
    let tempMenuEN = datamenuEN.find(
      (m) =>
        m.menu.toLowerCase().replace(/\s/g, "") ===
        customPath.toLowerCase().replace(/\s/g, "")
    );

    if (tempMenuEN && Object.keys(tempMenuEN).length) {
      const datamenuTH = await getMenuAll("EN");
      if (datamenuTH && datamenuTH.length) {
        const res = datamenuTH.find(
          (e) => e.fK_MENU_TH_ID === tempMenuEN.fK_MENU_TH_ID
        );
        // setCookie("as_lang", "EN", {
        //   path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
        // });
        window.location = `${
          process.env.REACT_APP_SUB_DIRECTORY
        }/${res.menu.trim()}`;
        //window.location = "/home";
      }
    }
    // setCookie("as_lang", "EN");
    // window.location = "home";
    //window.location.reload(false);
  };
  const goBack = () => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    window.location = `${process.env.REACT_APP_SUB_DIRECTORY}/${
      lang === 1 ? "หน้าแรก" : "home"
    }`;
  };
  return (
    <div>
      <div className="as-navbar-desktop mx-auto d-none d-lg-block p-3 p-xl-0">
        <div className="navbar-header d-flex">
          <a onClick={() => goBack()} className="logo position-relative">
            <img className="img-fluid" src={logo} />
          </a>
          <div className="right-content ml-auto d-flex align-items-center">
            <span className="mr-3 official-website">{t("website.navbar")}</span>
            <button className="btn-lang th mr-3" onClick={() => ChangToThai()}>
              TH
            </button>
            <button className="btn-lang en mr-3" onClick={() => ChangToEng()}>
              EN
            </button>
            <InputSearchAll placehoder={placeholderSearch} />
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
