import React from "react";
// import "../../assets/scss/Element/Pdf.scss";
export default function ElementPDF({ data }) {
  return (
    <div className="element-pdf">
      {data.path && (
        <div className="d-flex justify-content-center mb-2">
          <img
            src={`http://www.mostactive.info/${data.coverimage_path}`}
            className="img-fluid"
          />
        </div>
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
