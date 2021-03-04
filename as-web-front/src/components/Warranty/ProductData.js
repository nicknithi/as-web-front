import React, { useState } from "react";
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
export default function ProductData({
  handleChangInput,
  index,
  FormDataProduct,
  handleGetFileForm,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const handleScan = () => {
    setTriggleBarcode(true);
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
              {/* <input
                type="text"
                className="as-input"
                index={index}
                // defaultValue={"tesetsete nickets"}
                name="Purchase_Province"
                onChange={handleChangInput}
                disabled={FormDataProduct[index].Purchase_Province}
                value={FormDataProduct[index].Purchase_Province}
                required
              /> */}
              <DropDownPurchaseProvince
                index={index}
                handleEvent={handleChangInput}
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
                  selected={startDate}
                  onChange={(date) => handleSetDateTime(date, index)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อร้านตัวแทนจำหน่าย</label>
              {/* <input
                type="textarea"
                index={index}
                name="Store_ID"
                onChange={handleChangInput}
                disabled={FormDataProduct[index].Store_ID}
                value={FormDataProduct[index].Store_ID}
                className="as-input"
                required
              /> */}
              <DropDownStoreId index={index} handleEvent={handleChangInput} />
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
                required
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
                handleEvent={handleChangInput}
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
              <DropDownTypeId index={index} handleEvent={handleChangInput} />
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
              <DropDownProductId index={index} handleEvent={handleChangInput} />
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
              <DropDownModelId index={index} handleEvent={handleChangInput} />
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
                required
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
