/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import noImg from "../../assets/img/noImg.jpg";
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
  const [DataMenu, setDataMenu] = useState([]);
  const [t, i18n] = useTranslation("common");
  const [menuSpareRender, setMenuSpareRender] = useState([]);
  const [ContentRender, setContentRender] = useState([]);
  const [SpateDetail, setSpateDetail] = useState({});
  const [ActiveRelate, setActiveRelate] = useState(0);
  const [ActiveModel, setActiveModel] = useState(0);
  const [ActiveClass1, setActiveClass1] = useState(0);
  const [ActiveClass2, setActiveClass2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState(t("spare.titleList"));
  const imgProductDetail = useRef(null);
  const { search } = useLocation();
  const query = queryString.parse(search);
  useEffect(async () => {
    setTitle(t("spare.titleList"));
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    const resMenu = await GetAllMenuProduct_Sparepart(lang);
    setDataMenu(resMenu);
    console.log("Menu spare", resMenu);
    let tempMenu = [...menuSpareRender];
    tempMenu = resMenu;
    setMenuSpareRender(tempMenu);

    const TempModelRender = tempMenu.map((item, index) => {
      return {
        ...item,
        id: item.model_id,
        title: item.model_name,
        product_picture: [{ path: item.model_cover }],
        type: "model",
      };
    });
    setContentRender(TempModelRender);
    if (query.code) {
      // handleClickCard(query.id, "classified1");
      initFromQuery(query.code);
    }
  }, []);
  const isActiveModel = (id) => {
    if (ActiveModel === id) {
      return "active";
    }
    return "";
  };
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
  const handleClickMenuModel = (id) => {
    setActiveModel(id);
  };
  const handleClickClassified = async (id, name) => {
    setLoading(true);
    setSpateDetail({});
    setTitle(name);
    setActiveClass1(id);
    setActiveClass2(0);
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
        product_old_code: item.product_old_code,
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
    //set Active
    setActiveClass2(id);
    let resMenu = DataMenu;
    resMenu.forEach((item, index) => {
      item.classified.forEach((item1, index1) => {
        const result = item1.sub_classified.find(
          (c2) => c2.sub_classified_id === id
        );
        if (result && Object.keys(result).length > 0) {
          setTitle(`${item1.classified_name} / ${name}`);
          setActiveClass1(item1.classified_id);
          return false;
        }
      });
    });
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
  const HandleClickCard = async (id, type) => {
    setLoading(true);
    if (type === "model") {
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      let resMenu = [];
      resMenu = DataMenu.find((m) => m.model_id === id);

      if (resMenu.classified.length > 0) {
        //set active menu
        setActiveClass1(resMenu.classified[0].classified_id);
        document.querySelector(`#menu_${id}`).click();
        setTitle(resMenu.classified[0].classified_name);
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
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      // let resMenu = await GetAllMenuProduct_Sparepart(lang);
      // // resMenu = resMenu.filter((m) =>
      // //   m.classified.filter((c1) =>
      // //     c1.sub_classified.filter((c2) => c2.sub_classified_id === id)
      // //   )
      // // );
      // resMenu.forEach((item, index) => {
      //   item.classified.forEach((item1, index1) => {
      //     const result = item1.sub_classified.find(
      //       (c2) => c2.sub_classified_id === id
      //     );
      //     if (result && Object.keys(result).length > 0) {
      //       return false;
      //     }
      //   });
      // });

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
      setTimeout(() => {
        document.getElementById("spareDetail").scrollIntoView();
        setActiveRelate(2);
      }, 1000);
    } else {
      alert("not found data");
    }
  };
  return (
    <div className="container mb-5">
      {/* <BannerInstallation className="banner-installation" /> */}
      <div className="row mb-3 pt-3">
        <div className="col-md-10">
          <h2 className="p-0">{t("spare.title")}</h2>
        </div>
        <div className="col-md-2">{/* <InputSearch /> */}</div>
      </div>
      <div className="installation-container under-line mb-4 pb-4">
        <div className="row">
          <div className="col-md-4">
            {menuSpareRender.length > 0 && (
              <Accordion defaultActiveKey={0}>
                {menuSpareRender.map((item, index) => (
                  <Card>
                    {item && (
                      <>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={item.model_id}
                          className={`p-0 d-flex ${isActiveModel(
                            item.model_id
                          )}`}
                          id={`menu_${item.model_id}`}
                          onClick={() => handleClickMenuModel(item.model_id)}
                        >
                          <span className="">{item.model_name}</span>
                          <button className="ml-auto"></button>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item.model_id}>
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
          <div className="col-md-8 mt-4 mt-md-0 " id="spareDetail">
            <h3 className="title-section mb-5">{Title}</h3>
            {Object.keys(SpateDetail).length > 0 ? (
              <div className="product-detail">
                <div>
                  {/* {SpateDetail.product_name && (
                    <h3 className="title">{SpateDetail.product_name}</h3>
                  )} */}
                  <div className="row">
                    <div className="col-md-5">
                      {SpateDetail.sparepart_product_picture.length > 0 ? (
                        <div className="img-detail">
                          <img
                            ref={imgProductDetail}
                            src={`http://www.mostactive.info/${SpateDetail.sparepart_product_picture[0].path}`}
                            onError={() => {
                              imgProductDetail.current.src = noImg;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="img-detail">
                          <img src={noImg} />
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
                            <span
                              className={`ml-2 status ${
                                SpateDetail.active ? "" : "discon"
                              }`}
                            >
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
                <div className="relate-contet mt-2 mt-md-5">
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
                              <div className="col-6 col-md-4 px-md-2">
                                <CardInstallation
                                  data={item}
                                  handleClickCard={HandleClickCard}
                                />
                              </div>
                            </>
                          ))}
                        </>
                      ) : (
                        <div className="d-flex justify-content-center w-100 mt-4">
                          <h3 className="">Not Found</h3>
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
