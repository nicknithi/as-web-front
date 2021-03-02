import React from "react";

export default function InputScanBarCode({ handleEvent, handleScan, index }) {
  const manualInput = (e) => {
    handleEvent(e);
  };
  return (
    <div>
      <input
        type="text"
        name="Barcode_Number"
        id="Barcode_Number"
        index={index}
        onChange={manualInput}
      />
      <button onClick={handleScan}>scan</button>
    </div>
  );
}
