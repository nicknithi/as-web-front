import React from "react";

export default function ItemSpare({ data }) {
  console.log("dsta", data);
  let img = "";
  if (data.spare_picture && data.spare_picture.length) {
    img = data.spare_picture[0].path;
  }

  return (
    <div className="col-md-4 ">
      <div className="spare-detail">
        <div className="spare-img">
          {data.spare_picture && data.spare_picture.length > 0 ? (
            <img src={`http://www.mostactive.info/${img}`} />
          ) : (
            <img
              src={`https://www.questionpro.com/userimages/site_media/no-image.png`}
            />
          )}
        </div>
        <div className="detail p-3">
          {data.sparepart_code && data.sparepart_code}
          <br />
          {data.sparepart_name && data.sparepart_name}
          <br />

          <>{`ราคา ${data.sparepart_price || "-"} บาท`}</>

          <br />
        </div>
      </div>
    </div>
  );
}
