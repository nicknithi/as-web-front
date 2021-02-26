import React from "react";
import ButtonManageForm from "../button/ButtonManageForm";
export default function ProductData() {
  return (
    <div>
      <div className="mt-3">
        <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>
        <div className="product-data">
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">จังหวัดที่ซื้อ*</label>
              <input type="text" className="as-input" required />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">วัน/เดือน/ปี ที่ซื้อ*</label>
              <input type="textarea" className="as-input" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อร้านตัวแทนจำหน่าย</label>
              <input type="textarea" className="as-input" required />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">
                ชื่อร้านตัวแทนจำหน่าย (อื่นๆ)
              </label>
              <input type="textarea" className="as-input" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">หมายเลขใบเสร็จ*</label>
              <input type="textarea" className="as-input" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">
                รหัสบาร์โค้ด (แสดงที่สติกเกอร์ของกล่องสินค้า)
              </label>
              <input type="text" className="as-input" required />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">หมายเลขรับประกัน</label>
              <input type="textarea" className="as-input" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ประเภทสินค้า*</label>
              <input type="text" className="as-input" required />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">รหัสสินค้า*</label>
              <input type="textarea" className="as-input" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อรุ่น*</label>
              <input type="text" className="as-input" required />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">รหัสสินค้า (อื่นๆ)</label>
              <input type="textarea" className="as-input" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">จำนวนชิ้นที่ซื้อ</label>
              <input type="text" className="as-input" required />
            </div>
          </div>
          <ButtonManageForm />
        </div>
      </div>
    </div>
  );
}
