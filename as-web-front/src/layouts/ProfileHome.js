/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import "../assets/scss/profile.scss";
import ButtonMain from "../components/button/ButtonMain";
import "../assets/scss/components/input/radio.scss";
import TableWarranty from "../components/Customer/TableWarranty";
import { getCustomerById, SaveRequestCustomerRenew } from "../GetDataDropDown";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
export default function ProfileHome() {
  const [t, i18n] = useTranslation("common");
  const [cookies, setCookie] = useCookies(["customerID"]);
  const [activeMenu, setActiveMenu] = useState("1");
  let { customPath, langContent } = useParams();
  if (!cookies.customerID) {
    // window.location = "/login";
  }
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
  useEffect(() => {
    console.log(activeMenu);
  }, [activeMenu]);
  const imgContent = [
    "https://tmladenov.tech/images/img-test.png",
    "https://tmladenov.tech/images/img-test.png",
    "https://tmladenov.tech/images/img-test.png",
  ];
  const imgContent1 = ["https://tmladenov.tech/images/img-test.png"];
  useEffect(async () => {
    const dataProfile = await getCustomerById(cookies.customerID);
    console.log("dataProfile", dataProfile);
    setProfileData(dataProfile);
  }, []);
  return (
    <div className="container profile-container mb-4">
      <h1 className=" mt-3">
        {t("profile.welcome")}
        {` ${ProfileData.customer_Name || ""} ${ProfileData.customer_Surname}`}
      </h1>
      <div className="row detail">
        <div className="col-md-10 mb-4">
          <span className="font-weight-bold">{t("profile.info")}</span>
          <br />
          <div className="d-flex">
            <div className="pr-3 font-weight-bold">
              {t("profile.addressInstall")}
            </div>
            <div className="lable-text">-</div>
          </div>
          <div className="d-flex">
            <div className="pr-3 font-weight-bold">{t("profile.tel")}</div>
            <div className="lable-text">{` ${
              ProfileData.customer_Tel || "-"
            }`}</div>
          </div>
          <div className="d-flex">
            <div className="pr-3 font-weight-bold">{t("profile.phone")}</div>
            <div className="lable-text">{` ${
              ProfileData.customer_Phone || "-"
            }`}</div>
          </div>
          <div className="d-flex">
            <div className="pr-3 font-weight-bold">{t("profile.email")}</div>
            <div className="lable-text">{` ${
              ProfileData.customer_Email || "-"
            }`}</div>
          </div>
          <br />
          <div className="d-flex">
            <div className="pr-3 font-weight-bold">
              {t("profile.typeMember")}
            </div>
            <div className="lable-text">-</div>
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
            <div className="pr-3 font-weight-bold">{t("profile.NoSit")}</div>
            <div className="lable-text">-</div>
          </div>
          <br />

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
          <div class="mt-4 text-center">{t("profile.noData")}</div>
        </div>
      )}
      {activeMenu === "2" && (
        <div class="menu-2">
          <h3> {t("profile.menu2")}</h3>
          <div class="mt-4 text-center">{t("profile.noData")}</div>
        </div>
      )}
      {activeMenu === "3" && (
        <div class="menu-3">
          <h3> {t("profile.menu3")}</h3>
          <div class="mt-4 text-center">{t("profile.noData")}</div>
        </div>
      )}
      {activeMenu === "4" && (
        <div class="menu-4">
          <h3> {t("profile.menu4")}</h3>
          <div className="content-data p-3">
            <div className="content-text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons
              ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
              ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
              minim veniam, quis nostrud exerci tation ullamcorper suscipit
              lobortis nisl ut aliquip ex ea commodo consequat
            </div>
          </div>
          <div className="content-img">
            <h3 className="pl-3">{t("profile.renew.titlePicture")}</h3>
            <div class="d-flex">
              {imgContent.map((item, index) => (
                <div className="">
                  <img src={item} alt="" className="img-fluid" />
                </div>
              ))}
            </div>
            <div className="row pl-3 pt-4">
              <div className="col-md-2">{t("profile.renew.costService")}</div>
              <div className="col-md-5 price">500</div>
            </div>
            <div className="row pt-3 pl-3">
              <div className="col-md-2">{t("profile.renew.costSpare")}</div>
              <div className="col-md-5 price">500</div>
            </div>
          </div>
          <div className="content-img pt-4">
            <h3 className="pl-3">{t("profile.renew.TitleRecipt")}</h3>
            <div class="d-flex">
              {imgContent1.map((item, index) => (
                <div className="">
                  <img src={item} alt="" className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="row p-4 content-img justify-content-center">
              <div className="col-md-4 text-center">
                <h4>{t("profile.renew.signatureCustomer")}</h4>
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%A0%E0%B8%9E_%E0%B9%82%E0%B8%AB%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <h4>สุขใจ ใจดี</h4>
              </div>
              <div className="col-md-4 text-center">
                <h4>{t("profile.renew.signatureAdmin")}</h4>
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%AA%E0%B8%A1%E0%B8%A0%E0%B8%9E_%E0%B9%82%E0%B8%AB%E0%B8%95%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <h4>สุขใจ ใจดี</h4>
              </div>
            </div>
          </div>
          <div className="content-img pt-4">
            <h4 className="pl-3 text-center">{t("profile.renew.estimate")}</h4>
            <div className="row justify-content-center mt-3">
              <div className="col-md-5 d-flex justify-content-center">
                <div className="ml-4">
                  <label className="as-container">
                    {t("profile.renew.Emo1")}
                    <input type="radio" name="customer-type" value="1" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="ml-4">
                  <label className="as-container">
                    {t("profile.renew.Emo2")}
                    <input type="radio" name="customer-type" value="2" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="ml-4">
                  <label className="as-container">
                    {t("profile.renew.Emo3")}
                    <input type="radio" name="customer-type" value="3" />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
