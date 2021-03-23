import React, { useState, useEffect } from "react";
import FormWarranty from "../components/Warranty/FormWarranty";
import CostWarrantyDetail from "../components/Warranty/CostWarrantyDetail";
import WarrantyConfirm from "../components/Warranty/WarrantyConfirm";
import BannerCover from "../components/Banner/BannerCover";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../assets/scss/warranty.scss";
export default function Warranty({ data }) {
  const [Confirm, setConfirm] = useState(false);
  const [readConfirm, setReadConfirm] = useState(false);
  const [ImgBanner, setImgBanner] = useState("");
  const [CarouselData, setCarouselData] = useState([]);
  const handleCheck = (e) => {
    setConfirm(e.target.checked);
  };

  useEffect(() => {
    const banner = data.find((b) => b.content_Type === 2);
    if (banner !== undefined) {
      console.log("bannerbanner", banner.image);
      setImgBanner(banner.image);
    }
    const Carousel = data.find((b) => b.content_Type === 8);
    if (Carousel !== undefined) {
      setCarouselData(Carousel);
    }
  }, [data]);
  return (
    <div className="warranty">
      {ImgBanner && (
        <BannerCover img={`http://www.mostactive.info/${ImgBanner}`} />
      )}
      <div className="container pb-4">
        {/* <CostWarrantyDetail /> */}
        {CarouselData && <CostWarrantyDetail data={CarouselData} />}
        <div>
          <WarrantyConfirm
            title={"การลงทะเบียนรับประกันสินค้า"}
            description={
              "การลงทะเบียนการรับประกันสินค้าเพื่ออำนวยความสะดวกในการแสดงข้อมูลและหลักฐานการซื้อขายเป็นไปตามเงื่อนไขอัตราค่าบริการและการรับประกันบริษัทฯขอสงวนสิทธิในการตรวจสอบข้อมูลที่แสดง กับสินค่าที่ซื้อหรือติดตั้งเพื่อความถูกต้องของข้อมูล"
            }
            handleCheck={handleCheck}
          />
          {/* <div className="detail p-4">
            <PerfectScrollbar>
              การใชบริการของเราอาจเกี่ยวของกับการเก็บรวบรวมและใชขอมูลของทาน
              (ตามที่กำหนดไวในหัวขอ
              “ขอมูลที่เราเก็บรวบรวมและเราเก็บรวบรวมอยางไร” ดานลางนี้)
              บนบริการของเรา (รวมถึงเว็บไซตและโมบายแอพพลิเคชั่นของเรา) ทั้งนี้
              เปน
              เรื่องที่มีความจำเปนที่ทานจะตองเขาใจวาเรื่องเหลานี้ดำเนินการอยางไรและทานจะสามารถควบคุมไดอยางไร
              ดังนั้น ขอใหทานกรุณาอานนโยบาย
              ในความเปนสวนตัวฉบับนี้ดวยความระมัดระวัง ชองทางการติดตอเรา
              ในกรณีที่ทานประสงคจะติดตอเราเกี่ยวกับนโยบายในความเปนสวนตัวฉบับนี้
              หรือเรื่องใดๆ ที่เกี่ยวกับความเปนสวนตัว กรุณาติดตอเราไดที่เจา
              หนาที่ดูแลความเปนสวนตัวของเราทางอีเมล legal-ca@tencent.co.th
              ฝายดูแลขอมูลสวนบุคคล โทร +662 833 3000 โทรสาร +662 833 3113
              หรือผานทางไปรษณียมาที่ ชั้น 8 อาคารทีวัน ชั้น 10, 11 และ 12
              (ยูนิต 3-5) ซอยสุขุมวิท 40 ถนนสุขุมวิท แขวง พระโขนง เขตคลองเตย
              กรุงเทพมหานคร (สงถึง ฝายดูแลขอมูลสวนบุคคล)
              การเปลี่ยนแปลงนโยบายความเปนสวนตัวฉบับนี้
              นโยบายความเปนสวนตัวนี้อาจถูกเปลี่ยนแปลงแกไขไดเปนครั้งคราว
              หากมีการเปลี่ยนแปลงหรือเพิ่มเติมวิธีการใช ประมวลผลขอมูลสวนบุคคล
              ของทานตามที่ระบุไวนี้สงผลกระทบตอทาน
              ทานจะไดรับการติดตอผานชองทางที่เหมาะสม ยกตัวอยางเชน
              เราอาจจะแจงเตือนใหทานทราบ
              อยางชัดเจนบนหนาบริการหรือสงอีเมลใหทานทราบถึงการเปลี่ยนแปลงดังกลาว
              1. ขอมูลที่เราเก็บรวบรวมและเราเก็บรวบรวมขอมูลอยางไร
              ในการใหบริการของเรา เราไดเก็บรวบรวม
              เก็บรักษาและใชขอมูลของทานดังตอไปนี้ “ขอมูล” ไดแก
              ขอมูลสวนบุคคล และขอมูลที่มิใชขอมูลสวนบุคคล "ขอมูลสวนบุคคล"
              ไดแก ขอมูล
              หรือการรวมกันของขอมูลซึ่งเกี่ยวกับทานและสามารถใชระบุตัวตนของทานได
              โดยที่ขอมูลสวนบุคคล อาจ รวมถึงขอมูลดังตอไปนี้
              ขอมูลที่ทานใหแกเราเมื่อมีการเปดบัญชีหรือใชบริการของเรา เชน
              ชื่อ หมายเลขโทรศัพท อีเมลแอดเดรส และขอมูลบัตรเครดิต
              ขอมูลที่ทานใชกับบริการของเรา รวมถึง
              ขอมูลที่แบงปนรวมกันที่ทานจัดสงใหแกบุคคลอื่นๆ
              ผานทางบริการของเราและขอมูลที่ทานเก็บรักษา โดยใชบริการของเรา
              ขอมูลที่แบงปนรวมกันกับผูอื่นที่ใชบริการของเราที่ไดจัดสงใหแกเรา
              เชน ขอมูลที่ระบุในกระทูที่มีการตั้ง
              และการติดตอสื่อสารกับทานและผูอื่นที่ ใชบริการของเรา และ
              ขอมูลที่เราเก็บรวบรวมจากการที่ทานใชบริการของเรา
              เชนขอมูลเกี่ยวกับตำแหนงพื้นที่บางแหง
              ขอมูลเกี่ยวกับการใชบริการ และขอมูล สาธารณะ
              “ขอมูลเกี่ยวกับตำแหนงพื้นที่” ไดแก
              ขอมูลที่เราเก็บรวบรวมเกี่ยวกับตำแหนงพื้นที่ของทาน
              (เมื่อทานมีการเปดใชบริการเกี่ยวกับตำแหนงพื้นที่) ซึ่งรวมถึง:
              ตำแหนงพื้นที่ของอุปกรณของทานเมื่อทานใชบริการของเรา เชน
              ขอมูลจาก GPS WiFi เข็มทิศ เครื่องวัดความเรง หรือการตรวจจับการ
              เคลื่อนไหวอื่นในอุปกรณของทาน
              ไอพีแอดเดรสของอุปกรณหรือบริการทางอินเตอรเน็ตที่ทานใชในการเขาถือบริการของเรา
              ขอมูลอื่นๆ
              ที่ทานจัดสงใหกับเราหรือบุคคลอื่นซึ่งทำใหสามารถระบุตำแหนงของทาน
              หรือสถานที่ที่ทานอยูได และขอมูลที่แบงปนรวมกันที่ทาน
              หรือบุคคลอื่นระบุซึ่งสามารถบงชี้ตำแหนงพื้นที่ของทานได เชน
              ขอมูลพิกัดตำแหนงที่ไดติดตั้งอยูในรูปภาพที่ทานสงมายังเรา และ
              ในกรณีที่ทานไดสงขอมูลเกี่ยวกับตำแหนงพื้นที่ของทานใหกับเราไวกอนหนานี้
              และประสงคจะใหเราลบขอมูลดังกลาวออก ทานสามารถดำเนินการ
              ไดผานทางบริการของเรา "ขอมูลเกี่ยวกับการเขาใชบริการ" ไดแก
              ขอมูลทางเทคนิคที่เรามีการเก็บรวบรวมโดยอัตโนมัติเมื่อทานใชบริการของเรา
              ไมวาจะผานทางการใช งานหรือทางคุกกี้
              (ตามที่จะมีการอธิบายในรายละเอียดใน นโยบายเกี่ยวกับคุกกี้)
              หรือขอมูลอื่นๆ ซึ่งรวมถึง:
              การใชบริการของเราอาจเกี่ยวของกับการเก็บรวบรวมและใชขอมูลของทาน
              (ตามที่กำหนดไวในหัวขอ
              “ขอมูลที่เราเก็บรวบรวมและเราเก็บรวบรวมอยางไร” ดานลางนี้)
              บนบริการของเรา (รวมถึงเว็บไซตและโมบายแอพพลิเคชั่นของเรา) ทั้งนี้
              เปน
              เรื่องที่มีความจำเปนที่ทานจะตองเขาใจวาเรื่องเหลานี้ดำเนินการอยางไรและทานจะสามารถควบคุมไดอยางไร
              ดังนั้น ขอใหทานกรุณาอานนโยบาย
              ในความเปนสวนตัวฉบับนี้ดวยความระมัดระวัง ชองทางการติดตอเรา
              ในกรณีที่ทานประสงคจะติดตอเราเกี่ยวกับนโยบายในความเปนสวนตัวฉบับนี้
              หรือเรื่องใดๆ ที่เกี่ยวกับความเปนสวนตัว กรุณาติดตอเราไดที่เจา
              หนาที่ดูแลความเปนสวนตัวของเราทางอีเมล legal-ca@tencent.co.th
              ฝายดูแลขอมูลสวนบุคคล โทร +662 833 3000 โทรสาร +662 833 3113
              หรือผานทางไปรษณียมาที่ ชั้น 8 อาคารทีวัน ชั้น 10, 11 และ 12
              (ยูนิต 3-5) ซอยสุขุมวิท 40 ถนนสุขุมวิท แขวง พระโขนง เขตคลองเตย
              กรุงเทพมหานคร (สงถึง ฝายดูแลขอมูลสวนบุคคล)
              การเปลี่ยนแปลงนโยบายความเปนสวนตัวฉบับนี้
              นโยบายความเปนสวนตัวนี้อาจถูกเปลี่ยนแปลงแกไขไดเปนครั้งคราว
              หากมีการเปลี่ยนแปลงหรือเพิ่มเติมวิธีการใช ประมวลผลขอมูลสวนบุคคล
              ของทานตามที่ระบุไวนี้สงผลกระทบตอทาน
              ทานจะไดรับการติดตอผานชองทางที่เหมาะสม ยกตัวอยางเชน
              เราอาจจะแจงเตือนใหทานทราบ
              อยางชัดเจนบนหนาบริการหรือสงอีเมลใหทานทราบถึงการเปลี่ยนแปลงดังกลาว
              1. ขอมูลที่เราเก็บรวบรวมและเราเก็บรวบรวมขอมูลอยางไร
              ในการใหบริการของเรา เราไดเก็บรวบรวม
              เก็บรักษาและใชขอมูลของทานดังตอไปนี้ “ขอมูล” ไดแก
              ขอมูลสวนบุคคล และขอมูลที่มิใชขอมูลสวนบุคคล "ขอมูลสวนบุคคล"
              ไดแก ขอมูล
              หรือการรวมกันของขอมูลซึ่งเกี่ยวกับทานและสามารถใชระบุตัวตนของทานได
              โดยที่ขอมูลสวนบุคคล อาจ รวมถึงขอมูลดังตอไปนี้
              ขอมูลที่ทานใหแกเราเมื่อมีการเปดบัญชีหรือใชบริการของเรา เชน
              ชื่อ หมายเลขโทรศัพท อีเมลแอดเดรส และขอมูลบัตรเครดิต
              ขอมูลที่ทานใชกับบริการของเรา รวมถึง
              ขอมูลที่แบงปนรวมกันที่ทานจัดสงใหแกบุคคลอื่นๆ
              ผานทางบริการของเราและขอมูลที่ทานเก็บรักษา โดยใชบริการของเรา
              ขอมูลที่แบงปนรวมกันกับผูอื่นที่ใชบริการของเราที่ไดจัดสงใหแกเรา
              เชน ขอมูลที่ระบุในกระทูที่มีการตั้ง
              และการติดตอสื่อสารกับทานและผูอื่นที่ ใชบริการของเรา และ
              ขอมูลที่เราเก็บรวบรวมจากการที่ทานใชบริการของเรา
              เชนขอมูลเกี่ยวกับตำแหนงพื้นที่บางแหง
              ขอมูลเกี่ยวกับการใชบริการ และขอมูล สาธารณะ
              “ขอมูลเกี่ยวกับตำแหนงพื้นที่” ไดแก
              ขอมูลที่เราเก็บรวบรวมเกี่ยวกับตำแหนงพื้นที่ของทาน
              (เมื่อทานมีการเปดใชบริการเกี่ยวกับตำแหนงพื้นที่) ซึ่งรวมถึง:
              ตำแหนงพื้นที่ของอุปกรณของทานเมื่อทานใชบริการของเรา เชน
              ขอมูลจาก GPS WiFi เข็มทิศ เครื่องวัดความเรง หรือการตรวจจับการ
              เคลื่อนไหวอื่นในอุปกรณของทาน
              ไอพีแอดเดรสของอุปกรณหรือบริการทางอินเตอรเน็ตที่ทานใชในการเขาถือบริการของเรา
              ขอมูลอื่นๆ
              ที่ทานจัดสงใหกับเราหรือบุคคลอื่นซึ่งทำใหสามารถระบุตำแหนงของทาน
              หรือสถานที่ที่ทานอยูได และขอมูลที่แบงปนรวมกันที่ทาน
              หรือบุคคลอื่นระบุซึ่งสามารถบงชี้ตำแหนงพื้นที่ของทานได เชน
              ขอมูลพิกัดตำแหนงที่ไดติดตั้งอยูในรูปภาพที่ทานสงมายังเรา และ
              ในกรณีที่ทานไดสงขอมูลเกี่ยวกับตำแหนงพื้นที่ของทานใหกับเราไวกอนหนานี้
              และประสงคจะใหเราลบขอมูลดังกลาวออก ทานสามารถดำเนินการ
              ไดผานทางบริการของเรา "ขอมูลเกี่ยวกับการเขาใชบริการ" ไดแก
              ขอมูลทางเทคนิคที่เรามีการเก็บรวบรวมโดยอัตโนมัติเมื่อทานใชบริการของเรา
              ไมวาจะผานทางการใช งานหรือทางคุกกี้
              (ตามที่จะมีการอธิบายในรายละเอียดใน นโยบายเกี่ยวกับคุกกี้)
              หรือขอมูลอื่นๆ ซึ่งรวมถึง:
            </PerfectScrollbar>
          </div> */}
        </div>
        {true && <FormWarranty Confirm={Confirm} />}
      </div>
    </div>
  );
}
