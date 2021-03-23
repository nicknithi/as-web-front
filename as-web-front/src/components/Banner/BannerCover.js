import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
// import Banner from "../../assets/img/BANNER.png";
export default function BannerCover({ img }) {
  return (
    <div className="mb-5">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={img} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
