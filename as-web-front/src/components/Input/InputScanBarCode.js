import React, { useState, useEffect, Fragment } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../assets/scss/components/input/input-barcode.scss";
import http from "../../axios";
export default function InputScanBarCode({
  handleEvent,
  handleScan,
  index,
  FormDataProduct,
  Confirm,
}) {
  const manualInput = (e) => {
    console.log("555");
    if (e.length) {
      document.getElementById("Barcode_Number").value = e[0].id;
      // console.log(document.getElementById("Barcode_Number"));
      setPD(e);
      handleEvent(
        e[0].id,
        e[0].fK_Model_ID,
        e[0].fK_Type_ID,
        e[0].barcode,
        e[0].product_code,
        e[0].product_Name
      );
    } else {
      handleEvent("", "", 0, "", "", "");
      setPD([]);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);
    http
      .post(`/api/Product/GetProductTop20ByBarcode`, {
        Lang_ID: 1,
        Product_Barcode: query,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success!") {
          console.log("by bar code", res.data.data);
          const option = res.data.data.map((item, index) => {
            return {
              id: item.id,
              value: item.product_Name,
              index: index,
              fK_Model_ID: item.fK_Model_ID,
              fK_Type_ID: item.fK_Type_ID,
              barcode: item.product_Barcode,
              product_code: item.product_Code,
              product_Name: item.product_Name,
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

  const [PD, setPD] = useState([]);
  useEffect(() => {
    if (FormDataProduct[index].Barcode_Number) {
      const OPD = [...PD];
      OPD[0] = {
        id: null,
        value: null,
        index: null,
        fK_Model_ID: null,
        fK_Type_ID: null,
        barcode: "",
        product_code: null,
        product_Name: null,
      };
      OPD[0].barcode = FormDataProduct[index].Barcode_Number || "";
      setPD(OPD);
    } else {
      const OPD = [...PD];
      setPD((OPD[0] = []));
    }
  }, [FormDataProduct[index].Barcode_Number]);
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
        // defaultSelected={PD}
        disabled={!Confirm}
        selected={PD}
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
