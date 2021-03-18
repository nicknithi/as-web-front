import React from "react";
import Carousel from "react-bootstrap/Carousel";
export default function Banner({ img }) {
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
