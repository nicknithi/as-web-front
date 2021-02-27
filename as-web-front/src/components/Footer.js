import React from "react";
import "../assets/scss/footer.scss";
import logoFooter from "../assets/img/Logo2INAX.png";
export default function Footer() {
  return (
    <footer className="as-footer pt-5 pb-5">
      <div class="site-content">
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>
                บริการ
                <ul>
                  <li>ขอบเขตการบริการ</li>
                  <li>ศูนย์บริการ สาขา</li>
                </ul>
              </li>
              <li>
                โปรโมชั่น
                <ul>
                  <li>ฟรีบริการติดตั้ง </li>
                  <li>(ความครอบคลุมและเงื่อนไข)</li>
                  <li>คูปองส่วนลด</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>
                ความรู้ด้านเทคนิค
                <ul>
                  <li>ระบบการชำระล้าง</li>
                  <li>เทคโนโลยี่ไฮยีนคลีน</li>
                  <li>อะควาเซรามิก</li>
                  <li>ขนาดท่อและแรงดันน้ำสำหรับสุขภัณฑ์</li>
                  <li>การแก้ไขปัญหาผลิตภัณฑ์</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>การบำรุงรักษาและการแก้ไขปัญหา</li>
              <li>การติดตั้ง</li>
              <li>อะไหล่</li>
              <li>การรับประกัน</li>
              <li>สมาชิกการบริการ</li>
            </ul>
          </div>
        </div>
        <div className="logo-footer d-flex mt-4">
          <div className="ml-auto">
            <img src={logoFooter} />
          </div>
        </div>
      </div>
    </footer>
  );
}
