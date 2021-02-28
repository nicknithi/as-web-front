import React from "react";
import FormWarranty from "../components/Warranty/FormWarranty";
import RecheckFormWarranty from "../components/Warranty/RecheckFormWarranty";

import BannerCover from "../components/Banner/BannerCover";
export default function Default() {
  return (
    <div>
      <BannerCover />
      <div className="site-content">
        <FormWarranty />
        <RecheckFormWarranty />
      </div>
    </div>
  );
}
