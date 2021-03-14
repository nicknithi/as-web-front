import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SubMenu({ menu }) {
  console.log("menu", menu);
  return (
    <div>
      <Accordion defaultActiveKey={1}>
        {menu.map((item, index) => (
          <Card key={index}>
            <Accordion.Toggle eventKey={index + 1} className="main-menu p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                class="bi bi-circle-fill"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              {item.title}
            </Accordion.Toggle>
            {item.subMenu.length > 0 && (
              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body>
                  {item.subMenu &&
                    item.subMenu.map((item2) => (
                      <div className="sub-menu">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          class="bi bi-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                        {item2.title}
                      </div>
                    ))}
                </Card.Body>
              </Accordion.Collapse>
            )}
          </Card>
        ))}
      </Accordion>
    </div>
  );
}

export default SubMenu;
