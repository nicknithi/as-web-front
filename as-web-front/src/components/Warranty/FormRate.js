import React, { useState, useEffect } from "react";

export default function FormRate({ handleChangInput, Confirm }) {
  const handleRate = (rate) => {
    document.getElementById("Score").value = rate;
    handleChangInput(document.getElementById("Score"));
    setActive(rate);
  };
  const handleCommend = (e) => {
    handleChangInput(e);
  };
  const [Active, setActive] = useState("");
  useEffect(() => {}, []);
  const IsActive = (level) => {
    if (Active === level) {
      return "#f1c400";
    } else {
      return "currentColor";
    }
  };
  return (
    <div className="rate-form mt-4 py-4 px-3">
      <input type="hidden" name="Score" id="Score" />
      <div className="row">
        <div className="col-md-4 mx-auto">
          <h3 className="title">
            ประเมินความพึงพอใจต่อสินค้าอเมริกันสแตนดาร์ด
          </h3>
          <div className="d-flex justify-content-between">
            <div onClick={() => handleRate(1)}>
              <div className="emotion">
                <svg
                  rate="1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill={IsActive(1)}
                  class="bi bi-emoji-angry"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z" />
                </svg>
                <span className="motion-text ml-1">แย่</span>
              </div>
            </div>
            <div className="emotion" onClick={() => handleRate(2)}>
              <svg
                rate="2"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={IsActive(2)}
                class="bi bi-emoji-frown"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>
              <span className="motion-text ml-1">ควรปรับปรุง</span>
            </div>
            <div className="emotion" onClick={() => handleRate(3)}>
              <svg
                rate="3"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={IsActive(3)}
                class="bi bi-emoji-neutral"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
              </svg>
              <span className="motion-text ml-1">พอใช้</span>
            </div>
            <div className="emotion" onClick={() => handleRate(4)}>
              <svg
                rate="4"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={IsActive(4)}
                class="bi bi-emoji-smile"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>
              <span className="motion-text ml-1">ดี</span>
            </div>
            <div className="emotion" onClick={() => handleRate(5)}>
              <svg
                rate="5"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={IsActive(5)}
                class="bi bi-emoji-laughing"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>
              <span className="motion-text ml-1">ดีมาก</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <textarea
            onChange={handleCommend}
            disabled={!Confirm}
            className="w-100 mt-3"
            name="Description"
            placeholder={"ข้อเสนอแนะ.........."}
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
}
