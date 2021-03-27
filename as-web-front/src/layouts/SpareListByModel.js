/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../assets/scss/installation.scss";
import CardInstallation from "../components/Card/CardInstallation";
import SubMenu from "../components/installation/SubMenu";
import InputSearch from "../components/Input/InputSearch";
import BannerInstallation from "../components/Banner/BannerInstallation";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import ElementBanner from "../components/Content/ElementBanner";
import SpareMenu from "../components/spare/spareMenu";

import { GetAllProduct_SparepartList } from "../GetProduct";
export default function SpareListByModel({ data, getBannerContent }) {
  const { search } = useLocation();
  const query = queryString.parse(search);

  const [SpareList, setSpareList] = useState([]);
  useEffect(async () => {
    let dataProduct = await GetAllProduct_SparepartList();
    console.log("dataProduct");
    dataProduct = dataProduct.map((item, index) => {
      return { ...item, title: item.product_name };
    });
    if (query.id) {
      dataProduct = dataProduct.filter((p) => p.product_model === query.id);
    }

    let TempSpare = [...SpareList];
    TempSpare = dataProduct;
    setSpareList(TempSpare);
    console.log("TempSpare", TempSpare);
  }, []);
  console.log("5555555555555k", getBannerContent(data));
  return (
    <div>
      <ElementBanner img={getBannerContent(data)} />
      <SpareMenu SpareList={SpareList} typePage="SpareListByModel" />
    </div>
  );
}
