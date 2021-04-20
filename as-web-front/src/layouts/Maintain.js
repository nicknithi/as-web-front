import React, { useState, useEffect } from "react";
import "../assets/scss/maintain.scss";
import ButtonMain from "../components/button/ButtonMain";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function Maintain({ data, RenderColumn }) {
  const [t, i18n] = useTranslation("common");
  const [Active, setActive] = useState(1);
  const [dataContent, setDataContent] = useState([]);
  const [dataAudio, setDataAudio] = useState([]);
  const showContent = (tab) => {
    if (Active === tab) {
      return "d-block";
    } else {
      return "d-none";
    }
  };
  const setIsActive = (tab) => {
    setActive(tab);
  };
  const ActiveTabMenu = (tab) => {
    if (Active === tab) {
      return "active";
    } else {
      return "";
    }
  };
  const printDocument = async () => {
    const input = document.getElementById("divToPrint");
    console.log(input.childNodes);
    const pdf = new jsPDF();
    let tempHeight = 0;
    const arrayDoc = [...input.childNodes];
    console.log("arrayDoc", arrayDoc);
    await Promise.all(
      arrayDoc.map(async (item, index) => {
        tempHeight += item.clientHeight;
        if (tempHeight > 3508) {
          alert("if");
          const canvas = await html2canvas(item);
          const imgData = canvas.toDataURL("image/png");
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0);
          tempHeight = 0;
        } else {
          alert("else");
          const canvas = await html2canvas(item);
          const imgData = canvas.toDataURL("image/png");
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0);
        }
      })
    );
    pdf.save("download.pdf");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();

    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   pdf.addPage();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   // pdf.output('dataurlnewwindow');
    //   pdf.save("download.pdf");
    // });
  };
  const dataRenderFilter = data.filter((f) => f.content_Type !== 6);
  console.log("dataRenderFilter", dataRenderFilter);
  if (dataRenderFilter.length) {
    // const tempdataContent = [...dataContent];
    // setDataContent(tempdataContent);
  }
  const dataAudioFilter = data.filter((f) => f.content_Type === 6);
  if (dataAudioFilter.length) {
    // const tempdataAudio = [...dataAudio];
    // setDataAudio(tempdataAudio);
  }
  //   useEffect(() => {
  //     const dataRenderFilter = data.filter((f) => f.content_Type !== 6);
  //     console.log("dataRenderFilter", dataRenderFilter);
  //     if (dataRenderFilter.length) {
  //       const tempdataContent = [...dataContent];
  //       setDataContent(tempdataContent);
  //     }
  //     const dataAudioFilter = data.filter((f) => f.content_Type === 6);
  //     if (dataAudioFilter.length) {
  //       const tempdataAudio = [...dataAudio];
  //       setDataAudio(tempdataAudio);
  //     }
  //   }, [data]);
  return (
    <div className="container">
      <div className="maintain pt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="tab">
              <div
                className={`tab-menu p-1 pl-2 ${ActiveTabMenu(1)}`}
                onClick={() => setIsActive(1)}
              >
                {t("maintain.article")}
              </div>
              {/* <div
                className={`tab-menu p-1 pl-2 ${ActiveTabMenu(2)}`}
                onClick={() => printDocument()}
              >
                {t("maintain.download")}
              </div> */}
              <div
                className={`tab-menu p-1 pl-2 ${ActiveTabMenu(3)}`}
                onClick={() => setIsActive(3)}
              >
                {t("maintain.Audio")}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div id="divToPrint" className={`tab-content ${showContent(1)}`}>
              {dataRenderFilter.map((item, index) => (
                <div key={index}>
                  <div className={`${item.content_Type !== 2 && "container"}`}>
                    <div className="maintain-content">{RenderColumn(item)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`tab-content ${showContent(2)}`}></div>
            <div className={`tab-content ${showContent(3)}`}>
              {dataAudioFilter.map((item, index) => (
                <div key={index}>
                  <div className={`${item.content_Type !== 2 && "container"}`}>
                    <div className="maintain-content">{RenderColumn(item)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        id="divToPrint"
        style={{
          backgroundColor: "#f5f5f5",
          width: "210mm",
          minHeight: "297mm",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>Note: Here the dimensions of div are same as A4</div>
        <div>You Can add any component here</div>
      </div> */}

      <div className="row d-flex justify-content-center mb-5">
        <ButtonMain
          title={t("website.btnBack")}
          color="#636363"
          BgColor="#f1c400"
          handleClick={() => {
            window.history.back();
          }}
        />
      </div>
    </div>
  );
}
