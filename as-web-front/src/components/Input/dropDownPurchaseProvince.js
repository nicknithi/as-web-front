import React, { useState, useEffect } from "react";

import "../../assets/scss/components/input/dropdown.scss";
import { useTranslation } from "react-i18next";
export default function DropDownPurchaseProvince({
  data,
  handleEvent,
  index,
  FormDataProduct,
  setFormDataProduct,
  Confirm,
}) {
  const [t, i18n] = useTranslation("common");
  const [title, setTitleState] = useState(t("warranthForm.selectProvince"));
  const handleSelect = (e) => {
    if (e.target) {
      const dataSet = [...FormDataProduct];
      dataSet[index].Purchase_Province = e.target.value;
      setFormDataProduct(dataSet);
      const tempTitle = data.find((a) => a.id === parseInt(e.target.value));
      if (tempTitle !== undefined) {
        const title = tempTitle.value;
        setTitleState(title);
      } else {
        setTitleState(t("warranthForm.selectProvince"));
      }

      handleEvent(e.target.value);
    }
  };
  useEffect(() => {
    const dataTest = data;
    if (dataTest[0]) {
      if (FormDataProduct[index].Purchase_Province) {
        const findData = dataTest.find(
          (a) => a.id === parseInt(FormDataProduct[index].Purchase_Province)
        );
        if (findData !== undefined) {
          setTitleState(findData.value);
        } else {
          setTitleState(t("warranthForm.selectProvince"));
        }
      } else {
        setTitleState(t("warranthForm.selectProvince"));
      }
    }
  }, [FormDataProduct[index].Purchase_Province]);
  return (
    <div className="position-relative as-dropdown">
      <select
        className="form-select position-absolute w-100"
        aria-label="Default select example"
        name="Purchase_Province"
        disabled={!Confirm}
        value={FormDataProduct[index].Purchase_Province}
        index={index}
        onChange={handleSelect}
        required
      >
        {data.map((item, index) => (
          <option key={index} value={item.id} titleSet={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      <div className="custom-dropdown">
        {title}
        <div className="button-select">
          <div className="squre" />
        </div>
      </div>
    </div>
  );
}
