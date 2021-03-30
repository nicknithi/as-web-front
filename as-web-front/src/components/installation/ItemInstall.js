import React from "react";

export default function ItemSpare({ data }) {
  let img = "";
  if (data.spare_picture.length) {
    img = data.spare_picture[0].path;
  }

  return (
    <div className="col-md-4 ">
      <div className="spare-detail">
        <div className="spare-img">
          <img src={`http://www.mostactive.info/${img}`} />
        </div>
        <div className="detail p-3">
          {data.sparepart_code}
          <br />
          {data.sparepart_name}
          <br />
          {`ราคา ${data.sparepart_price} บาท`}
          <br />
        </div>
      </div>
    </div>
  );
}
