/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import noImg from "../../assets/img/noImg.jpg";
export default function CardInstallation({ data, handleClickCard }) {
  const imgProduct = useRef(null);
  const errorImg = () => {
    imgProduct.current.src = noImg;
  };
  return (
    <div onClick={() => handleClickCard(data.id, data.type)}>
      <Card
        style={{ width: "100%" }}
        className="installation-card border-0 mb-3"
      >
        <div className="product-img">
          {data.product_picture && data.product_picture.length > 0 ? (
            <>
              <img
                ref={imgProduct}
                src={`${process.env.REACT_APP_DOMAIN_NAME}/${data.product_picture[0].path}`}
                onError={() => errorImg()}
              />
            </>
          ) : (
            <>
              <Card.Img variant="top" src={noImg} />
            </>
          )}
        </div>

        <Card.Body>
          <div
            className={`card-content px-3 py-1 ${
              data.type === "model" && "text-center font-weight-bold p-3"
            }`}
          >
            {data.product_old_code && (
              <div className="code">
                {data.product_old_code}
                <br />
              </div>
            )}
            <div className={`${data.type !== "model" && "title"}`}>
              {data.title}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
