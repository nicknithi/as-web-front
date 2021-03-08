import React, { useState, useEffect } from "react";
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
import dataMock from "../../dataMock";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/scss/components/input/dataPicker.scss";
import http from "../../axios";
export default function ProductData({
  handleChangInput,
  index,
  FormDataProduct,
  handleGetFileForm,
}) {
  useEffect(() => {
    http.post("/api/Product/GetAllProduct").then((res) => {
      console.log("product", res.data.data);
      const data = res.data.data.map((item, index) => {
        return { id: item.id, value: item.product_Name_TH };
      });
      setdataProductID(data);
      //setProduct(data);
    });
    http.post("/api/Product/GetAllProductType").then((res) => {
      const data = res.data.data.map((item, index) => {
        return { id: item.type_ID, value: item.type_Name_TH };
      });
      setDataTypeId(data);
      //setTypeId(data);
    });
    http.post("/api/Product/GetAllProductModel").then((res) => {
      console.log("model ", res.data.data);
      const data = res.data.data.map((item, index) => {
        return { id: item.id, value: item.model_Name_TH };
      });
      setDataModelID(data);
      //setModelId(data);
    });
  }, []);
  const [dataTypeID, setDataTypeId] = useState([]);
  const [dataModelID, setDataModelID] = useState([]);
  const [dataProductID, setdataProductID] = useState([]);
  const [typeId, setTypeId] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [modelId, setModelId] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [productCode, setProduct] = useState([{ id: 0, value: "กรุณาเลือก" }]);
  const [startDate, setStartDate] = useState(new Date());
  const handleScan = () => {
    setTriggleBarcode(true);
  };
  const handleChangInputBarcode = (e) => {
    handleChangInput(e);
    console.log("test");
    http
      .post(`/api/Product/GetProductTop20ByBarcode?Barcode=${e.target.value}`)
      .then((res) => {
        console.log(res);
        if (res.data.message === "Success!") {
          setTypeId([
            dataTypeID.find((d) => d.id === res.data.data[0].fK_Type_ID),
          ]);
          setProduct([dataProductID.find((d) => d.id === res.data.data[0].id)]);
          setModelId([
            dataModelID.find((d) => d.id === res.data.data[0].fK_Model_ID),
          ]);
        }
      });
  };
  const handleGetFile = (file, index) => {
    handleGetFileForm(file, index);
  };
  const handleSetDateTime = (d, i) => {
    console.log(d, i);
    document.getElementById("Purchase_Date").value = formatDate(d);
    document.getElementById("Purchase_Date").attributes.index.value = i;
    handleChangInput(document.getElementById("Purchase_Date"));
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

  return (
    <div>
      <div className="mt-3">
        <h3 className="font-weight-bold mb-3">ข้อมูลสินค้า {index + 1}</h3>
        <div className="product-data">
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">จังหวัดที่ซื้อ*</label>
              <input
                type="text"
                className="as-input"
                index={index}
                // defaultValue={"tesetsete nickets"}
                name="Purchase_Province"
                onChange={handleChangInput}
                disabled
                value={FormDataProduct[index].Purchase_Province}
                required
              />
              {/* <DropDownPurchaseProvince
                index={index}
                handleEvent={handleChangInput}
              /> */}
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">วัน/เดือน/ปี ที่ซื้อ*</label>
              <input
                type="text"
                index={index}
                name="Purchase_Date"
                id="Purchase_Date"
                value={FormDataProduct[index].Purchase_Date}
              />
              {/* <div className="row px-3 data-picker">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleSetDateTime(date, index)}
                />
              </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อร้านตัวแทนจำหน่าย</label>
              <input
                type="textarea"
                index={index}
                name="Store_ID"
                onChange={handleChangInput}
                disabled
                value={FormDataProduct[index].Store_ID}
                className="as-input"
                required
              />
              {/* <DropDownStoreId index={index} handleEvent={handleChangInput} /> */}
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
                onChange={handleChangInput}
                disabled={FormDataProduct[index].Store_Name_Other}
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
                onChange={handleChangInput}
                disabled={FormDataProduct[index].Receipt_Number}
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
              <InputScanBarCode
                handleEvent={handleChangInputBarcode}
                handleScan={handleScan}
                index={index}
              />
              {triggleBarcode && <ScanBarCode />}
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">หมายเลขรับประกัน</label>
              <input
                type="text"
                className="as-input"
                index={index}
                name="Warranty_Number"
                onChange={handleChangInput}
                required
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
                index={index}
                data={typeId}
                // selectedAS={typeId}
                handleEvent={handleChangInput}
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">รหัสสินค้า*</label>
              {/* <input
                type="textarea"
                className="as-input"
                index={index}
                name="Product_ID"
                onChange={handleChangInput}
                required
              /> */}
              <DropDownProductId
                index={index}
                data={productCode}
                handleEvent={handleChangInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold mt-3">ชื่อรุ่น*</label>
              {/* <input
                type="text"
                className="as-input"
                index={index}
                name="Model_ID"
                onChange={handleChangInput}
                required
              /> */}
              <DropDownModelId
                index={index}
                data={modelId}
                handleEvent={handleChangInput}
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold mt-3">
                รหัสสินค้า (กรณีค้นหาไม่พบ)
              </label>
              <input
                type="textarea"
                className="as-input"
                index={index}
                name="Product_Code_Other"
                onChange={handleChangInput}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">จำนวนชิ้นที่ซื้อ</label>
              <input
                type="number"
                index={index}
                className="as-input"
                name="QTY"
                onChange={handleChangInput}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <UploadImage handleGetFile={handleGetFile} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}