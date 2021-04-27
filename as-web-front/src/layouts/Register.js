/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import "../assets/scss/register.scss";
import DropdownProvince from "../components/Register/DropdownProvince";
import DropdownDistrict from "../components/Register/DropdownDistrict";
import DropdownSubDistrict from "../components/Register/DropdownSubDistrict";
import GoogleMap from "../components/map/googleMapRegister";
import ButtonMain from "../components/button/ButtonMain";
import "../assets/scss/components/input/radio.scss";
import ElementBanner from "../components/Content/ElementBanner";
import http from "../axios";
import { GetAllDataCareCenter } from "../GetDataDropDown";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import Modal from "react-bootstrap/Modal";
import WarrantyConfirm from "../components/Warranty/WarrantyConfirm";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import RegisterConfirm from "../components/Register/RegisterConfirm";
import LoadingContentOverlay from "../components/LoadingContentOverlay";
// import WarrantyConfirm form '../components/Warranty/WarrantyConfirm'
export default function Register({ data }) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  const [ImgBanner, setImgBanner] = useState("");

  const [loadingSendData, setLoadingSendData] = useState(false);

  //set Data Before form
  const [checkData, setCheckData] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  let dataWarrantyConfirm = {};
  let dataWarrantyPolicy = {};
  const bannerAndCarousel = [];
  data.forEach((item, index) => {
    if (item.content_Type === 2 || item.content_Type === 8) {
      bannerAndCarousel.push(item);
    }

    if (
      item.content_Title === "ลงทะเบียนสมัครสมาชิก" ||
      item.content_Title === "Membership Registration"
    ) {
      dataWarrantyConfirm = item;
    }
    if (item.content_Title === "Privacy Policy") {
      dataWarrantyPolicy = item;
    }
  });
  const handleCheck = (e) => {
    setConfirm(e.target.checked);
  };
  const handleShowModal = () => {
    setShow(true);
  };

  const ConfirmFromModal = () => {
    setConfirm(true);
    setShow(false);
  };
  //-------------------------------------------------

  useEffect(() => {
    const banner = data.find((b) => b.content_Type === 2);
    if (banner !== undefined) {
      setImgBanner(banner.image);
    }
  }, [data]);

  const [LagLong, setLagLong] = useState({ lat: 13.7563, lng: 100.5018 });
  const [Province, setProvince] = useState([
    { id: "", value: t("register.selectProvince") },
  ]);
  const [District, setDistrict] = useState([
    { id: "", value: t("register.selectDistrict"), fK_Province_ID: "" },
  ]);
  const [SubDistrict, setSubDistrict] = useState([
    {
      id: "",
      value: t("register.selectSubDistrict"),
      fK_Province_ID: "",
      fK_District_ID: "",
    },
  ]);
  // const [ProvinceDN, setProvinceDN] = useState([
  //   { id: "", value: "กรุณาเลือก" },
  // ]);
  const [DistrictDN, setDistrictDN] = useState([
    { id: "", value: t("register.selectDistrict"), fK_Province_ID: "" },
  ]);
  const [SubDistrictDN, setSubDistrictDN] = useState([
    {
      id: "",
      value: t("register.selectSubDistrict"),
      fK_Province_ID: "",
      fK_District_ID: "",
    },
  ]);
  let lang = 1;
  if (cookies.as_lang) {
    lang = cookies.as_lang === "TH" ? 1 : 2;
  }
  const [DataFromRegister, setDataFromRegister] = useState({
    Customer_Type: 0,
    Customer_Contractor_Type: 0,
    FirstName: "",
    LastName: "",
    Username: "",
    Password: "",
    Member_Code: "",
    Tel: "",
    Phone: "",
    Email: "",
    Address: "",
    ZIP_Code: "",
    Latitude: "",
    Longitude: "",
    FK_Province_ID: 0,
    FK_District_ID: 0,
    FK_Sub_District_ID: 0,
    Service_Center: null,
    Service_Center_Name: "",
    Quota_Service: 0,
    IsMember: true,
    Create_By: "",
    Customer_Company: "",
    Lang_ID: lang,
  });

  const typeMember = [
    t("register.residential"),
    t("register.contractor"),
    t("register.otherType"),
  ];
  const subTypeMember = [
    t("register.subType1"),
    t("register.subType2"),
    t("register.subType3"),
    t("register.subType4"),
  ];
  const [DataFromRegisterShow, setDataFromRegisterShow] = useState({});

  useEffect(() => {
    //set title dropdown
    setProvince([{ id: "", value: t("register.selectProvince") }]);
    setDistrict([
      { id: "", value: t("register.selectDistrict"), fK_Province_ID: "" },
    ]);
    setDistrictDN([
      { id: "", value: t("register.selectDistrict"), fK_Province_ID: "" },
    ]);
    setSubDistrict([
      {
        id: "",
        value: t("register.selectSubDistrict"),
        fK_Province_ID: "",
        fK_District_ID: "",
      },
    ]);
    setSubDistrictDN([
      {
        id: "",
        value: t("register.selectSubDistrict"),
        fK_Province_ID: "",
        fK_District_ID: "",
      },
    ]);

    let lang = 1;
    if (cookies.as_lang) {
      lang = cookies.as_lang === "TH" ? 1 : 2;
    }
    //get Province
    http
      .post("/api/Master/GetProvince", {
        Lang_ID: lang,
      })
      .then((res) => {
        const ProvinceSet = res.data.data.map((item, index) => {
          return { id: item.id, value: item.province_Name };
        });
        // setProvinceDN([...Province, ...ProvinceSet]);
        setProvince([...Province, ...ProvinceSet]);
      })
      .catch((e) => {});
    //get District
    http
      .post("/api/Master/GetDistrict", {
        Lang_ID: lang,
      })
      .then((res) => {
        const DistrictSet = res.data.data.map((item, index) => {
          return {
            id: item.id,
            value: item.district_Name,
            fK_Province_ID: item.fK_Province_ID,
          };
        });
        setDistrictDN([...District, ...DistrictSet]);
        setDistrict([...District, ...DistrictSet]);
      })
      .catch((e) => {});

    //get subDistrict
    http
      .post("/api/Master/GetSubDistrict", {
        Lang_ID: lang,
      })
      .then((res) => {
        const DistrictSet = res.data.data.map((item, index) => {
          return {
            id: item.id,
            value: item.sub_District_Name,
            fK_Province_ID: item.fK_Province_ID,
            fK_District_ID: item.fK_District_ID,
            zip_Code: item.zip_Code,
          };
        });
        setSubDistrictDN([...SubDistrict, ...DistrictSet]);
        setSubDistrict([...SubDistrict, ...DistrictSet]);
      })
      .catch((e) => {});
  }, []);
  const getProvinceDropDown = async (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.FK_Province_ID = parseInt(e.target.value);
      DataSet.FK_Sub_District_ID = "";
      DataSet.FK_District_ID = "";
      DataSet.ZIP_Code = "";
      //get serviceCenter
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      const resServiceCenter = await GetAllDataCareCenter(lang, e.target.value);
      if (resServiceCenter && resServiceCenter.length) {
        DataSet.Service_Center = resServiceCenter[0].code;
        DataSet.Service_Center_Name = resServiceCenter[0].name;
      }

      setDataFromRegister(DataSet);
      const newSet = DistrictDN.filter(
        (p) => p.fK_Province_ID === parseInt(e.target.value)
      );
      if (newSet.length) {
        setDistrict([
          { id: "", value: t("register.selectDistrict") },
          ...newSet,
        ]);
      }
    }
  };
  const getDistrictDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.FK_District_ID = parseInt(e.target.value);
      DataSet.FK_Sub_District_ID = "";
      DataSet.ZIP_Code = "";
      setDataFromRegister(DataSet);
      const newSet = SubDistrictDN.filter(
        (p) =>
          p.fK_Province_ID === parseInt(DataFromRegister.FK_Province_ID) &&
          p.fK_District_ID === parseInt(e.target.value)
      );
      if (newSet.length) {
        setSubDistrict([
          { id: "", value: t("register.selectSubDistrict") },
          ...newSet,
        ]);
      }
    }
  };
  const getSubDistrictDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.FK_Sub_District_ID = parseInt(e.target.value);
      DataSet.ZIP_Code = "";
      const newSet = SubDistrictDN.find(
        (p) => p.id === parseInt(e.target.value)
      );
      if (newSet !== undefined) {
        DataSet.ZIP_Code = newSet.zip_Code;
      }
      setDataFromRegister(DataSet);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    let tempFormData = { ...DataFromRegister };
    tempFormData.Customer_Type =
      typeMember[parseInt(tempFormData.Customer_Type) - 1];
    tempFormData.Customer_Contractor_Type =
      subTypeMember[parseInt(tempFormData.Customer_Contractor_Type) - 1];

    let tempProvince = Province.find(
      (p) => p.id === parseInt(tempFormData.FK_Province_ID)
    );
    if (tempProvince !== undefined) {
      tempFormData.FK_Province_ID = tempProvince.value;
    }

    let tempDistrict = DistrictDN.find(
      (p) => p.id === parseInt(tempFormData.FK_District_ID)
    );
    if (tempDistrict !== undefined) {
      tempFormData.FK_District_ID = tempDistrict.value;
    }

    let tempSubDistrict = SubDistrictDN.find(
      (p) => p.id === parseInt(tempFormData.FK_Sub_District_ID)
    );
    if (tempSubDistrict !== undefined) {
      tempFormData.FK_Sub_District_ID = tempSubDistrict.value;
    }
    setDataFromRegisterShow(tempFormData);
    setCheckData(true);
    // const res = await http.post("/api/Customer/AddCustomer", DataFromRegister);
    // if (res.data.message === "Success!") {
    //   window.location = "/เข้าสู่ระบบสมาชิก";
    // }
  };
  const Lastsubmit = async () => {
    setLoadingSendData(true);
    const lastData = { ...DataFromRegister };
    lastData.Customer_Contractor_Type = parseInt(
      lastData.Customer_Contractor_Type
    );
    lastData.Customer_Type = parseInt(lastData.Customer_Type);
    lastData.Service_Center = lastData.Service_Center.toString();
    const res = await http.post("/api/Customer/AddCustomer", lastData);
    setLoadingSendData(false);
    if (res.data.message === "Success!") {
      alert(t("register.alertSuccess"));
      let lang = 1;
      if (cookies.as_lang) {
        lang = cookies.as_lang === "TH" ? 1 : 2;
      }
      window.location = `${process.env.REACT_APP_SUB_DIRECTORY}/${
        lang === 1 ? "หน้าแรก" : "home"
      }`;
    }
  };
  const goBlack = () => {
    window.location = "/";
  };
  useEffect(() => {
    //
    "DataFromRegister", DataFromRegister;
  }, [DataFromRegister]);
  useEffect(() => {
    DataFromRegister.Customer_Contractor_Type = 0;
  }, [DataFromRegister.Customer_Type]);
  return (
    <div>
      {loadingSendData && <LoadingContentOverlay />}
      <ElementBanner img={ImgBanner} />
      <>
        {checkData && (
          <RegisterConfirm
            data={DataFromRegisterShow}
            setCheckData={setCheckData}
            Lastsubmit={Lastsubmit}
          />
        )}
        <div className={`${checkData ? "d-none" : "d-block"}`}>
          <div className="container mb-3">
            <WarrantyConfirm
              title={dataWarrantyConfirm.content_Title}
              description={dataWarrantyConfirm.content_body}
              handleCheck={handleCheck}
              handleShowModal={handleShowModal}
              checked={Confirm}
            />
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName=""
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  <h1>{dataWarrantyPolicy.content_Title}</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="detail">
                  <PerfectScrollbar
                    dangerouslySetInnerHTML={{
                      __html: dataWarrantyPolicy.detail,
                    }}
                  />
                </div>
                <div className="row justify-content-center mt-3">
                  <ButtonMain
                    title={t("button.confirm")}
                    color="#636363"
                    BgColor="#f1c400"
                    handleClick={ConfirmFromModal}
                  />
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <form onSubmit={submit}>
            <div className="container register pb-4 mb-4">
              <h3 className=" mb-3">{t("register.title")}</h3>

              <div className="register-container">
                <h4 className="">{t("register.customerType")}</h4>
                <div className="row ml-1">
                  <label className="as-container ">
                    {t("register.residential")}
                    <input
                      type="radio"
                      name="radio"
                      name="customer-type"
                      value="3"
                      disabled={!Confirm}
                      checked={DataFromRegister.Customer_Type === "3"}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Type: e.target.value,
                        })
                      }
                      required
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className="row ml-1">
                  <label className="as-container ">
                    {t("register.otherType")}
                    <input
                      type="radio"
                      name="radio"
                      name="customer-type"
                      value="1"
                      disabled={!Confirm}
                      checked={DataFromRegister.Customer_Type === "1"}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Type: e.target.value,
                        })
                      }
                      required
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="row ml-1">
                  <label className="as-container ">
                    {t("register.contractor")}
                    <input
                      type="radio"
                      name="radio"
                      name="customer-type"
                      value="2"
                      disabled={!Confirm}
                      checked={DataFromRegister.Customer_Type === "2"}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Type: e.target.value,
                        })
                      }
                      required
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                {DataFromRegister.Customer_Type === "2" && (
                  <div className="ml-5">
                    <div className="row">
                      <label className="as-container ">
                        {t("register.subType1")}
                        <input
                          type="radio"
                          name="customer-type-sub"
                          value="1"
                          disabled={!Confirm}
                          checked={
                            DataFromRegister.Customer_Contractor_Type === "1"
                          }
                          onChange={(e) =>
                            setDataFromRegister({
                              ...DataFromRegister,
                              Customer_Contractor_Type: e.target.value,
                            })
                          }
                          required
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="row">
                      <label className="as-container ">
                        {t("register.subType2")}
                        <input
                          type="radio"
                          name="customer-type-sub"
                          value="2"
                          disabled={!Confirm}
                          checked={
                            DataFromRegister.Customer_Contractor_Type === "2"
                          }
                          onChange={(e) =>
                            setDataFromRegister({
                              ...DataFromRegister,
                              Customer_Contractor_Type: e.target.value,
                            })
                          }
                          required
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="row">
                      <label className="as-container ">
                        {t("register.subType3")}
                        <input
                          type="radio"
                          name="customer-type-sub"
                          value="3"
                          disabled={!Confirm}
                          checked={
                            DataFromRegister.Customer_Contractor_Type === "3"
                          }
                          onChange={(e) =>
                            setDataFromRegister({
                              ...DataFromRegister,
                              Customer_Contractor_Type: e.target.value,
                            })
                          }
                          required
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="row">
                      <label className="as-container ">
                        {t("register.subType4")}
                        <input
                          type="radio"
                          name="customer-type-sub"
                          value="4"
                          disabled={!Confirm}
                          checked={
                            DataFromRegister.Customer_Contractor_Type === "4"
                          }
                          onChange={(e) =>
                            setDataFromRegister({
                              ...DataFromRegister,
                              Customer_Contractor_Type: e.target.value,
                            })
                          }
                          required
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6">
                    <label className="">{t("register.name")}</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.FirstName}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          FirstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="">{t("register.surname")}</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.LastName}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          LastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="">{t("register.CompanyName")}</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.Customer_Company}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Company: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="">{t("register.tel")}</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.Tel}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Tel: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="">{t("register.mobile")}*</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.Phone}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="">{t("register.Email")}</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.Email}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <h3 className=" mb-3 mt-3">
                {DataFromRegister.Customer_Type === "2"
                  ? t("register.titleAddress2")
                  : t("register.titleAddress1")}
              </h3>
              <div className="address-container">
                <div className="row">
                  <div className="col-md-12">
                    <label className="">
                      {DataFromRegister.Customer_Type === "2"
                        ? t("register.installAddress1")
                        : t("register.installAddress")}
                      * {t("register.canChanged")}
                    </label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.Address}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="">{t("register.province")}*</label>
                    <DropdownProvince
                      Confirm={Confirm}
                      handleEvent={getProvinceDropDown}
                      setDataFromRegister={setDataFromRegister}
                      DataFromRegister={DataFromRegister}
                      data={Province}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="">{t("register.district")}*</label>
                    <DropdownDistrict
                      Confirm={Confirm}
                      handleEvent={getDistrictDropDown}
                      setDataFromRegister={setDataFromRegister}
                      DataFromRegister={DataFromRegister}
                      data={District}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <label className="">{t("register.subdistrict")}*</label>
                    <DropdownSubDistrict
                      Confirm={Confirm}
                      handleEvent={getSubDistrictDropDown}
                      setDataFromRegister={setDataFromRegister}
                      DataFromRegister={DataFromRegister}
                      data={SubDistrict}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="">{t("register.zipCode")}*</label>
                    <input
                      type="text"
                      className="as-input"
                      value={DataFromRegister.ZIP_Code}
                      disabled={!Confirm}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          ZIP_Code: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="">{t("register.careCenter")}</label>
                    <input
                      type="text"
                      className="as-input"
                      readOnly={true}
                      value={DataFromRegister.Service_Center_Name}
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Service_Center: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="alert pl-0" role="alert">
                  {t("register.careCenter")}
                  <a
                    href={`${process.env.REACT_APP_SUB_DIRECTORY}${t(
                      "link.serviceCenter"
                    )}`}
                    className="alert-link"
                    target="_blank"
                  >
                    {" "}
                    Click
                  </a>
                </div>
                <div>
                  <label className=" mt-3">{t("register.map")}</label>
                  <GoogleMap
                    DataFromRegister={DataFromRegister}
                    setDataFromRegister={setDataFromRegister}
                    LagLong={LagLong}
                  />
                </div>
              </div>
              <div className="row mt-3 d-flex justify-content-center">
                <ButtonMain
                  Confirm={Confirm}
                  title={t("register.btnCheck")}
                  color="#636363"
                  BgColor="#f1c400"
                />
              </div>
              {/* <div className="row mt-3 d-flex justify-content-center">
            <ButtonMain
              title={t("register.Submit")}
              color="#636363"
              BgColor="#f1c400"
            />
          </div> */}
            </div>
          </form>
        </div>
      </>
    </div>
  );
}
