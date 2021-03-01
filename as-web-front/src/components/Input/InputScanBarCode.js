import React from "react";

export default function InputScanBarCode({ handleEvent }) {
  const handleScan = () => {
    handleEvent();
  };
  return (
    <div>
      <input type="text" />
      <button onClick={handleScan}>scan</button>
    </div>
  );
}
