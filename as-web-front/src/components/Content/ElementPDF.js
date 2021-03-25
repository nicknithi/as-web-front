import React from "react";
import "../../assets/scss/Element/Pdf.scss";
export default function ElementPDF({ data }) {
  return (
    <div className="element-pdf">
      {data.path && <img src={`http://www.mostactive.info/${data.path}`} />}
      {data.flag_button === 1 && (
        <div className="d-flex justify-content-center mb-3 button-element">
          <a href={data.link_download}>download</a>
        </div>
      )}
    </div>
  );
}
