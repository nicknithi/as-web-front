import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/scss/installation.scss";
import CardInstallation from "../components/Card/CardInstallation";
import SubMenu from "../components/installation/SubMenu";
import InputSearch from "../components/Input/InputSearch";
import BannerInstallation from "../components/Banner/BannerInstallation";

import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
} from "../GetProduct";
export default function Installation() {
  useEffect(async () => {
    const resSpareModel = await GetAllProductModelSpare();
    const resClassType = await GetAllClassifiedTypeSpare();
  }, []);
  const data = [
    {
      title: "วิธีการติดตั้งโถสุขภัณฑ์",
      subMenu: [
        {
          title: "โถสุขภัณฑ์แบบตั้งพื้นชิดผนัง",
          subMenu: [
            { title: "ปริมาตรน้ำ 3/4.5 ลิตร" },
            { title: "ปริมาตรน้ำ 3.8 ลิตร" },
            { title: "ปริมาตรน้ำ 6 ลิตร" },
          ],
        },
        {
          title: "โถสุขภัณฑ์แบบตั้งพื้นชิดผนัง",
          subMenu: [
            { title: "ปริมาตรน้ำ 3/4.5 ลิตร" },
            { title: "ปริมาตรน้ำ 3.8 ลิตร" },
            { title: "ปริมาตรน้ำ 6 ลิตร" },
          ],
        },
      ],
    },
    {
      title: "วิธีการติดตั้งฝารองนั่ง",
      subMenu: [
        {
          title: "โถสุขภัณฑ์แบบตั้งพื้นชิดผนัง",
          subMenu: [
            { title: "ปริมาตรน้ำ 3/4.5 ลิตร" },
            { title: "ปริมาตรน้ำ 3.8 ลิตร" },
            { title: "ปริมาตรน้ำ 6 ลิตร" },
          ],
        },
      ],
    },
    {
      title: "วิธีการติดตั้งอ่างล้างหน้า",
      subMenu: [
        {
          title: "โถสุขภัณฑ์แบบตั้งพื้นชิดผนัง",
          subMenu: [
            { title: "ปริมาตรน้ำ 3/4.5 ลิตร" },
            { title: "ปริมาตรน้ำ 3.8 ลิตร" },
            { title: "ปริมาตรน้ำ 6 ลิตร" },
          ],
        },
      ],
    },
  ];
  return (
    <div className="container mb-5">
      {/* <BannerInstallation className="banner-installation" /> */}
      <div className="row mb-3 pt-3 as-border-top">
        <div className="col-md-10">
          <h2 className="font-weight-bold p-0">วิธีการติดตั้ง</h2>
        </div>
        <div className="col-md-2">
          <InputSearch />
        </div>
      </div>
      <div className="installation-container">
        <div className="row">
          <div className="col-md-4">
            <Accordion defaultActiveKey={1}>
              {data.map((item, index) => (
                <Card>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={index + 1}
                    className="p-0 d-flex"
                  >
                    <span>{item.title}</span>
                    <button className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </button>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index + 1}>
                    <Card.Body className="p-0">
                      <SubMenu menu={item.subMenu} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
              {/* 
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card> */}
            </Accordion>
          </div>
          <div className="col-md-8">
            <h3 className="title-section">วิธีการติดตั้ง</h3>
            <div className="row">
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
