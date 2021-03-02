import React from "react";
import "../../assets/scss/components/button/button-upload.scss";
export default function ButtonUpload({ title, uploadImg, index }) {
  const handleSelectFile = (e) => {
    uploadImg(e.target.files[0], parseInt(e.target.attributes.index.value));
  };
  return (
    <div className="button-confirm-warranty text-center">
      <input type="file" index={index} onChange={handleSelectFile} />
    </div>
  );
}
