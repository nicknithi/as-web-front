/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import noImg from "../../assets/img/noImg.jpg";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonMain from "../button/ButtonMain";
import "../../assets/scss/installation.scss";
import CardInstallation from "../Card/CardInstallation";
import SubMenu from "../installation/SubMenu";
import InputSearch from "../Input/InputSearch";
import LoadingContent from "../LoadingContent";
import ItemSpare from "../spare/ItemSpare";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  GetManageProductSparePartById,
  GetManageProductInstallationById,
  GetAllMenuProduct_Installation,
  GetDataProduct_InstallationByClassified1,
  GetDataProduct_InstallationByClassified2,
  GetManageProductInstallationByCode,
  GetSearchProduct_SparepartList,
} from "../../GetProduct";
export default function InstallationMenu() {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  let { customPath, langContent } = useParams();
  const [DataMenu, setDataMenu] = useState([]);
  const [menuSpareRender, setMenuSpareRender] = useState([]);
  const [ContentRender, setContentRender] = useState([]);
  const [SpateDetail, setSpateDetail] = useState({});
  const [ActiveRelate, setActiveRelate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ActiveModel, setActiveModel] = useState(0);
  const [ActiveClass1, setActiveClass1] = useState(0);
  const [ActiveClass2, setActiveClass2] = useState(0);
  const { search } = useLocation();
  const [Title, setTitle] = useState(t("installation.title"));
  const query = queryString.parse(search);
  const imgProductDetail = useRef(null);
  useEffect(async () => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    let resMenu = await GetAllMenuProduct_Installation(lang);
    resMenu = resMenu.filter((item, index) => {
      return item.installation_classified.length > 0;
    });
    let tempMenu = [...menuSpareRender];
    tempMenu = resMenu;
    if (resMenu) {
      setDataMenu(resMenu);
      setMenuSpareRender(tempMenu);

      const TempModelRender = tempMenu.map((item, index) => {
        return {
          ...item,
          id: item.installation_model_id,
          title: item.installation_model_name,
          product_picture: [{ path: item.installation_model_cover }],
          type: "model",
        };
      });
      setContentRender(TempModelRender);
    }
    //on init get product from query
    if (query.code) {
      // handleClickCard(query.id, "classified1");
      initFromQuery(query.code);
    }
    setTitle(t("installation.titleList"));
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
    if (ActiveRelate === menu) {
      setActiveRelate(0);
    } else {
      setActiveRelate(menu);
    }
  };
  const isActive = (menu) => {
    if (ActiveRelate === menu) {
      return "active";
    }
    return "";
  };
  const searchSpare = async (KeySearch) => {
    setLoading(true);
    setSpateDetail({});
    setTitle("Search");
    // setActiveClass1(id);
    // setActiveClass2(0);
    let res = await GetSearchProduct_SparepartList(KeySearch);
    let tempSearch = [...ContentRender];
    tempSearch = res.result_installation.length ? res.result_installation : [];
    tempSearch = tempSearch.map((item, index) => {
      return {
        ...item,
        id: item.installation_product_id,
        title: item.installation_product_name,
        product_picture: item.installation_product_picture,
        product_old_code: item.installation_product_old_code,
        type: "classified1",
      };
    });
    setContentRender(tempSearch);
    setLoading(false);
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
    let resClassified1 = await GetDataProduct_InstallationByClassified1(
      id,
      lang
    );
    let tempClassified1 = [...ContentRender];
    tempClassified1 = resClassified1 ? resClassified1 : [];
    tempClassified1 = tempClassified1.map((item, index) => {
      return {
        ...item,
        id: item.installation_product_id,
        title: item.installation_product_name,
        product_picture: item.installation_product_picture,
        product_old_code: item.installation_product_old_code,
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
    let resMenu = DataMenu;
    resMenu.forEach((item, index) => {
      item.installation_classified.forEach((item1, index1) => {
        const result = item1.installation_sub_classified.find(
          (c2) => c2.installation_sub_classified_id === id
        );
        if (result && Object.keys(result).length > 0) {
          setTitle(`${item1.installation_classified_name} / ${name}`);
          setActiveClass1(item1.installation_classified_id);
          return false;
        }
      });
    });
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    let resClassified2 = await GetDataProduct_InstallationByClassified2(
      id,
      lang
    );
    let tempClassified2 = [...ContentRender];
    tempClassified2 = resClassified2 ? resClassified2 : [];
    tempClassified2 = tempClassified2.map((item, index) => {
      return {
        ...item,
        id: item.installation_product_id,
        title: item.installation_product_name,
        product_picture: item.installation_product_picture,
        product_old_code: item.installation_product_old_code,
        type: "classified2",
      };
    });
    setContentRender(tempClassified2);
    setLoading(false);
  };
  const handleClickCard = async (id, type) => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    setLoading(true);
    if (type === "model") {
      let resMenu = DataMenu;
      resMenu = resMenu.find((m) => m.installation_model_id === id);
      if (resMenu.installation_classified.length > 0) {
        let resClassified1 = await GetDataProduct_InstallationByClassified1(
          resMenu.installation_classified[0].installation_classified_id,
          lang
        );
        setActiveClass1(
          resMenu.installation_classified[0].installation_classified_id
        );
        //set Active menu
        document.querySelector(`#menu_${id}`).click();
        setTitle(
          resMenu.installation_classified[0].installation_classified_name
        );

        let tempClassified1 = [...ContentRender];
        if (resClassified1 && resClassified1.length) {
          tempClassified1 = resClassified1;
          tempClassified1 = tempClassified1.map((item, index) => {
            return {
              ...item,
              id: item.installation_product_id,
              title: item.installation_product_name,
              product_picture: item.installation_product_picture,
              product_old_code: item.installation_product_old_code,
              type: "classified1",
            };
          });
          setContentRender(tempClassified1);
        }
      }
    } else if (type === "classified1") {
      // const ProductClass1 = await GetManageProductSparePartById(id);
      let ProductClass1 = await GetManageProductInstallationById(id, lang);
      if (ProductClass1) {
        ProductClass1 = {
          ...ProductClass1,
          file: ProductClass1.installation_file,
          product_id: ProductClass1.installation_product_id,
          product_name: ProductClass1.installation_product_name,
          product_old_code: ProductClass1.installation_product_old_code,
          product_picture: ProductClass1.installation_product_picture,
        };
        let temp = { ...SpateDetail };
        temp = ProductClass1;
        setSpateDetail(temp);
      } else {
        let temp = { ...SpateDetail };
        temp = {};
        setSpateDetail(temp);
      }
    } else if (type === "classified2") {
      let ProductClass2 = await GetManageProductInstallationById(id, lang);
      ProductClass2 = {
        ...ProductClass2,
        file: ProductClass2.installation_file,
        product_id: ProductClass2.installation_product_id,
        product_name: ProductClass2.installation_product_name,
        product_old_code: ProductClass2.installation_product_old_code,
        product_picture: ProductClass2.installation_product_picture,
      };
      let temp = { ...SpateDetail };
      temp = ProductClass2;
      setSpateDetail(temp);
    }
    setLoading(false);
  };
  const initFromQuery = async (code) => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    let ProductClass1 = await GetManageProductInstallationByCode(code, lang);
    if (ProductClass1) {
      ProductClass1 = {
        ...ProductClass1,
        file: ProductClass1.installation_file,
        product_id: ProductClass1.installation_product_id,
        product_name: ProductClass1.installation_product_name,
        product_old_code: ProductClass1.installation_product_old_code,
        product_picture: ProductClass1.installation_product_picture,
      };
      let temp = { ...SpateDetail };
      temp = ProductClass1;
      setSpateDetail(temp);
      setActiveRelate(0);
      setTimeout(() => {
        document.getElementById("instalDetail").scrollIntoView();
        setActiveRelate(1);
      }, 1000);
    } else {
      let temp = { ...SpateDetail };
      temp = {};
      setSpateDetail(temp);
    }
  };
  const goBack = () => {
    if (ContentRender[0].type === "model") {
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      // window.location = `${process.env.REACT_APP_SUB_DIRECTORY}/${
      //   lang === 1 ? "หน้าแรก" : "home"
      // }`;
      window.history.back();
    } else {
      window.location.reload(false);
    }
  };
  return (
    <div className="container mb-5">
      {/* <BannerInstallation className="banner-installation" /> */}
      <div className="row mb-3 pt-3">
        <div className="col-md-10">
          <h2 className="p-0">{t("installation.title")}</h2>
        </div>
        <div className="col-md-2">
          <InputSearch handleSearch={searchSpare} />
        </div>
      </div>
      <div className="installation-container under-line mb-4 pb-4">
        <div className="row">
          <div className="col-md-4 d-flex flex-column">
            {menuSpareRender.length > 0 && (
              <Accordion defaultActiveKey={0} className="w-100 mb-auto">
                {menuSpareRender.map((item, index) => (
                  <Card>
                    {item.installation_classified.length > 0 && (
                      <>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={item.installation_model_id}
                          className={`p-0 d-flex ${isActiveModel(
                            item.installation_model_id
                          )}`}
                          id={`menu_${item.installation_model_id}`}
                          onClick={() =>
                            handleClickMenuModel(item.installation_model_id)
                          }
                        >
                          <span className="">
                            {item.installation_model_name}
                          </span>
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
                        <Accordion.Collapse
                          eventKey={item.installation_model_id}
                        >
                          <Card.Body className="p-0">
                            <SubMenu
                              menu={item.installation_classified}
                              handleClickClassified={handleClickClassified}
                              handleClickClassified2={handleClickClassified2}
                              isActiveClass1={isActiveClass1}
                              isActiveClass2={isActiveClass2}
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
          <div className="col-md-8 mt-4 mt-md-0" id="instalDetail">
            <h3 className="title-section">{Title}</h3>
            <div className="container mb-5">
              <div className="text-break">{t("installation.remark")}</div>
            </div>
            {Object.keys(SpateDetail).length > 0 ? (
              <div className="product-detail">
                <div>
                  <div className="row">
                    <div className="col-md-5">
                      {SpateDetail.product_picture.length > 0 ? (
                        <div className="img-detail">
                          <img
                            ref={imgProductDetail}
                            src={`${process.env.REACT_APP_DOMAIN_NAME}/${SpateDetail.product_picture[0].path}`}
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
                        {SpateDetail.installation_product_old_code && (
                          <label>
                            {t("Product.code")}
                            <span className="ml-2">
                              {SpateDetail.installation_product_old_code}
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
                        <br />
                        {/* {SpateDetail.model && SpateDetail.model.label && (
                          <label>
                            ชื่อรุ่น
                            <span className="ml-2">
                              {SpateDetail.model.label}
                            </span>
                          </label>
                        )} */}
                        <div className="relate-menu">
                          {SpateDetail.installation_file.length > 0 && (
                            <button
                              className={`${isActive(1)} mr-3`}
                              onClick={() => setActiveMenu(1)}
                            >
                              {t("Product.installation")}
                            </button>
                          )}
                          {SpateDetail.have_sparepart !== 0 && (
                            <a
                              href={`${
                                process.env.REACT_APP_SUB_DIRECTORY
                              }/${langContent}/${t(
                                "installation.linkToSpare"
                              )}?id=${SpateDetail.product_id}&code=${
                                SpateDetail.installation_product_old_code
                              }`}
                              className="mr-3"
                            >
                              {t("Product.spare")}
                            </a>
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
                {SpateDetail.installation_file.length > 0 && (
                  <>
                    <div className="relate-contet mt-2 mt-md-5">
                      <div className={`${isActive(1)}`}>
                        <div className="install-content pl-4">
                          {t("installation.titleList")}
                        </div>
                        <div className="container">
                          <div className="row">
                            {SpateDetail.installation_file.map(
                              (item, index) => (
                                <div className="col-12">
                                  <a
                                    href={`${process.env.REACT_APP_DOMAIN_NAME}/${item.path}`}
                                    target="_blank"
                                  >
                                    <div className="title-install pl-3">{` ${item.name}`}</div>
                                  </a>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
                                  handleClickCard={handleClickCard}
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
