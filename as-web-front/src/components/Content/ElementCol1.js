import React from "react";

export default function ElementCol1({ data }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {data.contentTitle && (
            <h1 className="font-weight-bold">{data.contentTitle}</h1>
          )}
          {data.detail && (
            <h1 className="font-weight-bold mb-3">{data.detail}</h1>
          )}
          {data.content_Desc && (
            <h2 className="font-weight-bold mb-3">{data.content_Desc}</h2>
          )}
          <div className="d-flex justify-content-center mb-4">
            {data.image && (
              <img src={`http://www.mostactive.info/${data.image}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
