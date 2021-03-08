import React, { useState, useEffect, Fragment } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../assets/scss/components/input/input-barcode.scss";
import http from "../../axios";
export default function InputProductName({
  handleEvent,
  index,
  FormDataProduct,
  setFormDataProduct,
}) {
  const manualInput = (e) => {
    if (e.length) {
      handleEvent(e[0].fK_Model_ID, e[0].fK_Type_ID, e[0].product_Code);
    } else {
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
  useEffect(() => {}, []);
  return (
    <div className="input-barcode">
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="value"
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
            <span>{option.value}</span>
          </Fragment>
        )}
      />
      {/* <button onClick={handleScan}>scan</button> */}
    </div>
  );
}
