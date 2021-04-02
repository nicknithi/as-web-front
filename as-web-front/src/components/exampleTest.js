/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, { useEffect } from "react";
import jsPDF from "jspdf";
import { fileDownload } from "../ManageFIle";
export default function ExampleTest() {
  useEffect(async () => {
    const blob = await fileDownload(
      "Resources\\File\\SIZE807x11412021-04-01_20-17-01-470.png"
    );
    const url = window.URL.createObjectURL(new Blob([blob]));
    const canvas = document.getElementById("canvas");
    blob2canvas(canvas, url);
    // console.log(url);
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "file.png");
    // document.body.appendChild(link);
    // link.click();
    // var newImg = new Image();

    // newImg.onload = function () {
    //   const canvas = document.getElementById("canvas");
    //   const ctx = canvas.getContext("2d");
    //   ctx.canvas.width = this.width;
    //   ctx.canvas.height = this.height;
    //   ctx.drawImage(this, 0, 0, this.width, this.height);
    //   ctx.font = "40pt Calibri";
    //   ctx.fillText("My TEXT!", this.height - 50, 20);
    // };
    // newImg.crossOrigin = "anonymous";
    // newImg.src =
    //   "http://www.mostactive.info/Resources/File/SIZE807x11412021-03-19_11-09-07-744.png";
    document.querySelector(".as-loading").style.display = "none";
  }, []);
  const blob2canvas = (canvas, blob) => {
    var img = new window.Image();
    const ctx = canvas.getContext("2d");
    img.addEventListener("load", function () {
      ctx.canvas.width = this.width;
      ctx.canvas.height = this.height;
      ctx.drawImage(img, 0, 0, this.width, this.height);
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = monthNames[today.getMonth()]; //January is 0!
      var yyyy = today.getFullYear();

      today = `${dd} ${mm} ${yyyy}`;
      ctx.fillText(today, canvas.width / 2, canvas.height - canvas.height / 5);
      // only jpeg is supported by jsPDF
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
    img.setAttribute("src", blob);
  };
  return (
    <div className="container">
      <canvas id="canvas" className="d-none"></canvas>
      <button onClick={() => {}}>download</button>
      <img id="id1" alt="tes"></img>
    </div>
  );
}
