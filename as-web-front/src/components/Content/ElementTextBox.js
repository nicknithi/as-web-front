import React from "react";
import "../../assets/scss/Element/Textbox.scss";
export default function ElementTextBox({ data }) {
  console.log("data", data.detail.split("."));
  return (
    <div className="container">
      <div className="element-textbox">
        {data.contentTitle && (
          <h1 className="font-weight-bold">{data.contentTitle}</h1>
        )}
        {data.content_Desc && (
          <h2 className="font-weight-bold mb-3">{data.content_Desc}</h2>
        )}
        {data.image && <img src={`http://www.mostactive.info/${data.image}`} />}
        {data.detail && (
          <div
            className="detail"
            dangerouslySetInnerHTML={{ __html: data.detail }}
          />
        )}
      </div>
    </div>
  );
}
