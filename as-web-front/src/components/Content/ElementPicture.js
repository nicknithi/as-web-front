import React from "react";
import "../../assets/scss/Element/ElementPicture.scss";
export default function ElementPicture({ data, index }) {
  // let img = data.file.find((f) => f.file_order === index + 1);
  // console.log(img);
  // let isShowImg = false;
  // if (img !== undefined) {
  //   isShowImg = true;
  //   img = img.path;
  // }
  return (
    <div className="container element-picture mb-3">
      <div className="d-flex justify-content-center mb-4">
        {data.image && <img src={`http://www.mostactive.info/${data.image}`} />}
      </div>

      {data.detail && (
        <h1
          className="font-weight-bold mb-3"
          dangerouslySetInnerHTML={{ __html: data.detail }}
        />
      )}
      {data.content_Desc && (
        <h2
          className="font-weight-bold mb-3"
          dangerouslySetInnerHTML={{ __html: data.content_Desc }}
        />
      )}
    </div>
  );
}
