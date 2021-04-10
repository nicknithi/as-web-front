import React, { useRef } from "react";
import noImg from "../../assets/img/noImg.jpg";
import { useTranslation } from "react-i18next";
export default function ItemSpare({ data }) {
  const imgProductDetail = useRef(null);
  const [t, i18n] = useTranslation("common");
  let img = "";
  if (data.spare_picture && data.spare_picture.length) {
    img = data.spare_picture[0].path;
  }

  return (
    <div className="col-6 col-md-4 ">
      <div className="spare-detail">
        <div className="spare-img">
          {data.spare_picture && data.spare_picture.length > 0 ? (
            <img
              ref={imgProductDetail}
              src={`http://www.mostactive.info/${img}`}
              onError={() => {
                imgProductDetail.current.src = noImg;
              }}
            />
          ) : (
            <img src={noImg} />
          )}
        </div>
        <div className="detail p-3">
          {data.sparepart_code && data.sparepart_code}
          <br />
          {data.sparepart_name && data.sparepart_name}
          <br />

          <>{`${t("Product.price")} ${data.sparepart_price || "-"} ${t(
            "Product.baht"
          )}`}</>

          <br />
        </div>
      </div>
    </div>
  );
}
