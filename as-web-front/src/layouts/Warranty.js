import React, { useState, useEffect } from "react";
import FormWarranty from "../components/Warranty/FormWarranty";
import CostWarrantyDetail from "../components/Warranty/CostWarrantyDetail";
import WarrantyConfirm from "../components/Warranty/WarrantyConfirm";
import BannerCover from "../components/Banner/BannerCover";
import { useCookies } from "react-cookie";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../assets/scss/warranty.scss";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import ButtonMain from "../components/button/ButtonMain";

export default function Warranty({ data, RenderColumn }) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  const [Confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  let dataWarrantyConfirm = {};
  let dataWarrantyPolicy = {};
  const bannerAndCarousel = [];
  data.forEach((item, index) => {
    if (item.content_Type === 2 || item.content_Type === 8) {
      bannerAndCarousel.push(item);
    }

    if (
      item.content_Title === "การลงทะเบียนรับประกันสินค้า " ||
      item.content_Title === "Warranty Registration"
    ) {
      dataWarrantyConfirm = item;
    }
    if (item.content_Title === "Privacy Policy") {
      dataWarrantyPolicy = item;
    }
  });

  const handleCheck = (e) => {
    setConfirm(e.target.checked);
  };
  const handleShowModal = () => {
    setShow(true);
  };

  const ConfirmFromModal = () => {
    setConfirm(true);
    setShow(false);
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
    <div className="warranty">
      {bannerAndCarousel.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            <div className="maintain-content">{RenderColumn(item)}</div>
          </div>
        </div>
      ))}
      <div className="container pb-4 under-line mb-3">
        <div>
          <WarrantyConfirm
            title={dataWarrantyConfirm.content_Title}
            description={dataWarrantyConfirm.content_body}
            handleCheck={handleCheck}
            handleShowModal={handleShowModal}
            checked={Confirm}
          />
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName=""
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                <h1>{dataWarrantyPolicy.content_Title}</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="detail">
                <PerfectScrollbar
                  dangerouslySetInnerHTML={{
                    __html: dataWarrantyPolicy.detail,
                  }}
                />
              </div>
              <div className="row justify-content-center mt-3">
                <ButtonMain
                  title={t("button.confirm")}
                  color="#636363"
                  BgColor="#f1c400"
                  handleClick={ConfirmFromModal}
                />
              </div>
            </Modal.Body>
          </Modal>
        </div>
        {true && <FormWarranty Confirm={Confirm} />}
      </div>
      <div className="container row justify-content-center mt-2 mb-4">
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
  );
}
