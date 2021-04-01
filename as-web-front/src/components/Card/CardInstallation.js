import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default function CardInstallation({ data, handleClickCard }) {
  console.log("55667788", data);
  return (
    <div onClick={() => handleClickCard(data.id, data.type)}>
      <Card
        style={{ width: "100%" }}
        className="installation-card border-0 mb-3"
      >
        <div>
          {data.product_picture ? (
            <>
              <Card.Img
                variant="top"
                src={`http://www.mostactive.info/${data.product_picture[0].path}`}
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
          <div className="card-content p-2 text-center">{data.title}</div>
        </Card.Body>
      </Card>
    </div>
  );
}
