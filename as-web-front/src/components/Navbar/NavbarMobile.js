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
  }, []);
  const responsive = () => {
    const navMobile = document.querySelector(".navbar-mobile").clientHeight;
    document.querySelector("header").style.height = `${navMobile}px`;
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="navbar-mobile d-md-none"
    >
      <Navbar.Brand href="/">
        <img src={logo} alt="logo" className="img-fluid" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Accordion defaultActiveKey={1}>
            {NavbarItem.map((item, index) => (
              <Card>
                {item.subMenu.length > 0 ? (
                  <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                    {item.menu}
                  </Accordion.Toggle>
                ) : (
                  <a href={item.link}>{item.menu}</a>
                )}

                {item.subMenu.length > 0 && (
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body>
                      {item.subMenu.map((item, index) => (
                        <a href={item.link}>{item.menu}</a>
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
    // <div className="navbar-mobile d-flex align-items-center p-3 d-md-none">
    //   <a href="/">
    //     <img src={logo} alt="logo" className="img-fluid" />
    //   </a>
    //   <div className="menu">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="35"
    //       height="35"
    //       fill="currentColor"
    //       class="bi bi-list"
    //       viewBox="0 0 16 16"
    //     >
    //       <path
    //         fill-rule="evenodd"
    //         d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    //       />
    //     </svg>
    //   </div>
    // </div>
  );
}
