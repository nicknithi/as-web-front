/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { GetManageProductById } from "../GetProduct";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import ElementBanner from "../components/Content/ElementBanner";
import SpareMenu from "../components/spare/spareMenu";
export default function SpareDetail({ data, getBannerContent }) {
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
    <div>
      <ElementBanner img={getBannerContent(data)} />
      <SpareMenu
        SpareList={[]}
        SpateDetail={SpateDetail}
        typePage="SpareDetail"
      />
    </div>
  );
}
