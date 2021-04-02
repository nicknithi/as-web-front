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
export default function Register({ data }) {
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const [t, i18n] = useTranslation("common");
  const [ImgBanner, setImgBanner] = useState("");
  useEffect(() => {
    console.log("tests ggggg");
    const banner = data.find((b) => b.content_Type === 2);
    if (banner !== undefined) {
      console.log("bannerbanner", banner.image);
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
    Service_Center: "",
    Quota_Service: 0,
    IsMember: true,
    Create_By: "",
    Customer_Company: "",
  });
  useEffect(() => {
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
        console.log("555", res);
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
      const resServiceCenter = await GetAllDataCareCenter();
      DataSet.Service_Center = "";

      console.log("resServiceCenter", resServiceCenter);
      setDataFromRegister(DataSet);
      const newSet = DistrictDN.filter(
        (p) => p.fK_Province_ID === parseInt(e.target.value)
      );
      console.log("ggghhh", newSet);
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
      DataSet.ZIP_Code = "";
      setDataFromRegister(DataSet);
      const newSet = SubDistrictDN.filter(
        (p) =>
          p.fK_Province_ID === parseInt(DataFromRegister.FK_Province_ID) &&
          p.fK_District_ID === parseInt(e.target.value)
      );
      console.log(newSet);
      if (newSet.length) {
        setSubDistrict([
          { id: "", value: t("register.selectDistrict") },
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
    const res = await http.post("/api/Customer/AddCustomer", DataFromRegister);
    if (res.data.message === "Success!") {
      window.location = "/เข้าสู่ระบบสมาชิก";
    }
  };
  const goBlack = () => {
    window.location = "/";
  };
  useEffect(() => {
    console.log("DataFromRegister", DataFromRegister);
  }, [DataFromRegister]);
  return (
    <div>
      <ElementBanner img={ImgBanner} />
      <form onSubmit={submit}>
        <div className="container register pb-4 mb-4">
          <h3 className="font-weight-bold mb-3">{t("register.title")}</h3>

          <div className="register-container">
            <h4 className="font-weight-bold">{t("register.customerType")}</h4>
            <div className="row ml-1">
              <label className="as-container font-weight-bold">
                {t("register.residential")}
                <input
                  type="radio"
                  name="radio"
                  name="customer-type"
                  value="1"
                  checked={DataFromRegister.Customer_Type === "1"}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      Customer_Type: e.target.value,
                    })
                  }
                />
                <span className="checkmark"></span>
              </label>
            </div>

            <div className="row ml-1">
              <label className="as-container font-weight-bold">
                {t("register.otherType")}
                <input
                  type="radio"
                  name="radio"
                  name="customer-type"
                  value="3"
                  checked={DataFromRegister.Customer_Type === "3"}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      Customer_Type: e.target.value,
                    })
                  }
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="row ml-1">
              <label className="as-container font-weight-bold">
                {t("register.contractor")}
                <input
                  type="radio"
                  name="radio"
                  name="customer-type"
                  value="2"
                  checked={DataFromRegister.Customer_Type === "2"}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      Customer_Type: e.target.value,
                    })
                  }
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {DataFromRegister.Customer_Type === "2" && (
              <div className="ml-5">
                <div className="row">
                  <label className="as-container font-weight-bold">
                    {t("register.subType1")}
                    <input
                      type="radio"
                      name="customer-type-sub"
                      value="1"
                      checked={
                        DataFromRegister.Customer_Contractor_Type === "1"
                      }
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Contractor_Type: e.target.value,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="row">
                  <label className="as-container font-weight-bold">
                    {t("register.subType2")}
                    <input
                      type="radio"
                      name="customer-type-sub"
                      value="2"
                      checked={
                        DataFromRegister.Customer_Contractor_Type === "2"
                      }
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Contractor_Type: e.target.value,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="row">
                  <label className="as-container font-weight-bold">
                    {t("register.subType3")}
                    <input
                      type="radio"
                      name="customer-type-sub"
                      value="3"
                      checked={
                        DataFromRegister.Customer_Contractor_Type === "3"
                      }
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Contractor_Type: e.target.value,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="row">
                  <label className="as-container font-weight-bold">
                    {t("register.subType4")}
                    <input
                      type="radio"
                      name="customer-type-sub"
                      value="4"
                      checked={
                        DataFromRegister.Customer_Contractor_Type === "4"
                      }
                      onChange={(e) =>
                        setDataFromRegister({
                          ...DataFromRegister,
                          Customer_Contractor_Type: e.target.value,
                        })
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">
                  {t("register.name")}*
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.FirstName}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      FirstName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">
                  {t("register.surname")}*
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.LastName}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      LastName: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="font-weight-bold">
                  {t("register.CompanyName")}
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.Customer_Company}
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
                <label className="font-weight-bold">{t("register.tel")}</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.Tel}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      Tel: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">
                  {t("register.mobile")}*
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.Phone}
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
                <label className="font-weight-bold">
                  {t("register.Email")}
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.Email}
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
          <h3 className="font-weight-bold mb-3 mt-3">
            {DataFromRegister.Customer_Type === "2"
              ? t("register.titleAddress2")
              : t("register.titleAddress1")}
          </h3>
          <div className="address-container">
            <div className="row">
              <div className="col-md-12">
                <label className="font-weight-bold">
                  {DataFromRegister.Customer_Type === "2"
                    ? t("register.titleAddress2")
                    : t("register.titleAddress1")}
                  * {t("register.canChanged")}
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.Address}
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
                <label className="font-weight-bold">
                  {t("register.province")}*
                </label>
                <DropdownProvince
                  handleEvent={getProvinceDropDown}
                  setDataFromRegister={setDataFromRegister}
                  DataFromRegister={DataFromRegister}
                  data={Province}
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">
                  {t("register.district")}*
                </label>
                <DropdownDistrict
                  handleEvent={getDistrictDropDown}
                  setDataFromRegister={setDataFromRegister}
                  DataFromRegister={DataFromRegister}
                  data={District}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-3">
                <label className="font-weight-bold">
                  {t("register.subdistrict")}*
                </label>
                <DropdownSubDistrict
                  handleEvent={getSubDistrictDropDown}
                  setDataFromRegister={setDataFromRegister}
                  DataFromRegister={DataFromRegister}
                  data={SubDistrict}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label className="font-weight-bold">
                  {t("register.zipCode")}*
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.ZIP_Code}
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
                <label className="font-weight-bold">
                  {t("register.careCenter")}
                </label>
                <input
                  type="text"
                  className="as-input"
                  readOnly={true}
                  value={DataFromRegister.Service_Center}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      Service_Center: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="font-weight-bold mt-3">
                {t("register.map")}
              </label>
              <GoogleMap
                DataFromRegister={DataFromRegister}
                setDataFromRegister={setDataFromRegister}
                LagLong={LagLong}
              />
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-center">
            <ButtonMain
              title={t("register.Submit")}
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
  );
}
