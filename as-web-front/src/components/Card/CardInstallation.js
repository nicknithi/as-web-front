/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default function CardInstallation({ data, handleClickCard }) {
  console.log("data4", data);
  const imgProduct = useRef(null);
  const errorImg = () => {
    imgProduct.current.src = `https://www.questionpro.com/userimages/site_media/no-image.png`;
    // if (data.product_picture && data.product_picture.length > 0) {
    //   const el = document.querySelectorAll(
    //     `[src="http://www.mostactive.info/${data.product_picture[0].path}"]`
    //   );
    //   console.log("elel", el);
    //   if (el.length) {
    //     for (let i = 0; i < el.length; i++) {
    //       el[i].srcset =
    //         "https://www.questionpro.com/userimages/site_media/no-image.png";
    //     }
    //   }
    // }
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
                src={`http://www.mostactive.info/${data.product_picture[0].path}`}
                onError={() => errorImg()}
              />
            </>
          ) : (
            <>
              <Card.Img
                variant="top"
                src="https://www.questionpro.com/userimages/site_media/no-image.png"
              />
            </>
          )}
        </div>

        <Card.Body>
          <div className="card-content p-2 text-center">
            {/* {data.product_old_code} */}
            {/* <br /> */}
            {data.title}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
