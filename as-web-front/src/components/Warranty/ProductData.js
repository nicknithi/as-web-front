import React, { useState, useEffect } from "react";
import "../../assets/scss/components/button/button-scan.scss";
import ButtonManageForm from "../button/ButtonManageForm";
import UploadImage from "../Warranty/uploadImage";
import InputScanBarCode from "../Input/InputScanBarCode";
import ScanBarCode from "../BarCode/ScanBarCode";
import DatePicker from "react-datepicker";
import DropDownPurchaseProvince from "../Input/dropDownPurchaseProvince";
import DropDownStoreId from "../Input/dropDownStore_ID";
import DropDownTypeId from "../Input/dropDownType_ID";
import DropDownProductId from "../Input/dropDownProduct_ID";
import DropDownModelId from "../Input/dropDownModel_ID";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/scss/components/input/dataPicker.scss";
import InputProcuctCode from "../Input/inputProcuctCode";
import InputProcuctName from "../Input/inputProductName";
import http from "../../axios";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { getProductType, getStoreByProvinceData } from "../../GetDataDropDown";
export default function ProductData({
  handleChangInput,
  index,
  handleGetFileForm,
  FormDataProduct,
  setFormDataProduct,
  Province,
  storeData,
  setStoreData,
  Confirm,
  FileWaranty,
}) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  useEffect(async () => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    const resTypeID = await getProductType(lang);
    setDataTypeId([
      { id: 0, value: t("warranthForm.selectType") },
      ...resTypeID,
    ]);
    setTypeId([{ id: 0, value: t("warranthForm.selectType") }, ...resTypeID]);
  }, []);

  const [dataTypeID, setDataTypeId] = useState([
    { id: 0, value: t("warranthForm.selectType") },
  ]);
  const [dataModelID, setDataModelID] = useState([
    { id: 0, value: "กรุณาเลือก" },
  ]);
  const [dataProductID, setdataProductID] = useState([
    { id: 0, value: "กรุณาเลือก" },
  ]);
  const GetProduct = async (code) => {
    const ProductDataSet = await http.post("/api/Product/GetProductByCode", {
      Lang_ID: 1,
      Product_Code: code,
    });
    return ProductDataSet;
  };

  const [typeId, setTypeId] = useState([
    { id: 0, value: t("warranthForm.selectType") },
  ]);
  const [modelId, setModelId] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [productCode, setProduct] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [startDate, setStartDate] = useState(new Date());

  const getStoreByProvince = async (Province_id) => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    const storeDataSet = await getStoreByProvinceData(Province_id, lang);
    const storeDataSetTemp = [...storeData];

    const dpStoreData = [
      { id: "", value: t("warranthForm.selectStore") },
      ...storeDataSet,
    ];
    storeDataSetTemp[index] = dpStoreData;
    setStoreData(storeDataSetTemp);
  };
  const handleChangInputProductCode = (
    id,
    ModelId,
    TypeId,
    product_code,
    product_Barcode,
    product_Name
  ) => {
    const ProductCodeSet = [...FormDataProduct];
    ProductCodeSet[index].Model_ID = ModelId;
    ProductCodeSet[index].Type_ID = TypeId;
    ProductCodeSet[index].Product_code = product_code;
    ProductCodeSet[index].Product_ID = id;
    ProductCodeSet[index].Barcode_Number = product_Barcode;
    ProductCodeSet[index].product_Name = product_Name;
    setFormDataProduct(ProductCodeSet);
    const type = dataTypeID.find((d) => d.id === TypeId);

    if (type !== undefined && TypeId !== 0) {
      setTypeId([type]);
    } else {
      setTypeId(dataTypeID);
    }

    const Model = dataModelID.find((d) => d.id === ModelId);
    if (Model !== undefined) {
      setModelId([Model]);
    }
  };
  const handleChangInputBarcode = async (
    id,
    ModelId,
    TypeId,
    BarCode,
    product_code,
    product_Name
  ) => {
    console.log(id, ModelId, TypeId, BarCode, product_code);
    const barCodeSet = [...FormDataProduct];
    barCodeSet[index].Barcode_Number = BarCode;
    barCodeSet[index].Product_ID = id;
    barCodeSet[index].Model_ID = ModelId;
    barCodeSet[index].Type_ID = TypeId;
    barCodeSet[index].Product_code = product_code;
    barCodeSet[index].product_Name = product_Name;
    setFormDataProduct(barCodeSet);

    // const ProductData = await GetProduct(product_code);
    // console.log("Product 12312", ProductData);
    // if (allProduct.data.message === "Success!" && allProduct.data.data.length) {
    //   const Product allProduct.data.data.map((item, index) => {
    //     return
    //   });
    // }
    const type = dataTypeID.find((d) => d.id === TypeId);
    if (type !== undefined) {
      setTypeId([type]);
    } else {
      setTypeId(dataTypeID);
    }
    // const Product = dataProductID.find((d) => d.id === id);
    // if (Product !== undefined) {
    //   setProduct([Product]);
    // }
    const Model = dataModelID.find((d) => d.id === ModelId);
    if (Model !== undefined) {
      setModelId([Model]);
    }
  };
  const handleGetFile = (file, index) => {
    handleGetFileForm(file, index);
  };
  const handleSetDateTime = (d, i) => {
    const dataSet = [...FormDataProduct];
    dataSet[i].Purchase_Date = d;
    setFormDataProduct(dataSet);
    document.getElementById("Purchase_Date").value = formatDate(d);
    document.getElementById("Purchase_Date").attributes.index.value = i;
    setStartDate(d);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const [triggleBarcode, setTriggleBarcode] = useState(false);
  const Store_Name_Other = (e) => {
    const Store_Name_OtherSet = [...FormDataProduct];
    Store_Name_OtherSet[index].Store_Name_Other = e.target.value;
    setFormDataProduct(Store_Name_OtherSet);
  };
  const handleSetReceipNumber = (e) => {
    const setOnOtherCodeSet = [...FormDataProduct];
    setOnOtherCodeSet[index].Receipt_Number = e.target.value;
    setFormDataProduct(setOnOtherCodeSet);
  };
  const setOnOtherCode = (e) => {
    const setOnOtherCodeSet = [...FormDataProduct];
    setOnOtherCodeSet[index].Product_Code_Other = e.target.value;

    setFormDataProduct(setOnOtherCodeSet);
  };
  useEffect(() => {
    if (FormDataProduct[index].Product_Code_Other) {
      console.log("if");
      document.querySelector(
        `.input-product-code-${index} .rbt input`
      ).required = false;
    } else {
      console.log("else test12");
      document.querySelector(
        `.input-product-code-${index} .rbt input`
      ).required = true;
    }
  }, [FormDataProduct[index].Product_Code_Other]);
  const handleScanBarCode = () => {
    setTriggleBarcode(true);
  };
  return (
    <div>
      <div className="mt-3">
        <h3 className=" mb-3">
          {t("warranthForm.productTitle")} {index + 1}
        </h3>
        <div className="product-data">
          <div className="row">
            <div className="col-md-6">
              <label className="">{t("warranthForm.productProvince")}</label>
              <DropDownPurchaseProvince
                data={Province}
                index={index}
                Confirm={Confirm}
                handleEvent={getStoreByProvince}
                FormDataProduct={FormDataProduct}
                setFormDataProduct={setFormDataProduct}
              />
            </div>
            <div className="col-md-6">
              <label className="">{t("warranthForm.productDate")}</label>
              <input
                type="hidden"
                index={index}
                name="Purchase_Date"
                id="Purchase_Date"
                value=""
              />
              <div className="row px-3 data-picker">
                <DatePicker
                  disabled={!Confirm}
                  selected={FormDataProduct[index].Purchase_Date}
                  onChange={(date) => handleSetDateTime(date, index)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="">{t("warranthForm.storeName")}</label>
              <DropDownStoreId
                Confirm={Confirm}
                data={storeData[index]}
                index={index}
                handleEvent={handleChangInput}
                FormDataProduct={FormDataProduct}
                setFormDataProduct={setFormDataProduct}
              />
            </div>
            <div className="col-md-6">
              <label className="">{t("warranthForm.OtherStoreName")}</label>
              <input
                type="textarea"
                className="as-input"
                index={index}
                name="Store_Name_Other"
                onChange={(e) => Store_Name_Other(e)}
                disabled={FormDataProduct[index].Store_ID || !Confirm}
                value={FormDataProduct[index].Store_Name_Other}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="">{t("warranthForm.recipe")}</label>
              <input
                type="textarea"
                className="as-input"
                index={index}
                name="Receipt_Number"
                onChange={(e) => {
                  handleSetReceipNumber(e);
                }}
                disabled={!Confirm}
                value={FormDataProduct[index].Receipt_Number}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="">{t("warranthForm.barCode")}</label>
              {/* <input type="text" className="as-input" required /> */}
              <div className="row">
                <div className="col-10">
                  <InputScanBarCode
                    Confirm={Confirm}
                    handleEvent={handleChangInputBarcode}
                    index={index}
                    FormDataProduct={FormDataProduct}
                  />
                </div>
                <div className="col-2 btn-scan" onClick={handleScanBarCode}>
                  {t("warranthForm.scanBarcode")}
                </div>
              </div>

              {triggleBarcode && (
                <ScanBarCode
                  index={index}
                  setTriggleBarcode={setTriggleBarcode}
                  FormDataProduct={FormDataProduct}
                  setFormDataProduct={setFormDataProduct}
                  handleEvent={handleChangInputBarcode}
                />
              )}
            </div>
            <div className="col-md-6">
              <label className="">{t("warranthForm.warrantyCode")}</label>
              <input
                type="text"
                className="as-input"
                disabled={!Confirm}
                index={index}
                name="Warranty_Number"
                onChange={handleChangInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="">{t("warranthForm.productCode")}</label>
              <InputProcuctCode
                Confirm={Confirm}
                handleEvent={handleChangInputProductCode}
                index={index}
                FormDataProduct={FormDataProduct}
              />
            </div>
            <div className="col-md-6">
              <label className="">{t("warranthForm.productName")}</label>
              <InputProcuctName
                Confirm={Confirm}
                handleEvent={handleChangInputProductCode}
                index={index}
                FormDataProduct={FormDataProduct}
                setFormDataProduct={setFormDataProduct}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="">{t("warranthForm.productType")}</label>
              {/* <input
                type="text"
                className="as-input"
                index={index}
                name="Type_ID"
                onChange={handleChangInput}
                required
              /> */}
              <DropDownTypeId
                Confirm={Confirm}
                index={index}
                data={typeId}
                // selectedAS={typeId}
                handleEvent={handleChangInput}
              />
            </div>
            {/* <div className="col-md-6">
              <label className="">ชื่อรุ่น*</label>

              <DropDownModelId
                index={index}
                data={modelId}
                handleEvent={handleChangInput}
              />
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className=" mt-3">
                {t("warranthForm.OtherProductCode")}
              </label>
              <input
                type="textarea"
                className="as-input"
                index={index}
                name="Product_Code_Other"
                disabled={!Confirm}
                value={FormDataProduct[index].Product_Code_Other}
                onChange={setOnOtherCode}
              />
            </div>
            <div className="col-md-6">
              <label className=" mt-3">{t("warranthForm.qty")}</label>
              <input
                disabled={!Confirm}
                type="number"
                index={index}
                className="as-input"
                name="QTY"
                onChange={handleChangInput}
              />
            </div>
          </div>
          <div className="row mt-4">
            <UploadImage
              handleGetFile={handleGetFile}
              index={index}
              Confirm={Confirm}
              FileWaranty={FileWaranty}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
