import React, { useEffect } from "react";

export default function TestPicture() {
  useEffect(() => {
    document.querySelector(".as-loading").style.display = "none";
  }, []);
  return (
    <div>
      <img
        src={`${process.env.REACT_APP_DOMAIN_NAME}/Resources\File\SIZE1200X6382021-03-24_12-14-57-417.png`}
        className="img-fluid"
      />
    </div>
  );
}
