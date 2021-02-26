import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner from "../../assets/img/BANNER.png";
export default function BannerCover() {
  return (
    <div className="mb-5">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
