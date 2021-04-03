/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SpareMenu from "../components/spare/spareMenu";
import ElementBanner from "../components/Content/ElementBanner";
import ButtonMain from "../components/button/ButtonMain";
import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
} from "../GetProduct";
export default function Spare({ data, RenderColumn }) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            <div className="maintain-content">{RenderColumn(item)}</div>
          </div>
        </div>
      ))}
      <SpareMenu typePage="Spare" />
    </div>
  );
}
