import React, { useState, useEffect } from "react";
import "../assets/scss/maintain.scss";
export default function Maintain({ data, RenderColumn }) {
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
                บทความ
              </div>
              <div
                className={`tab-menu p-1 pl-2 ${ActiveTabMenu(2)}`}
                onClick={() => setIsActive(2)}
              >
                ดาวน์โหลด
              </div>
              <div
                className={`tab-menu p-1 pl-2 ${ActiveTabMenu(3)}`}
                onClick={() => setIsActive(3)}
              >
                ฟังคลิปเสียง
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className={`tab-content ${showContent(1)}`}>
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
    </div>
  );
}
