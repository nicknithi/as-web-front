/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import NavbarDesktop from "./Navbar/NavbarDesktop";
import { useCookies } from "react-cookie";
import NavbarMobile from "./Navbar/NavbarMobile";
import { getMenuAll } from "../GetDataMenu";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function header() {
  const [t, i18n] = useTranslation("common");
  const [cookies, setCookie] = useCookies(["as_lang"]);
  let { customPath, langContent } = useParams();
  const [NavbarData, setNavbarData] = useState([]);
  let lang = "TH";
  if (cookies.as_lang) {
    lang = cookies.as_lang;
  }
  if (!langContent) {
    window.location = `${
      process.env.REACT_APP_SUB_DIRECTORY
    }/${lang.toLowerCase()}/Home_${lang}`;
  }
  lang = langContent.toUpperCase();
  useEffect(async () => {
    if (lang) {
      if (lang === "TH") {
        i18n.changeLanguage("th");
        document.body.style.fontFamily = "psl_kittithadaspbold,sans-serif";
        // document.body.style.fontFamily = "psl_kittithadaregular,sans-serif";
        // document.body.style.setProperty("font-size", "24px", "important");
        // document.body.style.setProperty("font-weight", "bold", "important");
        // let h1Elements = document.getElementsByTagName("h1");
        // for (let i = 0; i < h1Elements.length; i++) {
        //   h1Elements[i].classList.add("eng");
        // }
      } else {
        i18n.changeLanguage("en");
        document.body.style.fontFamily =
          "helvetica_neueregular,psl_kittithadaspbold,sans-serif";
        // document.body.style.fontFamily = "helvetica_neueregular,sans-serif";
        // document.body.style.setProperty("font-size", "14px", "important");
        // document.body.style.setProperty("font-weight", "normal", "important");
        // document.body.style.setProperty("line-height", "1.8", "important");

        // document
        //   .querySelector(".as-footer")
        //   .style.setProperty("font-weight", "normal", "important");
      }
    }

    let resMemu = await getMenuAll(lang);
    resMemu = resMemu.filter((e) => e.hide_header !== 0);
    const mainMenu = resMemu.filter(
      (e) => e.id_menu === 0 || e.id_menu === null
    );
    const NavMainMenu = mainMenu.map((item, index) => {
      return { ...item, title: item.menu, subMenu: [], link: item.menu };
    });
    console.log(NavMainMenu);
    NavMainMenu.forEach((item, index) => {
      const dataTempMenu = resMemu.filter(
        (m) => m.id_menu === item.id_main_menu
      );
      if (dataTempMenu.length) {
        const SubMenuTemp = dataTempMenu.map((item, index) => {
          "Membership Login";
          return { ...item, title: item.menu, link: item.menu };
        });
        item.subMenu = SubMenuTemp;
        if (cookies && cookies.customerID) {
          if (item.menu === "MEMBERSHIP" || item.menu === "สมาชิกการบริการ") {
            item.subMenu.push({
              title: langContent === "th" ? "ออกจากระบบ" : "Log out",
              menu_link: "logout",
              link: "logout",
            });
            item.subMenu.forEach((dataSubMenu, indexSubMenu) => {
              console.log(dataSubMenu);
              if (
                dataSubMenu.menu === "Membership Login" ||
                dataSubMenu.menu === "เข้าสู่ระบบสมาชิก "
              ) {
                console.log("5555 test");
                item.subMenu[indexSubMenu].title =
                  langContent === "th" ? "โปรไฟล์" : "Profile";
                item.subMenu[indexSubMenu].menu_link = "profile";
                item.subMenu[indexSubMenu].link = "profile";
              }
            });
          }
        }
      }
    });

    // NavMainMenu.push({ title: "LOG OUT", subMenu: [], menu_link: "/logout" });
    setNavbarData(NavMainMenu);
  }, []);

  return (
    <header>
      <NavbarDesktop NavbarItem={NavbarData} />
      <NavbarMobile NavbarItem={NavbarData} />
    </header>
  );
}
