import React from "react";
import "../../assets/scss/components/banner.scss";
import Carousel from "react-bootstrap/Carousel";
export default function Banner({ img }) {
  return (
    <div className="element-banner pb-4">
      <Carousel>
        {img.map((item, index) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.REACT_APP_DOMAIN_NAME}/${item.path}`}
              key={index}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
