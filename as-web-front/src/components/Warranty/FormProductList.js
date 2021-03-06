import React, { useState } from "react";
import UploadImage from "../Warranty/uploadImage";
import ScanBarCode from "../BarCode/ScanBarCode";
import InputScanBarCode from "../Input/InputScanBarCode";
export default function FormProductList({ handleChangInput }) {
  const handleScan = () => {
    setTriggleBarcode(true);
  };
  const [triggleBarcode, setTriggleBarcode] = useState(false);
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <label className="font-weight-bold">จังหวัดที่ซื้อ*</label>
          <input
            type="text"
            className="as-input"
            name="Purchase_Province"
            onChange={handleChangInput}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="font-weight-bold">วัน/เดือน/ปี ที่ซื้อ*</label>
          <input
            type="text"
            name="Purchase_Date "
            onChange={handleChangInput}
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
            name="Store_ID"
            onChange={handleChangInput}
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
            name="Store_Name_Other"
            onChange={handleChangInput}
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
            name="Receipt_Number"
            onChange={handleChangInput}
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
          <InputScanBarCode handleEvent={handleScan} />
          {triggleBarcode && <ScanBarCode />}
        </div>
        <div className="col-md-6">
          <label className="font-weight-bold">หมายเลขรับประกัน</label>
          <input
            type="text"
            className="as-input"
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
            className="as-input"
            name="QTY"
            onChange={handleChangInput}
            required
          />
        </div>
      </div>
      <div className="row mt-4">
        <UploadImage />
      </div>
    </div>
  );
}
