import React from "react";

export default function MemberData() {
  return (
    <div className="mt-3">
      <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">สมาชิกบริการ (ถ้ามี)</label>
            <input type="text" className="as-input" required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">ชื่อ</label>
            <input type="textarea" className="as-input" required />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">นามสกุล</label>
            <input type="textarea" className="as-input" required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">เบอร์โทรศัพท์</label>
            <input type="textarea" className="as-input" required />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">มือถือ*</label>
            <input type="textarea" className="as-input" required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="font-weight-bold">
              อีเมล (โปรดระบุเพื่อให้ระบบส่งข้อความยืนยันการลงทะเบียน)
            </label>
            <input type="textarea" className="as-input" required />
          </div>
        </div>
      </div>
    </div>
  );
}
