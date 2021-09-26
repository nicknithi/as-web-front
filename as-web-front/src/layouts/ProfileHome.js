/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import "../assets/scss/profile.scss";
import ButtonMain from "../components/button/ButtonMain";
import "../assets/scss/components/input/radio.scss";
import TableWarranty from "../components/Customer/TableWarranty";
import TableRenew from "../components/Customer/TableRenew";
import TableHistory from "../components/Customer/TableHistory";
import noImg from "../assets/img/noImg.jpg";
import FormRateService from "../components/Profile/FormRateService";
import {
  getCustomerById,
  SaveRequestCustomerRenew,
  GetProvinceData,
  GetDistrictData,
  GetSubDistrictData,
  AddDataSatisfactionAssessmentByCustomerCode,
} from "../GetDataDropDown";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
export default function ProfileHome() {
  const [t, i18n] = useTranslation("common");
  const [cookies, setCookie] = useCookies(["customerID", "as_lang"]);
  const [activeMenu, setActiveMenu] = useState("0");
  const [showPage, setShowPage] = useState("1");
  let { customPath, langContent } = useParams();
  const [fullName, setfullName] = useState("");
  if (!cookies.customerID) {
    // window.location = "/login";
  }
  const [Province, setProvince] = useState(null);
  const [District, setDistrict] = useState(null);
  const [SubDistrict, setSubDistrict] = useState(null);
  const convertAddress = () => {
    let result = "";
    if (Province) {
      const pv = Province.find(
        (p) => p.id === ProfileData.fK_Province_ID
      ).value;
      result = result + pv;
      // const dt = District.find((p) => p.id === ProfileData.fK_District_ID).value;
    }
    if (District) {
      const dt = District.find(
        (p) => p.id === ProfileData.fK_District_ID
      ).value;
      result = result + " " + dt;
    }
    if (SubDistrict) {
      const sdt = SubDistrict.find(
        (p) => p.id === ProfileData.fK_Sub_District_ID
      ).value;
      result = result + " " + sdt;
    }
    // const sdt = SubDistrict.find(
    //   (p) => p.id === ProfileData.fK_Sub_District_ID
    // ).value;
    // fK_Province_ID: "",
    // fK_District_ID: "",
    // fK_Sub_District_ID: "",
    return `${result} ${ProfileData.customer_ZIP_Code} ${ProfileData.customer_Address}`;
  };
  const typeMember = [
    t("register.otherType"),
    t("register.contractor"),
    t("register.residential"),
  ];
  const [ProfileData, setProfileData] = useState({
    id: "",
    customer_Type: null,
    username: null,
    password: null,
    customer_Code: "",
    customer_Name: "",
    customer_Surname: "",
    customer_Tel: "",
    customer_Phone: "",
    customer_Email: "",
    customer_Address: "",
    customer_ZIP_Code: "",
    customer_Latitude: "",
    customer_Longitude: null,
    fK_Province_ID: "",
    fK_District_ID: "",
    fK_Sub_District_ID: "",
    service_Center: "",
    quota_Service: "",
    flag_Member: "",
    is_Active: "",
    create_By: "",
    create_Date: "",
    update_By: null,
    update_Date: null,
    customer_Company: null,
  });
  const [dataSum, setDataSum] = useState({
    ListImageDetail: null,
    serviceCost: null,
    spareCost: null,
    imageReceipt: null,
    imageSignature: null,
    summary: null,
    ServiceID: null,
  });
  const setSummaryData = (data) => {
    console.log("test data", data.id);
    const temp = {
      ListImageDetail: data.serviceHistory.image,
      serviceCost: data.serviceCharge,
      spareCost: data.spareCharge,
      imageReceipt: data.serviceHistory.imageReceipt
        ? [data.serviceHistory.imageReceipt]
        : [],
      imageSignature: data.serviceHistory.imageSignature,
      summary: data.serviceHistory.summary,
      ServiceID: data.id,
    };
    const dataTemp = { ...dataSum };
    setDataSum({
      ...dataTemp,
      ...temp,
    });
    console.log(temp);
    setShowPage("2");
  };
  const [dataRenewDetail, setDataRenewDetail] = useState({
    no: null,
    date: null,
    imageReceipt: null,
    imageSignature: null,
    customer_FullName: null,
  });
  const setRenewData = (data) => {
    const temp = {
      no: data.No,
      date: data.renew_Date,
      imageReceipt: data.renew_Detail.receipt_Image,
      imageSignature: data.renew_Detail.signature_Image,
      customer_FullName: data.customer_FullName,
    };
    const dataTemp = { ...dataRenewDetail };
    setDataRenewDetail({
      ...dataTemp,
      ...temp,
    });
    console.log(temp);
    setShowPage("3");
  };
  const [DataComment, setDataComment] = useState({
    ServiceID: null,
    Score: 0,
    Feedback: "",
  });
  useEffect(() => {
    if (showPage === "2" || showPage === "3") {
      document
        .querySelector(".button-back")
        .style.setProperty("display", "none", "important");
    } else {
      document
        .querySelector(".button-back")
        .style.setProperty("display", "flex", "important");
    }
  }, [showPage]);
  const addComment = async (event) => {
    event.preventDefault();
    const temp = { ...DataComment, ServiceID: dataSum.ServiceID };
    if (DataComment.Score > 0 || DataComment.Feedback !== "") {
      const res = await AddDataSatisfactionAssessmentByCustomerCode(temp);
      if (res.data.message === "Success!") {
        setShowPage("1");
      } else {
        alert("เกิดข้อผิดพลาด");
      }
    } else {
      alert(t("profile.evaluation"));
    }
  };
  useEffect(async () => {
    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    const dataProfile = await getCustomerById(cookies.customerID);
    console.log(dataProfile);
    setProfileData(dataProfile);
    setActiveMenu("1");
    const ProvinceData = await GetProvinceData(lang);
    const DistrictData = await GetDistrictData(lang);
    const SubDistrictData = await GetSubDistrictData(lang);
    setProvince(ProvinceData);
    setDistrict(DistrictData);
    setSubDistrict(SubDistrictData);
    setfullName(`${dataProfile.customer_Name} ${dataProfile.customer_Surname}`);
  }, []);
  return (
    <>
      {showPage === "1" && (
        <div className="container profile-container mb-4">
          <h1 className=" mt-3">
            {t("profile.welcome")}
            {` ${ProfileData.customer_Name || ""} ${
              ProfileData.customer_Surname
            }`}
          </h1>
          <div className="row detail">
            <div className="col-md-10 mb-4">
              <span className="font-weight-bold">{t("profile.info")}</span>
              <br />
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.addressInstall")}
                </div>
                <div className="lable-text">{convertAddress()}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">{t("profile.tel")}</div>
                <div className="lable-text">{` ${
                  ProfileData.customer_Tel || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.phone")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.customer_Phone || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.email")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.customer_Email || "-"
                }`}</div>
              </div>
              <br />
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.typeMember")}
                </div>
                <div className="lable-text">
                  {(ProfileData.customer_Type &&
                    typeMember[ProfileData.customer_Type - 1]) ||
                    "-"}
                </div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.customerCode")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.customer_Code || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.serviceCenter")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.service_Center || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.NoSit")}
                </div>
                <div className="lable-text">
                  {ProfileData.quota_Service || "-"}
                </div>
              </div>
              <br />
              {ProfileData.quota_Service && ProfileData.quota_Service < 1 && (
                <ButtonMain
                  title={t("profile.btnRenew")}
                  color="#636363"
                  BgColor="#f1c400"
                  handleClick={async () => {
                    const res = await SaveRequestCustomerRenew(
                      parseInt(cookies.customerID),
                      1,
                      ProfileData.service_Center
                    );
                    console.log(res);
                    if (res.data.message === "Success!" && res.status === 200) {
                      alert("Success!");
                    } else {
                      alert(res.data.message);
                    }
                  }}
                />
              )}
            </div>
            <div className="col-md-2 mb-4">
              <ButtonMain
                title={t("profile.btnEditProfile")}
                color="#636363"
                BgColor="#f1c400"
                handleClick={() => {
                  window.location = `${
                    process.env.REACT_APP_SUB_DIRECTORY
                  }/${langContent}/${"edit-profile"}`;
                }}
              />
            </div>
          </div>
          <div className="menu mb-4">
            <div className="row mt-3  ml-4">
              <label className="as-container">
                {t("profile.menu1")}
                <input
                  type="radio"
                  name="menu"
                  value="1"
                  checked={activeMenu === "1"}
                  onChange={(e) => setActiveMenu("1")}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="row  ml-4">
              <label className="as-container">
                {t("profile.menu2")}
                <input
                  type="radio"
                  name="menu"
                  value="2"
                  checked={activeMenu === "2"}
                  onChange={(e) => setActiveMenu("2")}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="row ml-4">
              <label className="as-container">
                {t("profile.menu3")}
                <input
                  type="radio"
                  name="menu"
                  value="3"
                  checked={activeMenu === "3"}
                  onChange={(e) => setActiveMenu("3")}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          {activeMenu === "1" && (
            <div class="menu-1">
              <h3> {t("profile.menu1")}</h3>
              <TableHistory
                customerCode={ProfileData.customer_Code}
                setSummaryData={setSummaryData}
                textNoData={t("profile.noData")}
              />
              {/* <div class="mt-4 text-center">{t("profile.noData")}</div> */}
            </div>
          )}
          {activeMenu === "2" && (
            <div class="menu-2">
              <h3> {t("profile.menu2")}</h3>
              <TableWarranty
                customer_id={cookies.customerID}
                textNoData={t("profile.noData")}
              />
              {/* <div class="mt-4 text-center">{t("profile.noData")}</div> */}
            </div>
          )}
          {activeMenu === "3" && (
            <div class="menu-3">
              <h3> {t("profile.menu3")}</h3>
              <TableRenew
                textNoData={t("profile.noData")}
                customerCode={ProfileData.customer_Code}
                setRenewData={setRenewData}
              />
            </div>
          )}
          {/* {activeMenu === "4" && (
            
          )} */}
        </div>
      )}
      {showPage === "2" && (
        <div className="container profile-container mb-4">
          <h1 className=" mt-3">
            {t("profile.welcome")}
            {` ${ProfileData.customer_Name || ""} ${
              ProfileData.customer_Surname
            }`}
          </h1>
          <div className="row detail">
            <div className="col-md-10 mb-4">
              <span className="font-weight-bold">{t("profile.info")}</span>
              <br />
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.typeMember")}
                </div>
                <div className="lable-text">
                  {(ProfileData.customer_Type &&
                    typeMember[ProfileData.customer_Type - 1]) ||
                    "-"}
                </div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.customerCode")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.customer_Code || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.serviceCenter")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.service_Center || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.NoSit")}
                </div>
                <div className="lable-text">
                  {ProfileData.quota_Service || "-"}
                </div>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <ButtonMain
                title={t("profile.btnEditProfile")}
                color="#636363"
                BgColor="#f1c400"
                handleClick={() => {
                  window.location = `${
                    process.env.REACT_APP_SUB_DIRECTORY
                  }/${langContent}/${"edit-profile"}`;
                }}
              />
            </div>
          </div>
          <div class="menu-4 mt-3">
            <h3> {t("profile.menu4")}</h3>
            <div className="content-data p-3">
              <div className="content-text">
                {dataSum.summary || "-"}
                {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla facilisis at vero eros et accumsan
                et iusto odio dignissim qui blandit praesent luptatum zzril
                delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
                dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                commodo consequat */}
              </div>
            </div>
            <div className="content-img">
              <h3 className="pl-3">{t("profile.renew.titlePicture")}</h3>
              <div class="row">
                {dataSum.ListImageDetail.length > 0 ? (
                  <>
                    {dataSum.ListImageDetail.map((item, index) => (
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_DOMAIN_NAME}/${item.path}`}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <img src={noImg} className="img-fluid p-4" />
                  </>
                )}
              </div>
              <div className="row px-3 pt-4">
                <div className="col-md-2">{t("profile.renew.costService")}</div>
                <div className="col-md-5 price d-flex justify-content-end align-items-center">
                  {dataSum.serviceCost}
                </div>
              </div>
              <div className="row pt-3 px-3">
                <div className="col-md-2">{t("profile.renew.costSpare")}</div>
                <div className="col-md-5 price d-flex justify-content-end align-items-center">
                  {dataSum.spareCost}
                </div>
              </div>
            </div>
            <div className="content-img pt-4">
              <h3 className="pl-3">{t("profile.renew.TitleRecipt")}</h3>
              <div class="row">
                {dataSum.imageReceipt.length > 0 ? (
                  <>
                    {dataSum.imageReceipt.map((item, index) => (
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_DOMAIN_NAME}/${item.path}`}
                          alt=""
                          className="img-fluid p-4"
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <img src={noImg} className="img-fluid p-4" />
                  </>
                )}
              </div>
            </div>
            <div className="container">
              <div className="row p-4 content-img justify-content-center">
                <div className="col-md-4 text-center">
                  <h4>{t("profile.renew.signatureCustomer")}</h4>
                  <div>
                    {dataSum.imageSignature ? (
                      <img
                        src={`${process.env.REACT_APP_DOMAIN_NAME}/${dataSum.imageSignature.path}`}
                        alt=""
                        className="img-fluid"
                      />
                    ) : (
                      <div>
                        <img src={noImg} className="img-fluid p-4" />
                      </div>
                    )}
                  </div>
                  {/* <h4>{fullName}</h4> */}
                </div>
                {/* <div className="col-md-4 text-center">
                  <h4>{t("profile.renew.signatureAdmin")}</h4>
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%A0%E0%B8%9E_%E0%B9%82%E0%B8%AB%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C.png"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <h4>สุขใจ ใจดี</h4>
                </div> */}
              </div>
            </div>
            <div className="content-img pt-4">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  {/* <h4 className="">{t("profile.renew.estimate")}</h4> */}
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  addComment(e);
                }}
              >
                <div className="mt-3">
                  {/* <div className="col-md-4 d-flex justify-content-center">
                    <div className="ml-4">
                      <label className="as-container">
                        {t("profile.renew.Emo1")}
                        <input
                          type="radio"
                          name="customer-type"
                          value="3"
                          required
                          checked={DataComment.Score === "3"}
                          onChange={(e) =>
                            setDataComment({
                              ...DataComment,
                              Score: e.target.value,
                            })
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="ml-4">
                      <label className="as-container">
                        {t("profile.renew.Emo2")}
                        <input
                          type="radio"
                          name="customer-type"
                          value="2"
                          required
                          checked={DataComment.Score === "2"}
                          onChange={(e) =>
                            setDataComment({
                              ...DataComment,
                              Score: e.target.value,
                            })
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="ml-4">
                      <label className="as-container">
                        {t("profile.renew.Emo3")}
                        <input
                          type="radio"
                          name="customer-type"
                          value="1"
                          required
                          checked={DataComment.Score === "1"}
                          onChange={(e) =>
                            setDataComment({
                              ...DataComment,
                              Score: e.target.value,
                            })
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div> */}
                  <FormRateService
                    handleChangInput={(e) => {}}
                    Confirm={true}
                    setDataComment={setDataComment}
                    DataComment={DataComment}
                    title={t("profile.evaluation")}
                  />
                </div>
                {/* <div className="row justify-content-center">
                  <div className="col-md-4">
                    <label>{t("profile.renew.comment")}</label>
                    <textarea
                      class="form-control border-0"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                      onChange={(e) =>
                        setDataComment({
                          ...DataComment,
                          Feedback: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div> */}
                <div className="row">
                  <div className="mx-auto mt-3">
                    <ButtonMain
                      title={t("profile.renew.submit")}
                      color="#ffff"
                      BgColor="#58a7af"
                      // handleClick={() => {
                      //   addComment();
                      // }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showPage === "3" && (
        <div className="container profile-container mb-4">
          <h1 className=" mt-3">
            {t("profile.welcome")}
            {` ${ProfileData.customer_Name || ""} ${
              ProfileData.customer_Surname
            }`}
          </h1>
          <div className="row detail">
            <div className="col-md-10 mb-4">
              <span className="font-weight-bold">{t("profile.info")}</span>
              <br />
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.typeMember")}
                </div>
                <div className="lable-text">
                  {(ProfileData.customer_Type &&
                    typeMember[ProfileData.customer_Type - 1]) ||
                    "-"}
                </div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.customerCode")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.customer_Code || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.serviceCenter")}
                </div>
                <div className="lable-text">{` ${
                  ProfileData.service_Center || "-"
                }`}</div>
              </div>
              <div className="d-flex">
                <div className="pr-3 font-weight-bold">
                  {t("profile.NoSit")}
                </div>
                <div className="lable-text">
                  {ProfileData.quota_Service || "-"}
                </div>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <ButtonMain
                title={t("profile.btnEditProfile")}
                color="#636363"
                BgColor="#f1c400"
                handleClick={() => {
                  window.location = `${
                    process.env.REACT_APP_SUB_DIRECTORY
                  }/${langContent}/${"edit-profile"}`;
                }}
              />
            </div>
          </div>
          <div class="menu-4 mt-3">
            <h3> {t("profile.menu4")}</h3>
            <div className="content-img pt-4">
              <div className="text pl-3">
                <h4>
                  {t("profile.renew.no")}
                  {"  "}
                  <span>{dataRenewDetail.no}</span>
                </h4>
              </div>
              <div className="text pl-3 my-3">
                <h4>
                  {t("profile.renew.date")}
                  {"  "}
                  <span>{dataRenewDetail.date}</span>
                </h4>
              </div>
              <h4 className="pl-3">{t("profile.renew.TitleRecipt")}</h4>
              <div class="row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_DOMAIN_NAME}/${dataRenewDetail.imageReceipt}`}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row p-4 content-img justify-content-center">
                <div className="col-md-4 text-center">
                  <h4>{t("profile.renew.signatureCustomer")}</h4>
                  <div>
                    <img
                      src={`${process.env.REACT_APP_DOMAIN_NAME}/${dataRenewDetail.imageSignature}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <h4>{dataRenewDetail.customer_FullName || ""}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPage !== "1" && (
        <div className="row">
          <div className="mx-auto mb-3">
            <ButtonMain
              title={t("website.btnBack")}
              color="#636363"
              BgColor="#f1c400"
              handleClick={() => setShowPage("1")}
            />
          </div>
        </div>
      )}
    </>
  );
}
