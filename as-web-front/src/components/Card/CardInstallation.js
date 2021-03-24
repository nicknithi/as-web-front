import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default function CardInstallation({ data }) {
  console.log("testData123123123", data);
  return (
    <div>
      <Card
        style={{ width: "100%" }}
        className="installation-card border-0 mb-3"
      >
        <div>
          <Card.Img
            variant="top"
            src="https://www.questionpro.com/userimages/site_media/no-image.png"
          />
        </div>

        <Card.Body>
          <div className="card-content p-2 text-center">{data.title}</div>
        </Card.Body>
      </Card>
    </div>
  );
}
