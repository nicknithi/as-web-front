import React from "react";
import "../../assets/scss/Element/ElementPicture.scss";
export default function ElementPicture({ data }) {
  return (
    <div className="container element-picture mb-3">
      {data.contentTitle && (
        <h1 className="font-weight-bold">{data.contentTitle}</h1>
      )}
      <div className="d-flex justify-content-center mb-4">
        {data.image && <img src={`http://www.mostactive.info/${data.image}`} />}
      </div>

      {data.detail && <h1 className="font-weight-bold mb-3">{data.detail}</h1>}
      {data.content_Desc && (
        <h2 className="font-weight-bold mb-3">{data.content_Desc}</h2>
      )}
    </div>
  );
}
