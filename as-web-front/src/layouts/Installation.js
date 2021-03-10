import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/scss/installation.scss";
import CardInstallation from "../components/Card/CardInstallation";
export default function Installation() {
  return (
    <div className="container">
      <div className="installation-container">
        <div className="row">
          <div className="col-md-4">
            <Accordion>
              <Card>
                <Card.Header className="d-flex">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="ml-auto"
                  >
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ul>
                      <li>Coffee</li>
                      <li>
                        <ul>
                          <li>Coffee</li>
                          <li>Tea</li>
                          <li>Milk</li>
                          <li>Coffee</li>
                          <li>Tea</li>
                          <li>Milk</li>
                        </ul>
                      </li>
                      <li>Milk</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header className="d-flex">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="1"
                    className="ml-auto"
                  >
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
              <div className="col-md-4 px-2">
                <CardInstallation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
