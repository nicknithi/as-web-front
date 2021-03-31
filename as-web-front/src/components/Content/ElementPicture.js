import React from "react";
import "../../assets/scss/Element/ElementPicture.scss";
export default function ElementPicture({ data, index }) {
  console.log("data11", data);
  return (
    <div className="element-picture mb-3">
      {/* <div className="d-flex justify-content-center mb-4 picture-img"> */}
      <div>
        {data.path && (
          <img
            src={`http://www.mostactive.info/${data.path}`}
            className="img-fluid"
          />
        )}
      </div>
      {data.link && <a href={data.link} />}
      {data.description && (
        <div
          className="img-detail mb-3"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}
      {data.flag_button === 1 && (
        <div className="d-flex justify-content-center mb-3 button-element">
          <a href={`http://www.mostactive.info/${data.path}`} download>
            download
          </a>
        </div>
      )}
    </div>
  );
}
