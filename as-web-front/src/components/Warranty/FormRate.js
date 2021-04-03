import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function FormRate({ handleChangInput, Confirm }) {
  const [t, i18n] = useTranslation("common");
  const handleRate = (rate) => {
    document.getElementById("Score").value = rate;
    handleChangInput(document.getElementById("Score"));
    setActive(rate);
  };
  const handleCommend = (e) => {
    handleChangInput(e);
  };
  const [Active, setActive] = useState("");
  useEffect(() => {}, []);
  const IsActive = (level) => {
    if (Active === level) {
      return "active";
    } else {
      return "";
    }
  };
  return (
    <div className="rate-form mt-4 py-4 px-3">
      <input type="hidden" name="Score" id="Score" />
      <div className="row">
        <div className="col-md-4 mx-auto">
          <h3 className="title">{t("warranthForm.Evaluate")}</h3>
          <div className="d-flex justify-content-between">
            <div
              style={{ backgroundColor: "red" }}
              className={`emotion ${IsActive(1)}`}
              onClick={() => handleRate(1)}
            >
              1
            </div>
            <div
              style={{ backgroundColor: "#ffbc00" }}
              className={`emotion ${IsActive(2)}`}
              onClick={() => handleRate(2)}
            >
              2
            </div>
            <div
              style={{ backgroundColor: "yellow" }}
              className={`emotion ${IsActive(3)}`}
              onClick={() => handleRate(3)}
            >
              3
            </div>
            <div
              style={{ backgroundColor: "#75bf3e" }}
              className={`emotion ${IsActive(4)}`}
              onClick={() => handleRate(4)}
            >
              4
            </div>
            <div
              style={{ backgroundColor: "#349a27" }}
              className={`emotion ${IsActive(5)}`}
              onClick={() => handleRate(5)}
            >
              5
            </div>
          </div>
        </div>
      </div>
      <div className="row text-status">
        <div className="col-md-4 d-flex justify-content-between mx-auto">
          <span style={{ color: "red" }}>{t("warranty.rateLow")}</span>
          <span style={{ color: "#349a27" }}>{t("warranty.rateHeight")}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <textarea
            onChange={handleCommend}
            disabled={!Confirm}
            className="w-100 mt-3"
            name="Description"
            placeholder={t("warranthForm.Suggestion")}
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
}
