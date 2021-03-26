import React, { useState } from "react";
import "../../assets/scss/Element/Video.scss";
export default function ElementVideo({ data }) {
  const [IsShowVidio, setIsShowVidio] = useState(false);
  const [IsYoutube, setIsYoutube] = useState(false);
  const playvideo = () => {
    if (data.link !== "null" && data.link) {
      setIsYoutube(true);
      setIsShowVidio(true);
    } else {
      setIsShowVidio(true);
    }
  };
  const closeViod = () => {
    setIsShowVidio(false);
  };

  return (
    <div className="element-video mb-3">
      <div className="d-flex justify-content-center mb-4 video-img">
        {(data.path || data.link) && (
          <div class="play-video" onClick={() => playvideo()} />
        )}
        {data.coverimage_path && (
          <img src={`http://www.mostactive.info/${data.coverimage_path}`} />
        )}
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
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
      </div>
      {IsShowVidio && (
        <div className="overlay-video">
          {IsYoutube ? (
            <iframe
              width="800px"
              height="500px"
              src={`https://www.youtube.com/embed/${
                data.link.split("/").reverse()[0]
              }`}
            ></iframe>
          ) : (
            <video autoPlay controls>
              <source src={`http://www.mostactive.info/${data.path}`} />
              Your browser does not support the video tag.
            </video>
          )}

          <button
            className="d-flex justify-content-center align-items-center"
            onClick={closeViod}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
