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
export default function NavbarMobile({ NavbarItem }) {
  useEffect(() => {
    responsive();
    window.addEventListener("resize", () => {
      responsive();
    });
  }, []);
  const responsive = () => {
    if (window.innerWidth < 992) {
      const navMobile = document.querySelector(".navbar-mobile").clientHeight;
      document.querySelector("header").style.height = `${navMobile}px`;
    } else {
      document.querySelector("header").style.height = `auto`;
    }
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="navbar-mobile d-lg-none"
    >
      <Navbar.Brand href="/" className="mr-0">
        <img src={logo} alt="logo" className="img-fluid" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Accordion defaultActiveKey={1}>
            {NavbarItem.map((item, index) => (
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
