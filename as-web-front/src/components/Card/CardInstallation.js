import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default function CardInstallation() {
  return (
    <div>
      <Card style={{ width: "100%" }} className="installation-card border-0">
        <div>
          <Card.Img
            variant="top"
            src="https://beelievehub.com/wp-content/uploads/2019/11/%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C-TF-2103-American-Standard-1.jpg"
          />
        </div>

        <Card.Body>
          <div className="card-content">
            asdfasdf
            <br />
            asdf
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
