/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InstallationMenu from "../components/installation/installationMenu";
import ElementBanner from "../components/Content/ElementBanner";
import ButtonMain from "../components/button/ButtonMain";
import { useTranslation } from "react-i18next";
import {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
} from "../GetProduct";
export default function Spare({ data, RenderColumn }) {
  const [t, i18n] = useTranslation("common");
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <div className={`${item.content_Type !== 2 && "container"}`}>
            <div className="maintain-content">{RenderColumn(item)}</div>
          </div>
        </div>
      ))}
      <InstallationMenu typePage="Spare" />
    </div>
  );
}
