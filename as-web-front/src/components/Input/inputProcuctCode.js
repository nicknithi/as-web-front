import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useRef,
} from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../../assets/scss/components/input/input-barcode.scss";
import { useCookies } from "react-cookie";
import http from "../../axios";
export default function InputProcuctCode({
  handleEvent,
  index,
  FormDataProduct,
  Confirm,
}) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const typeahead = useRef(null);
  const manualInput = (e) => {
    if (e.length) {
      setPD(e);
      handleEvent(
        e[0].id,
        e[0].fK_Model_ID,
        e[0].fK_Type_ID,
        e[0].product_Code,
        e[0].product_Barcode,
        e[0].product_Name
      );
    } else {
      setPD([]);
      handleEvent("", 0, "", "", "");
    }
  };
  const [PD, setPD] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    http
      .post(`/api/Product/GetProductTop20ByCode`, {
        Lang_ID: lang,
        Product_Code: query.toUpperCase(),
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success!") {
          console.log("check check", res.data);
          const option = res.data.data.map((item, index) => {
            return {
              id: item.id,
              value: item.product_Name,
              index: index,
              fK_Model_ID: item.fK_Model_ID,
              fK_Type_ID: item.fK_Type_ID,
              product_Code: item.product_Code,
              product_Old_Code: item.product_Old_Code,
              product_Barcode: item.product_Barcode,
              product_Name: item.product_Name,
            };
          });
          const setNewOption = [];
          option.forEach((item, index) => {
            setNewOption.push({
              ...item,
              optionShow: `${item.product_Code} (new)`,
            });
            setNewOption.push({
              ...item,
              optionShow: `${item.product_Old_Code} (old)`,
            });
          });

          setOptions(setNewOption);
          setIsLoading(false);
        } else {
        }
        if (res.data.message === "Fail!") {
          setIsLoading(false);
        }
      });
  };
  const filterBy = () => true;
  useEffect(() => {
    if (FormDataProduct[index].Product_code) {
      const OPD = [...PD];
      OPD[0] = {
        id: null,
        value: null,
        index: null,
        fK_Model_ID: null,
        fK_Type_ID: null,
        product_Code: "",
      };
      OPD[0].product_Code = FormDataProduct[index].Product_code;
      setPD(OPD);
    } else {
      const OPD = [...PD];
      setPD((OPD[0] = []));
    }
    typeahead.current.hideMenu();
  }, [FormDataProduct[index].Product_code]);

  useEffect(() => {
    document.querySelector(
      `.input-product-code-${index} .rbt input`
    ).required = true;
  }, []);
  return (
    <div className={`input-barcode input-product-code-${index}`}>
      <AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        // defaultSelected={PD}
        ref={typeahead}
        disabled={!Confirm}
        isLoading={isLoading}
        labelKey="product_Code"
        minLength={3}
        onSearch={handleSearch}
        onChange={manualInput}
        options={options}
        placeholder=""
        selected={PD}
        required={true}
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
            <span>{option.optionShow}</span>
          </Fragment>
        )}
      />
      {/* <button onClick={handleScan}>scan</button> */}
    </div>
  );
}
