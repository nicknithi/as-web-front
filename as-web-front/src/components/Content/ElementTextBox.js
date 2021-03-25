import React from "react";
import "../../assets/scss/Element/Textbox.scss";
export default function ElementTextBox({ data, col }) {
  console.log(data);
  return (
    <div className="container">
      <div className="element-textbox mt-3">
        {data.description && (
          <div
            className="detail"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
        <div className="d-flex justify-content-center">
          {data.path && <img src={`http://www.mostactive.info/${data.path}`} />}
        </div>
        {data.flag_button === 1 && (
          <div className="d-flex justify-content-center mb-3 button-element">
            <a href={data.link_download}>download</a>
          </div>
        )}
      </div>
    </div>
  );
}
