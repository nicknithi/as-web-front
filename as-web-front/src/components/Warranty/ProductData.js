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
  useEffect(async () => {
    const resTypeID = await getProductType();
    setDataTypeId([...dataTypeID, ...resTypeID]);
    setTypeId([...typeId, ...resTypeID]);
  }, []);

  const [dataTypeID, setDataTypeId] = useState([
    { id: 0, value: "กรุณาเลือก" },
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
  const [typeId, setTypeId] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [modelId, setModelId] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [productCode, setProduct] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [startDate, setStartDate] = useState(new Date());

  const getStoreByProvince = async (Province_id) => {
    const storeDataSet = await getStoreByProvinceData(Province_id);
    const storeDataSetTemp = [...storeData];

    const dpStoreData = [{ id: "", value: "กรุณาเลือก" }, ...storeDataSet];
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
    console.log("type 5555", type);
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
  const handleScanBarCode = () => {
    setTriggleBarcode(true);
  };
  return (
    <div>
      <div className="mt-3">
        <h3 className="font-weight-bold mb-3">ข้อมูลสินค้า {index + 1}</h3>
        <div className="product-data">
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">จังหวัดที่ซื้อ*</label>
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
              <label className="font-weight-bold">วัน/เดือน/ปี ที่ซื้อ*</label>
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
              <label className="font-weight-bold">ชื่อร้านตัวแทนจำหน่าย</label>
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
              <label className="font-weight-bold">
                ชื่อร้านตัวแทนจำหน่าย (กรณีค้นหาไม่พบ)
              </label>
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
              <label className="font-weight-bold">หมายเลขใบเสร็จ*</label>
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
              <label className="font-weight-bold">
                รหัสบาร์โค้ด (แสดงที่สติกเกอร์ของกล่องสินค้า)
              </label>
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
                  สแกนบาร์โค้ด
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
              <label className="font-weight-bold">
                หมายเลขรับประกัน/หมายเลขซีเรียลผลิตภัณฑ์
              </label>
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
              <label className="font-weight-bold">รหัสสินค้า*</label>
              <InputProcuctCode
                Confirm={Confirm}
                handleEvent={handleChangInputProductCode}
                index={index}
                FormDataProduct={FormDataProduct}
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อสินค้า</label>
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
              <label className="font-weight-bold">ประเภทสินค้า*</label>
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
              <label className="font-weight-bold">ชื่อรุ่น*</label>

              <DropDownModelId
                index={index}
                data={modelId}
                handleEvent={handleChangInput}
              />
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold mt-3">
                รหัสสินค้า (กรณีค้นหาไม่พบ)
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
              <label className="font-weight-bold mt-3">จำนวนชิ้นที่ซื้อ</label>
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
