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
    } else {
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    http
      .post(`/api/Product/GetStoreByName`, {
        Lang_ID: 1,
        Province_ID: parseInt(FormDataProduct[index].Purchase_Province),
        Store_Name: query,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success!") {
          console.log(res.data.data);

          //   const productID = [...FormDataProduct];
          //   productID[index].Product_ID = query;
          //   setFormDataProduct(productID);
          //   const option = res.data.data.map((item, index) => {
          //     return {
          //       id: item.id,
          //       value: item.product_Name,
          //       index: index,
          //       fK_Model_ID: item.fK_Model_ID,
          //       fK_Type_ID: item.fK_Type_ID,
          //       barcode: item.product_Barcode,
          //     };
          //   });
          //   setOptions(option);
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
        disabled={!FormDataProduct[index].Purchase_Province}
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
