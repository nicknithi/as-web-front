import React, { useState, useEffect, Fragment } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../assets/scss/components/input/input-barcode.scss";
import http from "../../axios";
export default function InputProcuctCode({ handleEvent, index }) {
  const manualInput = (e) => {
    if (e.length) {
    } else {
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);
    http
      .post(`/api/Product/GetProductTop20ByCode`, {
        Lang_ID: 1,
        Product_Code: query,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success!") {
          console.log(res.data.data);
          const option = res.data.data.map((item, index) => {
            return {
              id: item.id,
              value: item.product_Name,
              index: index,
              fK_Model_ID: item.fK_Model_ID,
              fK_Type_ID: item.fK_Type_ID,
              barcode: item.product_Barcode,
            };
          });
          setOptions(option);
          setIsLoading(false);
        } else {
        }
        if (res.data.message === "Fail!") {
          setIsLoading(false);
        }
      });
  };
  const filterBy = () => true;
  useEffect(() => {}, []);
  return (
    <div className="input-barcode">
      {/* <input
        type="text"
        name="Barcode_Number"
        id="Barcode_Number"
        className="as-input"
        index={index}
        onChange={manualInput}
      /> */}
      <input
        type="hidden"
        name="Barcode_Number"
        id="Barcode_Number"
        index={index}
        value=""
      />
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="barcode"
        minLength={3}
        onSearch={handleSearch}
        onChange={manualInput}
        options={options}
        placeholder=""
        renderMenuItemChildren={(option, props) => (
          <Fragment>
            {/* <img
              alt={option.login}
              src={option.avatar_url}
              style={{
                height: "24px",
                marginRight: "10px",
                width: "24px",
              }}
            /> */}
            <span>{option.barcode}</span>
          </Fragment>
        )}
      />
      {/* <button onClick={handleScan}>scan</button> */}
    </div>
  );
}
