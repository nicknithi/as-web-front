import React from "react";
import { connect } from "react-redux";
function FormComfirm(props) {
  console.log(props.data.DataDropdownReducer.temp_data_input_warranty);
  return (
    <div>
      <h3>การลงทะเบียนสินค้า</h3>

      <div>
        <h2>ข้อมูลลูกค้า</h2>
        <div>
          สมาชิกบริการ (ถ้ามี) :
          <br />
          ชื่อ:
          <br />
          เบอร์โทรศัพท์:
          <br />
          มือถือ:
          <br />
          อีเมล:
          <br />
        </div>
      </div>
      <div>
        <h2>ที่อยู่การติดตั้ง</h2>
        <div>ที่อยู่การติดตั้งสินค้า :</div>
      </div>
      <div>
        <h2>ข้อมูลสินค้า</h2>
        <div>
          จังหวัดที่ซื้อ :
          <br />
          วันที่ซื้อ:
          <br />
          ชื่อร้านค้า:
          <br />
          หมายเลขใบเสร็จ:
          <br />
          หมายเลขรับประกัน:
          <br />
          ประเภทสินค้า:
          <br />
          รหัสสินค้า:
          <br />
          รหัสสินค้า (อื่น ๆ): ชื่อรุ่น:
          <br />
          จำนวนชิ้นที่ซื้อ: 3
          <br />
          รหัสบาร์โค๊ด :
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(FormComfirm);
