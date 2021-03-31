/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, { useEffect } from "react";
import jsPDF from "jspdf";
export default function ExampleTest() {
  useEffect(async () => {
    var newImg = new Image();

    newImg.onload = function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.canvas.width = this.width;
      ctx.canvas.height = this.height;
      ctx.drawImage(this, 0, 0, this.width, this.height);
      ctx.font = "40pt Calibri";
      ctx.fillText("My TEXT!", this.height - 50, 20);
    };
    newImg.crossOrigin = "anonymous";
    newImg.src =
      "http://www.mostactive.info/Resources/File/SIZE807x11412021-03-19_11-09-07-744.png";
    document.querySelector(".as-loading").style.display = "none";
  }, []);
  const getImgData = () => {
    var canvas = document.getElementById("canvas");
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save("download.pdf");
  };
  const getPdf = () => {
    var doc = new jsPDF();

    doc.text(20, 20, "<h1>Hello world!</h1");
    doc.text(20, 30, "This is client-side Javascript to generate a PDF.");

    // Add new page
    doc.addPage();
    doc.text(20, 20, "Visit CodexWorld.com");

    // Save the PDF
    doc.save("document.pdf");
  };
  return (
    <div className="container">
      <canvas id="canvas"></canvas>
      <button onClick={() => getPdf()}>download</button>
      <img id="id1" alt="tes"></img>
      <div className="row">
        <div className="col-md-12">
          <img
            src="http://www.mostactive.info/Resources\File\SIZE1200X6382021-03-24_12-14-57-417.png"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}
