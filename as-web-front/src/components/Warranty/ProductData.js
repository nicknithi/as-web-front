import React, { useState } from "react";
import ButtonManageForm from "../button/ButtonManageForm";
import UploadImage from "../Warranty/uploadImage";
import InputScanBarCode from "../Input/InputScanBarCode";
import ScanBarCode from "../BarCode/ScanBarCode";
export default function ProductData({
  handleChangInput,
  index,
  FormDataProduct,
  handleGetFileForm,
}) {
  const handleScan = () => {
    setTriggleBarcode(true);
  };
  const handleGetFile = (file, index) => {
    handleGetFileForm(file, index);
  };
  const [triggleBarcode, setTriggleBarcode] = useState(false);
  console.log("test nick", FormDataProduct[index]);
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
                name="Purchase_Province"
                onChange={handleChangInput}
                disabled={FormDataProduct[index].Purchase_Province}
                value={FormDataProduct[index].Purchase_Province}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">วัน/เดือน/ปี ที่ซื้อ*</label>
              <input
                type="text"
                index={index}
                name="Purchase_Date"
                onChange={handleChangInput}
                disabled={FormDataProduct[index].Purchase_Date}
                value={FormDataProduct[index].Purchase_Date}
                className="as-input"
                required
              />
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
                disabled={FormDataProduct[index].Store_ID}
                value={FormDataProduct[index].Store_ID}
                className="as-input"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">
                ชื่อร้านตัวแทนจำหน่าย (อื่นๆ)
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
              <InputScanBarCode handleEvent={handleChangInput} index={index} />
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
              <input
                type="text"
                className="as-input"
                index={index}
                name="Type_ID"
                onChange={handleChangInput}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">รหัสสินค้า*</label>
              <input
                type="textarea"
                className="as-input"
                index={index}
                name="Product_ID"
                onChange={handleChangInput}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อรุ่น*</label>
              <input
                type="text"
                className="as-input"
                index={index}
                name="Model_ID"
                onChange={handleChangInput}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">รหัสสินค้า (อื่นๆ)</label>
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
                type="text"
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
