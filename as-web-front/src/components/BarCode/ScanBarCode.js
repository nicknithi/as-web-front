import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "../../assets/scss/components/barcodeScaner.scss";
function ScanBarCode() {
  const [data, setData] = React.useState("Not Found");
  const [sizeCamera, setSizeCamera] = React.useState({
    width: 200,
    height: 200,
  });
  //   if (window.innerWidth >= 768) {
  //     setSizeCamera({ width: 500, height: 500 });
  //   }
  return (
    <>
      <div className="as-scan-barcode">
        <BarcodeScannerComponent
          width={sizeCamera.width}
          height={sizeCamera.height}
          onUpdate={(err, result) => {
            if (result) {
              alert("test", result.text);
              console.log(result);
              setData(result.text);
            } else {
              setData("Not Found");
            }
          }}
        />
      </div>
      <p>{data}</p>
    </>
  );
}

export default ScanBarCode;
