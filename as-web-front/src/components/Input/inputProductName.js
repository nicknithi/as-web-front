import React, { useState, useEffect, Fragment, useRef } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../assets/scss/components/input/input-barcode.scss";
import { Button } from "react-bootstrap";
import http from "../../axios";
export default function InputProductName({
  handleEvent,
  index,
  FormDataProduct,
  setFormDataProduct,
  Confirm,
}) {
  const typeahead = useRef(null);
  const [SelectedPN, setSelectedPN] = useState([]);
  const manualInput = (e) => {
    console.log(e);
    if (e.length) {
      setPD(e);
      console.log("e", e);
      handleEvent(
        e[0].id,
        e[0].fK_Model_ID,
        e[0].fK_Type_ID,
        e[0].product_Code,
        e[0].product_Barcode,
        e[0].value
      );
    } else {
      setPD([]);
      handleEvent("", 0, "", "", "");
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    http
      .post(`/api/Product/GetProductTop20ByName`, {
        Lang_ID: 1,
        Product_Name: query,
      })
      .then((res) => {
        console.log("5678", res);
        if (res.data.message === "Success!") {
          console.log(res.data.data);
          const option = res.data.data.map((item, index) => {
            return {
              id: item.id,
              value: item.product_Name,
              index: index,
              fK_Model_ID: item.fK_Model_ID,
              fK_Type_ID: item.fK_Type_ID,
              product_Barcode: item.product_Barcode,
              product_Code: item.product_Code,
            };
          });
          setOptions(option);
          setIsLoading(false);
        } else {
          console.log(FormDataProduct[index].Purchase_Province);
        }
        if (res.data.message === "Fail!") {
          setIsLoading(false);
        }
      });
  };
  const filterBy = () => true;
  const [PD, setPD] = useState([]);
  useEffect(() => {
    if (FormDataProduct[index].product_Name) {
      const OPD = [...PD];
      OPD[0] = {
        id: null,
        value: "",
        index: null,
        fK_Model_ID: null,
        fK_Type_ID: null,
        product_Code: null,
      };
      OPD[0].value = FormDataProduct[index].product_Name || "";
      setPD(OPD);
    } else {
      const OPD = [...PD];
      setPD((OPD[0] = []));
    }
  }, [FormDataProduct[index].product_Name]);
  return (
    <div className="input-barcode">
      <AsyncTypeahead
        ref={typeahead}
        disabled={!Confirm}
        filterBy={filterBy}
        id="async-example"
        // defaultSelected={PD}
        isLoading={isLoading}
        labelKey="value"
        minLength={3}
        onSearch={handleSearch}
        onChange={manualInput}
        options={options}
        selected={PD}
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
            <span>{option.value}</span>
          </Fragment>
        )}
      />
      {/* <button onClick={handleScan}>scan</button> */}
    </div>
  );
}
