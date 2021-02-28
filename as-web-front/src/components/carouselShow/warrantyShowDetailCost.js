import React, { useState } from "react";
import img from "../../assets/img/PIC01.png";
import "../../assets/scss/components/carousel/warranty.scss";
import Carousel from "react-bootstrap/Carousel";
import imgoverlay from "../../assets/img/PIC02.png";
const WarrantyShowDetailCost = () => {
  const [triggerShow, setTriggerShow] = useState(false);
  const handleShow = () => {
    setTriggerShow(!triggerShow);
  };
  return (
    <div className="warrnty-cost-detail">
      <div className="row">
        <div className="col-md-4 position-relative">
          <div className="text-center">
            <img src={img} />
          </div>
          <div className="search-button-overlay d-flex align-items-center justify-content-center">
            <div
              className="bg-search-btn d-flex align-items-center justify-content-center"
              onClick={handleShow}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {triggerShow ? (
        <div className="show-detail-overlay">
          <Carousel>
            <Carousel.Item>
              <img src={imgoverlay} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={imgoverlay} />
            </Carousel.Item>
          </Carousel>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default WarrantyShowDetailCost;
