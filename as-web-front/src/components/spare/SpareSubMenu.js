import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SubMenu({
  menu,
  handleClickClassified,
  handleClickClassified2,
  isActiveClass1,
  isActiveClass2,
}) {
  return (
    <div>
      <Accordion defaultActiveKey={1}>
        {menu.map((item, index) => (
          <Card key={index}>
            <Accordion.Toggle
              eventKey={index + 1}
              className={`main-menu p-0 ${isActiveClass1(item.classified_id)}`}
              onClick={() =>
                handleClickClassified(item.classified_id, item.classified_name)
              }
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                class="bi bi-circle-fill"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg> */}
              <div className="text-wrap">{item.classified_name}</div>
            </Accordion.Toggle>
            {item.sub_classified.length > 0 && (
              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body>
                  {item.sub_classified &&
                    item.sub_classified.map((item2) => (
                      <div
                        className={`sub-menu ${isActiveClass2(
                          item2.sub_classified_id
                        )}`}
                        onClick={() =>
                          handleClickClassified2(
                            item2.sub_classified_id,
                            item2.sub_classified_name
                          )
                        }
                      >
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="currentColor"
                          class="bi bi-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <circle cx="8" cy="8" r="8" />
                        </svg> */}
                        <span className="text-wrap">
                          {item2.sub_classified_name}
                        </span>
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