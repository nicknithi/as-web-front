import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import imgLogo from "../assets/img/Logo.png";
export default function TestRenderPdf() {
  useEffect(() => {
    document.querySelector(".as-loading").style.display = "none";
  }, []);
  const printDocument = () => {
    alert();
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      <div className="mb5">
        <button onClick={() => printDocument()}>Print</button>
      </div>
      <div
        id="divToPrint"
        className="mt4"
        style={{
          backgroundColor: "#f5f5f5",
          width: "210mm",
          minHeight: "297mm",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <img src={imgLogo} />
        <div>Note: Here the dimensions of div are same as A4</div>
        <div>You Can add any component here</div>
      </div>
    </div>
  );
}
