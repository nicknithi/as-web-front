/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../assets/scss/footer.scss";
import { useCookies } from "react-cookie";
import logoFooter from "../assets/img/Logo2INAX.png";
import { getMenuAll } from "../GetDataMenu";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function Footer() {
  function RendersubMenu(dataList) {
    console.log("data2131,", dataList);
    return (
      <ul>
        {dataList.subMenu.map((item, index) => (
          <li>
            <a href={item.link}>{item.menu}</a>
          </li>
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
        <div className="footer-menu d-none d-lg-block">
          {NavbarData.map((item, index) => (
            <div>
              {item.subMenu.length > 0 ? (
                <div>{item.menu}</div>
              ) : (
                <a href={item.link}>{item.menu}</a>
              )}

              <div>{item.subMenu.length > 0 && RendersubMenu(item)}</div>
            </div>
          ))}
        </div>
        <div className="footer-mobile d-lg-none">
          <Accordion defaultActiveKey={1}>
            {NavbarData.map((item, index) => (
              <Card>
                {item.subMenu.length > 0 ? (
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={index + 1}
                    className="item-menu"
                  >
                    {item.menu}
                  </Accordion.Toggle>
                ) : (
                  <div className="item-menu card-header">
                    <a href={item.link}>{item.menu}</a>
                  </div>
                )}

                {item.subMenu.length > 0 && (
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body>
                      {item.subMenu.map((item, index) => (
                        <div className="item-sub-menu card-header border-0">
                          <a href={item.link}>{item.menu}</a>
                        </div>
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                )}
              </Card>
            ))}
          </Accordion>
        </div>

        <div className="logo-footer d-flex mt-4">
          <div className="ml-auto">
            <img src={logoFooter} className="img-fluid" />
          </div>
        </div>
      </div>
    </footer>
  );
}
