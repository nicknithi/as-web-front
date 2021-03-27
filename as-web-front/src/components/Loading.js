import React from "react";
import "../assets/scss/loading.scss";
export default function Loading() {
  return (
    <div className="as-loading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
