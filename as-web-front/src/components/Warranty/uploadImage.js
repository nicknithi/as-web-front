import React, { useState, useEffect } from "react";
import "../../assets/scss/components/uploadImg.scss";
import ButtonUpload from "../button/ButtonUpload";
import { useTranslation } from "react-i18next";
export default function UploadImage({
  handleGetFile,
  index,
  Confirm,
  FileWaranty,
  setFileWaranty,
}) {
  const [t, i18n] = useTranslation("common");
  const [imgPreview, setImgPreview] = useState("");
  const uploadImg = (file, index) => {
    //handleGetFile(file, index);
    let dataFile = [...FileWaranty];
    const fileTemp = [];
    for (let i = 0; i < file.length; i++) {
      fileTemp.push(file[i]);
    }
    setImgPreview(fileTemp);
    dataFile[index] = fileTemp;
    setFileWaranty(dataFile);
    // setImgPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    // if (FileWaranty.length) {
    //   if (!Array.isArray(FileWaranty[index])) {
    //     setImgPreview(URL.createObjectURL(FileWaranty[index]));
    //   }
    // }
    // console.log("testFile", Array.isArray(FileWaranty[index]), FileWaranty);
    // if (FileWaranty.length) {
    //   if (!Array.isArray(FileWaranty[index])) {
    //     setImgPreview(URL.createObjectURL(FileWaranty[index]));
    //   }
    // }
    // if (FileWaranty[index].length) {
    // } else {
    // }
    // if (FileWaranty[index].) {
    //   if (!Array.isArray(FileWaranty[index])) {
    //     setImgPreview(URL.createObjectURL(FileWaranty[index]));
    //   }
    // } else {
    // }
  }, []);
  const imgPreviewShow = (file) => {
    // URL.createObjectURL(file);
    return URL.createObjectURL(file);
  };

  return (
    <div className="col-md-4  mx-auto text-center">
      {FileWaranty[index] && FileWaranty[index].length ? (
        FileWaranty[index].map((item, index) => (
          <img
            className="mb-3"
            src={imgPreviewShow(item)}
            alt="preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ))
      ) : (
        <div className="img-upload">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            class="bi bi-image"
            viewBox="0 0 16 16"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
          </svg>
        </div>
      )}

      <div className="button d-flex justify-content-center mt-3">
        <div className="mr-3">
          <ButtonUpload
            Confirm={Confirm}
            title={t("warranthForm.uploadRecipt")}
            uploadImg={uploadImg}
            index={index}
          />
        </div>
        <div>
          <ButtonUpload
            Confirm={Confirm}
            uploadImg={uploadImg}
            index={index}
            title={t("warranthForm.TakePicture")}
          />
        </div>
      </div>
    </div>
  );
}
