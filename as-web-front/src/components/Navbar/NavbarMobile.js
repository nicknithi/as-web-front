/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../assets/scss/components/navbar.scss";
import logo from "../../assets/img/Logo_300ppi.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
export default function NavbarMobile({ NavbarItem }) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  useEffect(() => {
    responsive();
    window.addEventListener("resize", () => {
      responsive();
    });
  }, []);
  const changToThai = () => {
    i18n.changeLanguage("th");
    setCookie("as_lang", "TH", {
      path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
    });
    window.location = "หน้าแรก";
    // window.location.reload(false);
  };
  const changToEng = () => {
    i18n.changeLanguage("en");
    setCookie("as_lang", "EN", {
      path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
    });
    window.location = "home";
    // window.location.reload(false);
  };
  const responsive = () => {
    if (window.innerWidth < 992) {
      const navMobile = document.querySelector(".navbar-mobile").clientHeight;
      document.querySelector("header").style.height = `${navMobile}px`;
    } else {
      document.querySelector("header").style.height = `auto`;
    }
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
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="navbar-mobile d-lg-none"
    >
      <Navbar.Brand onClick={() => goBack()} className="mr-0">
        <img src={logo} alt="logo" className="img-fluid" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <div className="nav-lang-mobile mt-2 ml-3">
          <button onClick={() => changToThai()}>TH</button> |
          <button onClick={() => changToEng()}>EN</button>
        </div>
        <Nav>
          <Accordion defaultActiveKey={1}>
            {NavbarItem.map((item, index) => (
              <Card>
                {item.subMenu.length > 0 ? (
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={index + 1}
                    className="item-menu has-sub-menu"
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
