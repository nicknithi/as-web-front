import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../assets/scss/installation.scss";
import CardInstallation from "../Card/CardInstallation";
import SubMenu from "../installation/SubMenu";
import InputSearch from "../Input/InputSearch";
import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
} from "../../GetProduct";
export default function SpareMenu({ SpareList, SpateDetail, typePage }) {
  const [menuSpareRender, setMenuSpareRender] = useState([]);
  const [ActiveRelate, setActiveRelate] = useState(1);
  useEffect(async () => {
    const resSpareList = await GetAllProduct_SparepartList();
    const resSpareModel = await GetAllProductModelSpare();

    let MenuSpare = resSpareModel.map((item, index) => {
      const filterModel = resSpareList.filter(
        (s) => s.product_model === item.name
      );
      if (filterModel.length > 0) {
        return { title: item.name, classified1: [], product: filterModel };
      } else {
        return { title: item.name, classified1: [], product: [] };
      }
    });

    MenuSpare = MenuSpare.map((item, index) => {
      const arrayTemp = [];
      if (item.product.length > 0) {
        let tempProduct = item.product[0].product_type;
        arrayTemp.push(item.product[0].product_type);
        item.product.forEach((itemPD, index) => {
          if (itemPD.product_type !== tempProduct) {
            arrayTemp.push(itemPD.product_type);
            tempProduct = item.product_type;
          }
        });
      }

      return { ...item, product: arrayTemp };
    });
    let TempMenu = [...menuSpareRender];
    TempMenu = MenuSpare;
    setMenuSpareRender(TempMenu);
    console.log("123123123123555", TempMenu);
  }, []);
  const setLink = (item) => {
    if (typePage === "Spare") {
      return `/SpareListByModel?id=${item.product[0]}`;
    } else if (typePage === "SpareListByModel") {
      return `/SpareDetail?id=${item.id}`;
    }
  };
  const contentTitle = () => {
    if (typePage === "Spare") {
      return "รายการอะไหล่";
    } else if (typePage === "SpareListByModel") {
      return "";
    }
  };
  const setActiveMenu = (menu) => {
    setActiveRelate(menu);
  };
  const isActive = (menu) => {
    if (ActiveRelate === menu) {
      return "active";
    }
    return "";
  };
  return (
    <div className="container mb-5">
      {/* <BannerInstallation className="banner-installation" /> */}
      <div className="row mb-3 pt-3">
        <div className="col-md-10">
          <h2 className="font-weight-bold p-0">อะไหล่</h2>
        </div>
        <div className="col-md-2">
          <InputSearch />
        </div>
      </div>
      <div className="installation-container">
        <div className="row">
          <div className="col-md-4">
            {menuSpareRender.length > 0 && (
              <Accordion defaultActiveKey={1}>
                {menuSpareRender.map((item, index) => (
                  <Card>
                    {item.product.length > 0 && (
                      <>
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
                            <SubMenu menu={item.product} />
                          </Card.Body>
                        </Accordion.Collapse>
                      </>
                    )}
                  </Card>
                ))}
              </Accordion>
            )}
          </div>
          <div className="col-md-8">
            <h3 className="title-section">{contentTitle()}</h3>
            <div className="row">
              {typePage === "Spare" ? (
                <>
                  {menuSpareRender.length > 0 && (
                    <>
                      {menuSpareRender.map((item, index) => (
                        <>
                          {item.product.length > 0 && (
                            <>
                              <a href={setLink(item)} className="col-md-4 px-2">
                                <CardInstallation data={item} />
                              </a>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {SpareList.length > 0 && (
                    <>
                      {SpareList.map((item, index) => (
                        <a href={setLink(item)} className="col-md-4 px-2">
                          <CardInstallation data={item} />
                        </a>
                      ))}
                    </>
                  )}
                </>
              )}

              {typePage === "SpareDetail" && (
                <div className="container product-detail">
                  {Object.keys(SpateDetail).length > 0 && (
                    <div>
                      {SpateDetail.product_name && (
                        <h3 className="title">{SpateDetail.product_name}</h3>
                      )}

                      <div className="row">
                        <div className="col-md-5">
                          {SpateDetail.file.length > 0 && (
                            <div className="img-detail">
                              <img
                                src={`http://www.mostactive.info/${SpateDetail.file[0].path}`}
                              />
                            </div>
                          )}
                        </div>
                        <div className="col-md-7">
                          <div className="detail p-3">
                            {SpateDetail.product_code && (
                              <label>
                                รหัส
                                <span className="ml-2">
                                  {SpateDetail.product_code}
                                </span>
                              </label>
                            )}
                            <br />
                            {SpateDetail.product_name && (
                              <label>
                                ชื่อสินค้า
                                <span className="ml-2">
                                  {SpateDetail.product_name}
                                </span>
                              </label>
                            )}
                            <br />
                            {SpateDetail.model && SpateDetail.model.label && (
                              <label>
                                ชื่อรุ่น
                                <span className="ml-2">
                                  {SpateDetail.model.label}
                                </span>
                              </label>
                            )}
                            <div className="relate-menu">
                              <button
                                className={`${isActive(1)} `}
                                onClick={() => setActiveMenu(1)}
                              >
                                วิธีติดตั้ง
                              </button>
                              <button
                                className={`${isActive(2)}`}
                                onClick={() => setActiveMenu(2)}
                              >
                                ชิ้นส่วนอะไหล่
                              </button>
                              <button
                                className={`${isActive(3)}`}
                                onClick={() => setActiveMenu(3)}
                              >
                                คลิปวิดีโอ
                              </button>
                            </div>
                          </div>

                          <br />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {typePage === "SpareDetail" && Object.keys(SpateDetail).length > 0 && (
              <div className="relate-contet">
                <div className={`${isActive(1)}`}>วิธีติดตั้ง</div>
                <div className={`${isActive(2)}`}>
                  {SpateDetail.file.length > 0 && (
                    <>
                      {SpateDetail.file.map((item, index) => (
                        <div className="col-md-4">
                          <img
                            src={`http://www.mostactive.info/${item.path}`}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className={`${isActive(3)}`}>คลิปวิดีโอ</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
