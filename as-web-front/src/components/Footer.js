/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../assets/scss/footer.scss";
import { useCookies } from "react-cookie";
import logoFooter from "../assets/img/Logo2INAX.png";
import { getMenuAll } from "../GetDataMenu";

export default function Footer() {
  function RendersubMenu(dataList) {
    console.log("data2131,", dataList);
    return (
      <ul>
        {dataList.subMenu.map((item, index) => (
          <li>{item.menu}</li>
        ))}
      </ul>
    );
  }
  const [NavbarData, setNavbarData] = useState([]);
  let lang = "TH";
  const [cookies, setCookie] = useCookies(["as_lang"]);
  if (cookies.as_lang) {
    lang = cookies.as_lang;
  }

  useEffect(async () => {
    let resMemu = await getMenuAll(lang);
    resMemu = resMemu.filter((e) => e.hide_Footer !== 0);
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
    // console.log(NavMainMenu);
    setNavbarData(NavMainMenu);
    console.log("ggg", NavMainMenu);
  }, []);
  return (
    <footer className="as-footer pt-5 pb-5">
      <div class="site-content">
        <div className="footer-menu">
          {NavbarData.map((item, index) => (
            <div>
              <div>{item.menu}</div>
              <div>{item.subMenu.length > 0 && RendersubMenu(item)}</div>
            </div>
          ))}
        </div>

        {/* <div className="row">
          <div className="col-md-4">
            <ul>
              <li>
                บริการ
                <ul>
                  <li>ขอบเขตการบริการ</li>
                  <li>ศูนย์บริการ สาขา</li>
                </ul>
              </li>
              <li>
                โปรโมชั่น
                <ul>
                  <li>ฟรีบริการติดตั้ง </li>
                  <li>(ความครอบคลุมและเงื่อนไข)</li>
                  <li>คูปองส่วนลด</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>
                ความรู้ด้านเทคนิค
                <ul>
                  <li>ระบบการชำระล้าง</li>
                  <li>เทคโนโลยี่ไฮยีนคลีน</li>
                  <li>อะควาเซรามิก</li>
                  <li>ขนาดท่อและแรงดันน้ำสำหรับสุขภัณฑ์</li>
                  <li>การแก้ไขปัญหาผลิตภัณฑ์</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>การบำรุงรักษาและการแก้ไขปัญหา</li>
              <li>การติดตั้ง</li>
              <li>อะไหล่</li>
              <li>การรับประกัน</li>
              <li>สมาชิกการบริการ</li>
            </ul>
          </div>
        </div> */}
        <div className="logo-footer d-flex mt-4">
          <div className="ml-auto">
            <img src={logoFooter} />
          </div>
        </div>
      </div>
    </footer>
  );
}
