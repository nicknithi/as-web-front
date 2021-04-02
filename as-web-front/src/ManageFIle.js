import http from "./axios";
import jsPDF from "jspdf";
const fileDownload = async (path) => {
  var config = {
    method: "post",
    responseType: "blob",
    url: `/api/Master/DownloadFile?filepath=${path}`,
    headers: {},
  };
  const res = await http.request(config);
  return res.data;
  // .then(function (response) {
  //   console.log(typeof response.data);
  //   return response.data;
  //   //   const url = window.URL.createObjectURL(new Blob([response.data]));
  //   //   console.log(url);
  //   //   const link = document.createElement("a");
  //   //   link.href = url;
  //   //   link.setAttribute("download", "file.png");
  //   //   document.body.appendChild(link);
  //   //   link.click();
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};
const nomalDownloadFile = async (path, name) => {
  const res = await fileDownload(path);
  if (res) {
    const url = window.URL.createObjectURL(new Blob([res]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
  } else {
    alert("download fail");
  }
};

const blob2canvas = (canvas, blob, name) => {
  var img = new window.Image();
  const ctx = canvas.getContext("2d");
  img.addEventListener("load", function () {
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    ctx.drawImage(img, 0, 0, this.width, this.height - 20);
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
    pdf.save(`${name.split(".")[0]}.pdf`);
  });
  img.setAttribute("src", blob);
};
export { fileDownload, blob2canvas, nomalDownloadFile };
