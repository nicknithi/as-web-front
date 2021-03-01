import React, { useState } from "react";
import ButtonManageForm from "../button/ButtonManageForm";

import FormProductList from "./FormProductList";
export default function ProductData({ handleChangInput }) {
  const [coutProcudeForm, setCoutProcudeForm] = useState([""]);
  const uiFrom = () => {
    return coutProcudeForm.map((el, i) => (
      <FormProductList key={i} handleChangInput={handleChangInput} />
    ));
  };
  const addProductForm = () => {
    coutProcudeForm.push("");
    setCoutProcudeForm([1, 2]);
  };
  const addStoreForm = () => {
    console.log("testset");
  };
  return (
    <div>
      <div className="mt-3">
        <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>
        <div className="product-data">
          {uiFrom()}
          <ButtonManageForm
            addProductForm={addProductForm}
            addStoreForm={addStoreForm}
          />
        
        </div>
      </div>
    </div>
  );
}
