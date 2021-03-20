import React from "react";
import "../../assets/scss/Element/Pdf.scss";
export default function ElementPDF({ data }) {
  return (
    <div className="element-pdf">
      {data.path && <img src={`http://www.mostactive.info/${data.path}`} />}
    </div>
  );
}
