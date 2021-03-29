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
    dataProduct = dataProduct.map((item, index) => {
      return {
        title: item.model_name,
        model_id: item.model_id,
        classified: item.classified,
      };
    });

    if (query.id) {
      let renderClassofied = {};

      dataProduct.forEach((item, index) => {
        const dataClassiFied = item.classified.find(
          (c) => c.classified_id === parseInt(query.id)
        );
        if (dataClassiFied !== undefined) {
          renderClassofied = dataClassiFied;
        }
      });

      if (Object.keys(renderClassofied).length > 0) {
        console.log("renderClassofied", renderClassofied);
        let TempSpare = [...SpareList];
        TempSpare = renderClassofied.product_sparepart;
        TempSpare = TempSpare.map((item, index) => {
          return { ...item, title: item.product_name };
        });
        setSpareList(TempSpare);
      }
    }
  }, []);
  return (
    <div>
      <ElementBanner img={getBannerContent(data)} />
      <SpareMenu SpareList={SpareList} typePage="SpareListByModel" />
    </div>
  );
}
