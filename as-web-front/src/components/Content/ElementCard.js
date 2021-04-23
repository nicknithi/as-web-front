import React from "react";
// import "../../assets/scss/Element/Card.scss";
export default function ElementCard({ data }) {
  return (
    <div className="element-card mb-3">
      <div className="d-flex justify-content-center mb-4 card-img">
        {data.path && (
          <img src={`${process.env.REACT_APP_DOMAIN_NAME}/${data.path}`} />
        )}
      </div>
      {data.link && (
        <a href={`${process.env.REACT_APP_SUB_DIRECTORY}${data.link}`} />
      )}
      <div className="d-flex justify-content-between">
        {data.description && (
          <h3
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
        <div className="button-card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
