/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
// import "../../assets/scss/Element/carousel.scss";
import Carousel from "react-bootstrap/Carousel";
export default function ElementCarousel({ data }) {
  let settings = { adaptiveHeight: true };
  const [trigleShow, setTrigleShow] = useState(false);
  const handleShow = () => {
    setTrigleShow(true);
  };
  const closeCarousel = () => {
    setTrigleShow(false);
  };
  console.log("datacarousel", data);
  let DataSlide = [...data];
  //DataSlide.shift();
  // if (DataSlide.length >= 2) {
  //   DataSlide.splice(0, 1);
  // }
  return (
    <div className="element-carousel pb-4">
      {data[0].path && (
        <div className="img-carousel text-center">
          <img
            src={`${process.env.REACT_APP_DOMAIN_NAME}/${data[0].coverimage_path}`}
          />
          <div className="button-show" onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
      )}
      {trigleShow && (
        <div className="carousel-show">
          <button
            className="d-flex justify-content-center align-items-center nick-test"
            onClick={closeCarousel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>

          <Carousel>
            {DataSlide.map((item, index) => (
              <Carousel.Item>
                <img
                  src={`${process.env.REACT_APP_DOMAIN_NAME}/${item.path}`}
                  className="img-fluid"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
