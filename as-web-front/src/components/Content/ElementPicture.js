/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import "../../assets/scss/Element/ElementPicture.scss";

import { fileDownload, blob2canvas, nomalDownloadFile } from "../../ManageFIle";
export default function ElementPicture({ data, index }) {
  const downloadPdf = async () => {
    if (data.path) {
      const res = await fileDownload(data.path);
      if (res) {
        const url = window.URL.createObjectURL(new Blob([res]));
        const canvas = document.createElement("CANVAS");
        blob2canvas(canvas, url, data.name);
      }
    }
  };
  return (
    <div className="element-picture mb-3">
      {/* <div className="d-flex justify-content-center mb-4 picture-img"> */}
      <div>
        {data.path && (
          <img
            src={`${process.env.REACT_APP_DOMAIN_NAME}/${data.path}`}
            className="img-fluid d-block mx-auto mb-3"
          />
        )}
      </div>
      {data.link && (
        <a href={`${process.env.REACT_APP_SUB_DIRECTORY}${data.link}`} />
      )}
      {data.description && (
        <div
          className="img-detail mb-3"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}
      {data.flag_button === 1 && (
        <div className="d-flex justify-content-center mb-3 button-element">
          {data.name == "SIZE807x1141.png" ||
          data.name == "SIZE807x1141_2.png" ? (
            <a
              className="btn rounded-0"
              onClick={() => {
                downloadPdf();
              }}
            >
              download
            </a>
          ) : (
            <a
              className="btn rounded-0"
              href={`${process.env.REACT_APP_DOMAIN_NAME}/${data.path}`}
              target="_blank"
              // onClick={() => {
              //   nomalDownloadFile(data.path, data.name);
              // }}
            >
              download
            </a>
          )}
        </div>
      )}
    </div>
  );
}
