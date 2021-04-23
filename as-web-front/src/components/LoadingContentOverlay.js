import React from "react";
import "../assets/scss/components/loadingContentOverlay.scss";
export default function LoadingContent() {
  return (
    <div className="loading-content-overlay">
      <div class="lds-dual-ring"></div>
    </div>
  );
}
