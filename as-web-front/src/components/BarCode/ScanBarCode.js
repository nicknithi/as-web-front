import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "../../assets/scss/components/barcodeScaner.scss";
import http from "../../axios";
function ScanBarCode({
  index,
  FormDataProduct,
  setFormDataProduct,
  handleEvent,
  setTriggleBarcode,
}) {
  const [data, setData] = React.useState("Not Found");
  const [sizeCamera, setSizeCamera] = React.useState({
    width: 200,
    height: 200,
  });
  const setDataScan = async (code) => {
    const res = await http.post(`/api/Product/GetProductByBarcode`, {
      Lang_ID: 1,
      Product_Barcode: code,
    });
    const dataScanFetch = res.data.data;
    if (res.data.message == "Success!") {
      handleEvent(
        dataScanFetch.id,
        dataScanFetch.fK_Model_ID,
        dataScanFetch.fK_Type_ID,
        dataScanFetch.barcode,
        dataScanFetch.product_code,
        dataScanFetch.product_Name
      );
      setTriggleBarcode(false);
    } else {
      handleEvent("", "", 0, "", "", "");
      alert("ไม่พบข้อมูล");
      setTriggleBarcode(false);
    }
  };
  return (
    <>
      <div className="as-scan-barcode">
        <BarcodeScannerComponent
          width={sizeCamera.width}
          height={sizeCamera.height}
          onUpdate={(err, result) => {
            if (result) {
              setDataScan(result.text);
            }
          }}
        />
      </div>
      <p>{data}</p>
    </>
  );
}

export default ScanBarCode;
