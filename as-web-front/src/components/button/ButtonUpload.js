import React from "react";
import "../../assets/scss/components/button/button-upload.scss";
export default function ButtonUpload({ title, uploadImg, index }) {
  const handleSelectFile = (e) => {
    console.log(e.target);
    uploadImg(e.target.files[0], parseInt(e.target.attributes.index.value));
  };
  return (
    <div className="button-confirm-warranty text-center">
      <label class="btn-upload" for={`upload-photo${index}`}>
        {title}
      </label>
      <input
        type="file"
        name="photo"
        id={`upload-photo${index}`}
        index={index}
        onChange={handleSelectFile}
        hidden
      />
    </div>
  );
}
