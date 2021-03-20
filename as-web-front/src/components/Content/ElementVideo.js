import React from "react";
import "../../assets/scss/Element/Video.scss";
export default function ElementVideo({ data }) {
  return (
    <div className="element-video mb-3">
      <div className="d-flex justify-content-center mb-4 video-img">
        {data.link && <a href={data.link} target="_blank" />}
        {data.path && <img src={`http://www.mostactive.info/${data.path}`} />}
        <div className="play">
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

      <div className="d-flex justify-content-between">
        {data.description && (
          <h1
            className="font-weight-bold mb-3"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
      </div>
    </div>
  );
}
