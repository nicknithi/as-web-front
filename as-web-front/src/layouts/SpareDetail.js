import React, { useEffect, useState } from "react";
import { GetManageProductById } from "../GetProduct";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
export default function SpareDetail() {
  const { search } = useLocation();
  const query = queryString.parse(search);
  const [SpateDetail, setSpateDetail] = useState({});
  useEffect(async () => {
    const resProduce = await GetManageProductById(query.id);
    console.log("resProduce", resProduce);
    let tempDetail = { ...SpateDetail };
    tempDetail = resProduce;
    setSpateDetail(tempDetail);
  }, []);
  return (
    <div className="container product-detail">
      {Object.keys(SpateDetail).length > 0 && (
        <div>
          <h3 className="title">{SpateDetail.product_name}</h3>
          <div className="row">
            <div className="col-md-5">
              <img src="https://www.questionpro.com/userimages/site_media/no-image.png" />
            </div>
            <div className="col-md-7">
              <label>รหัส:{SpateDetail.product_code}</label>
              <br />
              <label>ชื่อสินค้า: {SpateDetail.product_name}</label>
              <br />
              <label>ชื่อรุ่น: {SpateDetail.model.label}</label>
              <br />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
