/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../assets/scss/installation.scss";
import CardInstallation from "../Card/CardInstallation";
import SubMenu from "../installation/SubMenu";
import InputSearch from "../Input/InputSearch";
import LoadingContent from "../LoadingContent";
import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
  GetAllMenuProduct_Sparepart,
  GetDataProduct_SparepartByClassified1,
  GetDataProduct_SparepartByClassified2,
} from "../../GetProduct";
export default function SpareMenu({ SpareList, SpateDetail, typePage }) {
  const [menuSpareRender, setMenuSpareRender] = useState([]);
  const [ContentRender, setContentRender] = useState([]);
  const [ActiveRelate, setActiveRelate] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    const resMenu = await GetAllMenuProduct_Sparepart();
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
  }, []);

  const setActiveMenu = (menu) => {
    setActiveRelate(menu);
  };
  const isActive = (menu) => {
    if (ActiveRelate === menu) {
      return "active";
    }
    return "";
  };
  const handleClickClassified = async (id) => {
    setLoading(true);
    console.log("id", id);
    let resClassified1 = await GetDataProduct_SparepartByClassified1(id);
    let tempClassified1 = [...ContentRender];

    tempClassified1 = resClassified1 ? resClassified1 : [];
    tempClassified1 = tempClassified1.map((item, index) => {
      return {
        ...item,
        id: item.product_id,
        title: item.product_name,
        type: "classified1",
      };
    });
    setContentRender(tempClassified1);
    setLoading(false);
  };
  const handleClickClassified2 = async (id) => {
    setLoading(true);
    console.log("id12", id);
    let resClassified2 = await GetDataProduct_SparepartByClassified2(id);
    let tempClassified2 = [...ContentRender];

    tempClassified2 = resClassified2 ? resClassified2 : [];
    tempClassified2 = tempClassified2.map((item, index) => {
      return {
        ...item,
        id: item.product_id,
        title: item.product_name,
        type: "classified2",
      };
    });
    setContentRender(tempClassified2);
    setLoading(false);
  };
  const handleClickCard = async (id, type) => {
    setLoading(false);
    if (type === "model") {
      let resMenu = await GetAllMenuProduct_Sparepart();
      console.log(id);
      console.log(resMenu);
      resMenu = resMenu.find((m) => m.model_id === id);
      console.log("resMenuresMenu", resMenu);
      if (resMenu.classified.length > 0) {
        let tempindex = 0;
        // resMenu.classified.forEach((item,index))
        let dataresProduct = {};
        await Promise.all(
          resMenu.classified.forEach(async (item, index) => {
            let resClassified1 = await GetDataProduct_SparepartByClassified1();
            if (resClassified1.classified) {
              dataresProduct = resClassified1.classified;
            }
          })
        );
        console.log("dataresProduct", dataresProduct);
        let tempClassified1 = [...ContentRender];
        tempClassified1 = dataresProduct;
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
      setLoading(false);
    }
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
                    {item.classified.length > 0 && (
                      <>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey={index + 1}
                          className="p-0 d-flex"
                        >
                          <span className="text-truncate">
                            {item.model_name}
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
                        <Accordion.Collapse eventKey={index + 1}>
                          <Card.Body className="p-0">
                            <SubMenu
                              menu={item.classified}
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
            <h3 className="title-section">{}</h3>
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
                            <div className="col-md-4 px-2">
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
                        <h1 className="font-weight-bold">Not Found</h1>
                      </div>
                    )}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   <div className="container product-detail">
    //     {Object.keys(SpateDetail).length > 0 && (
    //       <div>
    //         {SpateDetail.product_name && (
    //           <h3 className="title">{SpateDetail.product_name}</h3>
    //         )}

    //         <div className="row">
    //           <div className="col-md-5">
    //             {SpateDetail.file.length > 0 && (
    //               <div className="img-detail">
    //                 <img
    //                   src={`http://www.mostactive.info/${SpateDetail.file[0].path}`}
    //                 />
    //               </div>
    //             )}
    //           </div>
    //           <div className="col-md-7">
    //             <div className="detail p-3">
    //               {SpateDetail.product_code && (
    //                 <label>
    //                   รหัส
    //                   <span className="ml-2">
    //                     {SpateDetail.product_code}
    //                   </span>
    //                 </label>
    //               )}
    //               <br />
    //               {SpateDetail.product_name && (
    //                 <label>
    //                   ชื่อสินค้า
    //                   <span className="ml-2">
    //                     {SpateDetail.product_name}
    //                   </span>
    //                 </label>
    //               )}
    //               <br />
    //               {SpateDetail.model && SpateDetail.model.label && (
    //                 <label>
    //                   ชื่อรุ่น
    //                   <span className="ml-2">
    //                     {SpateDetail.model.label}
    //                   </span>
    //                 </label>
    //               )}
    //               <div className="relate-menu">
    //                 <button
    //                   className={`${isActive(1)} `}
    //                   onClick={() => setActiveMenu(1)}
    //                 >
    //                   วิธีติดตั้ง
    //                 </button>
    //                 <button
    //                   className={`${isActive(2)}`}
    //                   onClick={() => setActiveMenu(2)}
    //                 >
    //                   ชิ้นส่วนอะไหล่
    //                 </button>
    //                 <button
    //                   className={`${isActive(3)}`}
    //                   onClick={() => setActiveMenu(3)}
    //                 >
    //                   คลิปวิดีโอ
    //                 </button>
    //               </div>
    //             </div>

    //             <br />
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // )}
  );
}
