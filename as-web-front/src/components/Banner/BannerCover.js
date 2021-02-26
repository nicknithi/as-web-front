import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner from "../../assets/img/BANNER.png";
export default function BannerCover() {
  return (
    <div className="mb-5">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
