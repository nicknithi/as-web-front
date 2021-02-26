import React from "react";
import FormWarranty from "../components/Warranty/FormWarranty";
import RecheckFormWarranty from "../components/Warranty/RecheckFormWarranty";
import WarrantyConfirm from "../components/Warranty/WarrantyConfirm";
import BannerCover from "../components/Banner/BannerCover";
export default function Default() {
  return (
    <div>
      <BannerCover />
      <div className="site-content">
        <WarrantyConfirm
          title={"การลงทะเบียนรับประกันสินค้า"}
          description={
            "การลงทะเบียนการรับประกันสินค้าเพื่ออำนวยความสะดวกในการแสดงข้อมูลและหลักฐานการซื้อขายเป็นไปตามเงื่อนไขอัตราค่าบริการและการรับประกันบริษัทฯขอสงวนสิทธิในการตรวจสอบข้อมูลที่แสดง กับสินค่าที่ซื้อหรือติดตั้งเพื่อความถูกต้องของข้อมูล"
          }
        />
        <FormWarranty />
        <RecheckFormWarranty />
      </div>
    </div>
  );
}
