import React from "react";
import "../../assets/scss/components/banner.scss";
import Carousel from "react-bootstrap/Carousel";
export default function Banner({ img }) {
  return (
    <div className="mb-5">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={img} />
        </Carousel.Item>
      </Carousel>
      <div className="container banner mt-5" />
    </div>
  );
}
