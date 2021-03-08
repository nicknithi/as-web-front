import React, { useState, useEffect, Fragment, useReducer } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../assets/scss/components/input/input-barcode.scss";
import http from "../../axios";
export default function InputProcuctCode({
  handleEvent,
  index,
  FormDataProduct,
}) {
  const manualInput = (e) => {
    if (e.length) {
      handleEvent(e[0].fK_Model_ID, e[0].fK_Type_ID, e[0].product_Code);
    } else {
    }
  };
  const [PD, setPD] = useState([
    {
      id: null,
      value: null,
      index: null,
      fK_Model_ID: null,
      fK_Type_ID: null,
      product_Code: "",
    },
  ]);
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
          const option = res.data.data.map((item, index) => {
            return {
              id: item.id,
              value: item.product_Name,
              index: index,
              fK_Model_ID: item.fK_Model_ID,
              fK_Type_ID: item.fK_Type_ID,
              product_Code: item.product_Code,
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
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        if (FormDataProduct[index].Product_code) {
          const OPD = [...PD];
          OPD[0].product_Code = FormDataProduct[index].Product_code;
          setPD(OPD);
        }

        break;
      default:
        setPD("");
        break;
    }
  }
  const [state, dispatch] = useReducer(reducer, "");
  useEffect(() => {
    dispatch({ type: "increment" });
    console.log("test");
  }, [FormDataProduct]);
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
        defaultSelected={PD}
        isLoading={isLoading}
        labelKey="product_Code"
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
            <span>{option.product_Code}</span>
          </Fragment>
        )}
      />
      {/* <button onClick={handleScan}>scan</button> */}
    </div>
  );
}
