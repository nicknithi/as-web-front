/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import NavbarDesktop from "./Navbar/NavbarDesktop";
import { useCookies } from "react-cookie";
import NavbarMobile from "./Navbar/NavbarMobile";
import { getMenuAll } from "../GetDataMenu";
export default function header() {
  const [NavbarData, setNavbarData] = useState([]);
  let lang = "TH";
  const [cookies, setCookie] = useCookies(["as_lang"]);
  if (cookies.as_lang) {
    lang = cookies.as_lang;
  }

  useEffect(async () => {
    let resMemu = await getMenuAll(lang);
    resMemu = resMemu.filter((e) => e.hide_header !== 0);
    console.log("resMemu", resMemu);
    const mainMenu = resMemu.filter(
      (e) => e.id_menu === 0 || e.id_menu === null
    );
    const NavMainMenu = mainMenu.map((item, index) => {
      return { ...item, title: item.menu, subMenu: [], link: item.menu };
    });
    NavMainMenu.forEach((item, index) => {
      const dataTempMenu = resMemu.filter(
        (m) => m.id_menu === item.id_main_menu
      );
      if (dataTempMenu.length) {
        const SubMenuTemp = dataTempMenu.map((item, index) => {
          return { ...item, title: item.menu, link: item.menu };
        });
        item.subMenu = SubMenuTemp;
      }
    });
    setNavbarData(NavMainMenu);
  }, []);

  return (
    <header>
      <NavbarDesktop NavbarItem={NavbarData} />
      <NavbarMobile NavbarItem={NavbarData} />
    </header>
  );
}
