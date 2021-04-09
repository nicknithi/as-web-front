/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../assets/scss/installation.scss";
import CardInstallation from "../Card/CardInstallation";
import SpareSubMenu from "../spare/SpareSubMenu";
import InputSearch from "../Input/InputSearch";
import LoadingContent from "../LoadingContent";
import ItemSpare from "../spare/ItemSpare";
import ButtonMain from "../button/ButtonMain";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import {
  GetManageProductSparePartById,
  GetAllMenuProduct_Sparepart,
  GetDataProduct_SparepartByClassified1,
  GetDataProduct_SparepartByClassified2,
  GetManageProductSparePartByCode,
} from "../../GetProduct";
export default function SpareMenu() {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  const [menuSpareRender, setMenuSpareRender] = useState([]);
  const [ContentRender, setContentRender] = useState([]);
  const [SpateDetail, setSpateDetail] = useState({});
  const [ActiveRelate, setActiveRelate] = useState(0);
  const [ActiveClass1, setActiveClass1] = useState(0);
  const [ActiveClass2, setActiveClass2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState("รายการอะไหล่");

  const { search } = useLocation();
  const query = queryString.parse(search);
  useEffect(async () => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    const resMenu = await GetAllMenuProduct_Sparepart(lang);
    console.log("Menu spare", resMenu);
    let tempMenu = [...menuSpareRender];
    tempMenu = resMenu;
    setMenuSpareRender(tempMenu);

    const TempModelRender = tempMenu.map((item, index) => {
      return {
        ...item,
        id: item.model_id,
        title: item.model_name,
        type: "model",
      };
    });
    setContentRender(TempModelRender);
    if (query.code) {
      // handleClickCard(query.id, "classified1");
      initFromQuery(query.code);
    }
  }, []);
  const isActiveClass1 = (id) => {
    if (ActiveClass1 === id) {
      return "active";
    }
    return "";
  };
  const isActiveClass2 = (id) => {
    if (ActiveClass2 === id) {
      return "active";
    }
    return "";
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
  const handleClickClassified = async (id, name) => {
    setLoading(true);
    setSpateDetail({});
    setTitle(name);
    setActiveClass1(id);
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    let resClassified1 = await GetDataProduct_SparepartByClassified1(id, lang);
    console.log("class1 id", id);
    console.log("resClass2", resClassified1);
    let tempClassified1 = [...ContentRender];

    tempClassified1 = resClassified1 ? resClassified1 : [];
    tempClassified1 = tempClassified1.map((item, index) => {
      return {
        ...item,
        id: item.product_id,
        title: item.product_name,
        product_picture: item.product_picture,
        type: "classified1",
      };
    });
    setContentRender(tempClassified1);
    setLoading(false);
  };
  const handleClickClassified2 = async (id, name) => {
    setLoading(true);
    setSpateDetail({});
    const tempTitle = Title.split("/")[0];
    setTitle(`${tempTitle} / ${name}`);
    setActiveClass2(id);
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    let resClassified2 = await GetDataProduct_SparepartByClassified2(id, lang);
    console.log("class1 id", id);
    console.log("resClass2", resClassified2);
    let tempClassified2 = [...ContentRender];

    tempClassified2 = resClassified2 ? resClassified2 : [];
    tempClassified2 = tempClassified2.map((item, index) => {
      return {
        ...item,
        id: item.product_id,
        title: item.product_name,
        product_picture: item.product_picture,
        type: "classified2",
      };
    });
    setContentRender(tempClassified2);
    setLoading(false);
  };
  const handleClickCard = async (id, type) => {
    setLoading(true);
    if (type === "model") {
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      let resMenu = await GetAllMenuProduct_Sparepart(lang);
      resMenu = resMenu.find((m) => m.model_id === id);

      if (resMenu.classified.length > 0) {
        let tempindex = 0;
        let resClassified1 = await GetDataProduct_SparepartByClassified1(
          resMenu.classified[0].classified_id,
          lang
        );
        setTitle(resMenu.classified[0].classified_name);
        let tempClassified1 = [...ContentRender];
        tempClassified1 = resClassified1;
        tempClassified1 = tempClassified1.map((item, index) => {
          return {
            ...item,
            id: item.product_id,
            title: item.product_name,
            type: "classified1",
          };
        });

        setContentRender(tempClassified1);
      }
    } else if (type === "classified1") {
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      const ProductClass1 = await GetManageProductSparePartById(id, lang);
      if (ProductClass1) {
        let temp = { ...SpateDetail };
        temp = ProductClass1;
        setSpateDetail(temp);
      } else {
        alert("not found data");
      }
    } else if (type === "classified2") {
      // let resMenu = await GetAllMenuProduct_Sparepart();
      // resMenu = resMenu.filter((m) => {
      //   return m.classified.filter((c1) => {
      //     return c1.sub_classified.filter((c2) => {
      //       return c2.sub_classified_id === id;
      //     });
      //   });
      // });
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      const ProductClass2 = await GetManageProductSparePartById(id, lang);
      if (ProductClass2) {
        let temp = { ...SpateDetail };
        temp = ProductClass2;
        setSpateDetail(temp);
      } else {
        alert("not found data");
      }
    }
    setLoading(false);
  };
  const goBack = () => {
    if (ContentRender[0].type === "model") {
      window.location = "/";
    } else {
      window.location.reload(false);
    }
  };
  const initFromQuery = async (code) => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    const ProductClass1 = await GetManageProductSparePartByCode(code, lang);
    if (ProductClass1) {
      let temp = { ...SpateDetail };
      temp = ProductClass1;
      setSpateDetail(temp);
    } else {
      alert("not found data");
    }
  };
  return (
    <div className="container mb-5">
      {/* <BannerInstallation className="banner-installation" /> */}
      <div className="row mb-3 pt-3">
        <div className="col-md-10">
          <h2 className="p-0"></h2>
        </div>
        <div className="col-md-2">{/* <InputSearch /> */}</div>
      </div>
      <div className="installation-container">
        <div className="row">
          <div className="col-md-4">
            {menuSpareRender.length > 0 && (
              <Accordion defaultActiveKey={1}>
                {menuSpareRender.map((item, index) => (
                  <Card>
                    {item && (
                      <>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={index + 1}
                          className="p-0 d-flex"
                        >
                          <span className="text-wrap">{item.model_name}</span>
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
                            <SpareSubMenu
                              menu={item.classified}
                              isActiveClass1={isActiveClass1}
                              isActiveClass2={isActiveClass2}
                              handleClickClassified={handleClickClassified}
                              handleClickClassified2={handleClickClassified2}
                            />
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
            <h3 className="title-section">{Title}</h3>
            {Object.keys(SpateDetail).length > 0 ? (
              <div className="container product-detail">
                <div>
                  {/* {SpateDetail.product_name && (
                    <h3 className="title">{SpateDetail.product_name}</h3>
                  )} */}
                  <div className="row">
                    <div className="col-md-5">
                      {SpateDetail.sparepart_product_picture.length > 0 && (
                        <div className="img-detail">
                          <img
                            src={`http://www.mostactive.info/${SpateDetail.sparepart_product_picture[0].path}`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-md-7">
                      <div className="detail p-3">
                        {SpateDetail.product_old_code && (
                          <label>
                            {t("Product.code")}
                            <span className="ml-2">
                              {SpateDetail.product_old_code}
                            </span>
                          </label>
                        )}
                        <br />
                        {SpateDetail.product_name && (
                          <label>
                            {t("Product.ProductName")}
                            <span className="ml-2">
                              {SpateDetail.product_name}
                            </span>
                          </label>
                        )}
                        {/* <br />
                        {SpateDetail.model && SpateDetail.model.label && (
                          <label>
                            {t("Product.ProductName")}
                            <span className="ml-2">
                              {SpateDetail.model.label}
                            </span>
                          </label>
                        )} */}
                        <br />
                        {SpateDetail.active !== null && (
                          <label>
                            {t("Product.Status")}
                            <span className="ml-2">
                              {SpateDetail.active ? "Active" : "Discontinuted"}
                            </span>
                          </label>
                        )}
                        <div className="relate-menu">
                          <a
                            className={`${isActive(1)} mr-3`}
                            href={`/การติดตั้ง?id=${SpateDetail.id}&code=${SpateDetail.product_old_code}`}
                            // onClick={() => setActiveMenu(1)}
                          >
                            {t("Product.installation")}
                          </a>
                          {SpateDetail.sparepart.length > 0 && (
                            <button
                              className={`${isActive(2)}`}
                              onClick={() => setActiveMenu(2)}
                            >
                              {t("Product.spare")}
                            </button>
                          )}
                          {/* <button
                            className={`${isActive(3)}`}
                            onClick={() => setActiveMenu(3)}
                          >
                            {t("Product.video")}
                          </button> */}
                        </div>
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
                <div className="relate-contet mt-5">
                  <div className={`${isActive(2)}`}>
                    <div className="row">
                      {SpateDetail.sparepart.map((item, index) => (
                        <ItemSpare data={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <>
                  {loading ? (
                    <LoadingContent />
                  ) : (
                    <>
                      {ContentRender.length > 0 ? (
                        <>
                          {ContentRender.map((item, index) => (
                            <>
                              <div className="col-6 col-md-4 px-2">
                                <CardInstallation
                                  data={item}
                                  handleClickCard={handleClickCard}
                                />
                              </div>
                            </>
                          ))}
                        </>
                      ) : (
                        <div className="d-flex justify-content-center w-100 ">
                          <h1 className="">Not Found</h1>
                        </div>
                      )}
                    </>
                  )}
                </>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center mb-5">
          <ButtonMain
            title={t("website.btnBack")}
            color="#636363"
            BgColor="#f1c400"
            handleClick={() => {
              goBack();
            }}
          />
        </div>
      </div>
    </div>
  );
}
