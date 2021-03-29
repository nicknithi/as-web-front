import React, { useState, useEffect } from "react";
import FormWarranty from "../components/Warranty/FormWarranty";
import CostWarrantyDetail from "../components/Warranty/CostWarrantyDetail";
import WarrantyConfirm from "../components/Warranty/WarrantyConfirm";
import BannerCover from "../components/Banner/BannerCover";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../assets/scss/warranty.scss";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import ButtonMain from "../components/button/ButtonMain";
export default function Warranty({ data, RenderColumn }) {
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

    if (item.content_Title === "การลงทะเบียนรับประกันสินค้า ") {
      dataWarrantyConfirm = item;
    }
    if (item.content_Title === "Privacy Policy") {
      dataWarrantyPolicy = item;
    }
  });

  console.log("nicknithi", dataWarrantyConfirm);

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
  return (
    <div className="warranty">
      {bannerAndCarousel.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            <div className="maintain-content">{RenderColumn(item)}</div>
          </div>
        </div>
      ))}
      <div className="container pb-4">
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
    </div>
  );
}
