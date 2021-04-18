import React from "react";
// import "../../assets/scss/Element/Audio.scss";
export default function ElementAudio({ data }) {
  return (
    <div className="element-audio">
      {data.path && (
        <audio controls className="my-3 w-50">
          <source
            src={`http://www.mostactive.info/${data.path}`}
            type={data.type}
          />
          Your browser does not support the audio element.
        </audio>
      )}
      {data.description && (
        <h1
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}
    </div>
  );
}
