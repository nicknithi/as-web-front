import React from "react";

export default function InputScanBarCode({ handleEvent, index }) {
  const handleScan = () => {
    handleEvent();
  };
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
