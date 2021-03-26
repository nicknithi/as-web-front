/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SpareMenu from "../components/spare/spareMenu";
import ElementBanner from "../components/Content/ElementBanner";
import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
} from "../GetProduct";
export default function Spare({ data, RenderColumn }) {
  const [menuSpare, setMenuSpare] = useState([]);
  const [SpareList, setSpareList] = useState([]);
  useEffect(async () => {
    const resSpareModel = await GetAllProductModelSpare();
    let MenuSpare = resSpareModel.map((item, index) => {
      return { title: item.name, classified1: [] };
    });
    let resClassType = await GetAllClassifiedTypeSpare();

    resClassType = resClassType.map((item, index) => {
      return { ...item, title: item.name };
    });
    MenuSpare = MenuSpare.map((item, index) => {
      return { ...item, classified1: resClassType };
    });
    console.log("MenuSpare", MenuSpare);
    let TempMenu = [...menuSpare];
    TempMenu = MenuSpare;
    setMenuSpare(TempMenu);
  }, []);
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            <div className="maintain-content">{RenderColumn(item)}</div>
          </div>
        </div>
      ))}
      <SpareMenu menuSpare={menuSpare} SpareList={menuSpare} />
    </div>
  );
}
