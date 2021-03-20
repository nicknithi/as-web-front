import React from "react";
import "../../assets/scss/Element/Textbox.scss";
export default function ElementTextBox({ data, col }) {
  console.log(data);
  return (
    <div className="container">
      <div className="element-textbox mt-3">
        <div className="d-flex justify-content-center">
          {data.path && <img src={`http://www.mostactive.info/${data.path}`} />}
        </div>
        {data.description && (
          <div
            className="detail"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
      </div>
    </div>
  );
}
