import React from "react";
import "../../assets/scss/Element/Textbox.scss";
export default function ElementTextBox({ data, col }) {
  console.log(data);
  return (
    <div className="container">
      <div className="element-textbox">
        {data.content_Desc && (
          <h2 className="font-weight-bold mb-3">{data.content_Desc}</h2>
        )}
        {data.image && <img src={`http://www.mostactive.info/${data.image}`} />}
        {data.detail && (
          <div
            className="detail"
            dangerouslySetInnerHTML={{ __html: data.content_body }}
          />
        )}
      </div>
    </div>
  );
}
