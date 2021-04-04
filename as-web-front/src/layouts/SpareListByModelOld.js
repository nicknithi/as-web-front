/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/scss/installation.scss";
import CardInstallation from "../components/Card/CardInstallation";
import SubMenu from "../components/installation/SubMenu";
import InputSearch from "../components/Input/InputSearch";
import BannerInstallation from "../components/Banner/BannerInstallation";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import ElementBanner from "../components/Content/ElementBanner";

import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
} from "../GetProduct";
export default function Installation({ data, getBannerContent }) {
  const { search } = useLocation();
  const query = queryString.parse(search);

  const [menuSpare, setMenuSpare] = useState([]);
  const [SpareList, setSpareList] = useState([]);
  useEffect(async () => {
    const resSpareModel = await GetAllProductModelSpare();
    let MenuSpare = resSpareModel.map((item, index) => {
      return { title: item.name, classified1: [] };
    });
    let resClassType = await GetAllClassifiedTypeSpare();
    resClassType = resClassType.map((item, index) => {
      return { ...item, title: item.name };
    });
    MenuSpare = MenuSpare.map((item, index) => {
      return { ...item, classified1: resClassType };
    });
    console.log("MenuSpare", MenuSpare);
    let TempMenu = [...menuSpare];
    TempMenu = MenuSpare;
    setMenuSpare(TempMenu);

    let dataProduct = await GetAllProduct_SparepartList();
    console.log("dataProduct");
    dataProduct = dataProduct.map((item, index) => {
      return { ...item, title: item.product_name };
    });
    if (query.id) {
      dataProduct = dataProduct.filter((p) => p.product_model === query.id);
    }

    let TempSpare = [...SpareList];
    TempSpare = dataProduct;
    setSpareList(TempSpare);
  }, []);
  console.log("5555555555555k", getBannerContent(data));
  return (
    <div>
      <ElementBanner img={getBannerContent(data)} />
      <div className="container mb-5">
        <div className="row mb-3 pt-3 as-border-top">
          <div className="col-md-9">
            <h2 className=" p-0">วิธีการติดตั้ง</h2>
          </div>
          <div className="col-md-3">
            <InputSearch />
          </div>
        </div>
        <div className="installation-container">
          <div className="row">
            <div className="col-md-4">
              {menuSpare.length && (
                <Accordion defaultActiveKey={1}>
                  {menuSpare.map((item, index) => (
                    <Card>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={index + 1}
                        className="p-0 d-flex"
                      >
                        <span className="text-truncate">{item.title}</span>
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
                          <SubMenu menu={item.classified1} />
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
              )}
            </div>
            <div className="col-md-8">
              <h3 className="title-section">วิธีการติดตั้ง</h3>
              <div className="row">
                {SpareList.length > 0 && (
                  <>
                    {SpareList.map((item, index) => (
                      <a
                        href={`/SpareDetail?id=${item.id}`}
                        className="col-md-4 px-2"
                      >
                        <CardInstallation data={item} />
                      </a>
                    ))}
                  </>
                )}

                {/* <div className="col-md-4 px-2">
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
             </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}