import React from "react";
import WarrantyShowDetailCost from "../carouselShow/warrantyShowDetailCost";
export default function CostWarrantyDetail() {
  return (
    <div className="cost-warranty-detail py-4 position-relative px-3">
      <h3 className="title mb-4 font-weight-bold">
        อัตราค่าบริการและการรับประกัน
      </h3>
      <WarrantyShowDetailCost />
    </div>
  );
}
