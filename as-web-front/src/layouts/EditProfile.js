import React, { useState, useEffect } from "react";
import "../assets/scss/register.scss";
import DropdownProvince from "../components/Register/DropdownProvinceEdit";
import DropdownDistrict from "../components/Register/DropdownDistrictEdit";
import DropdownSubDistrict from "../components/Register/DropdownSubDistrictEdit";
import GoogleMap from "../components/map/googleMapRegister";
import ButtonMain from "../components/button/ButtonMain";
import "../assets/scss/components/input/radio.scss";
import { useCookies } from "react-cookie";
import http from "../axios";
import {
  getCustomerById,
  GetProvinceData,
  GetDistrictData,
  GetSubDistrictData,
} from "../GetDataDropDown";
export default function EditProfile() {
  const [cookies, setCookie] = useCookies(["customerID"]);

  const [DataCustomer, setDataCustomer] = useState({});
  const [LagLong, setLagLong] = useState({ lat: 13.7563, lng: 100.5018 });
  const [Province, setProvince] = useState([{ id: "", value: "กรุณาเลือก" }]);
  const [District, setDistrict] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "" },
  ]);
  const [SubDistrict, setSubDistrict] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "", fK_District_ID: "" },
  ]);
  // const [ProvinceDN, setProvinceDN] = useState([
  //   { id: "", value: "กรุณาเลือก" },
  // ]);
  const [DistrictDN, setDistrictDN] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "" },
  ]);
  const [SubDistrictDN, setSubDistrictDN] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "", fK_District_ID: "" },
  ]);
  const [DataFromRegister, setDataFromRegister] = useState({
    id: null,
    customer_Type: null,
    username: null,
    password: null,
    customer_Code: null,
    customer_Name: null,
    customer_Surname: null,
    customer_Tel: null,
    customer_Phone: null,
    customer_Email: null,
    customer_Address: null,
    customer_ZIP_Code: null,
    customer_Latitude: null,
    customer_Longitude: null,
    fK_Province_ID: null,
    fK_District_ID: null,
    fK_Sub_District_ID: null,
    service_Center: null,
    quota_Service: null,
    flag_Member: null,
    is_Active: null,
    create_By: null,
    create_Date: null,
    update_By: null,
    update_Date: null,
    customer_Company: null,
  });
  useEffect(async () => {
    if (!cookies.customerID) {
      window.location = "/login";
    }

    //get Province
    const resProvince = await GetProvinceData();
    setProvince([...Province, ...resProvince]);

    //get District
    const DistrictSet = await GetDistrictData();
    setDistrictDN([...District, ...DistrictSet]);
    setDistrict([...District, ...DistrictSet]);

    //get subDistrict
    const subDistrictSet = await GetSubDistrictData();
    setSubDistrictDN([...SubDistrict, ...subDistrictSet]);
    setSubDistrict([...SubDistrict, ...subDistrictSet]);

    //get customer
    const dataProfile = await getCustomerById(cookies.customerID);
    const TempCustomer = { ...DataFromRegister, ...dataProfile };
    setDataFromRegister(TempCustomer);
  }, []);

  const getProvinceDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.fK_Province_ID = parseInt(e.target.value);
      DataSet.fK_District_ID = "";
      DataSet.fK_Sub_District_ID = "";
      DataSet.customer_ZIP_Code = "";
      setDataFromRegister(DataSet);
      const newSet = DistrictDN.filter(
        (p) => p.fK_Province_ID === parseInt(e.target.value)
      );
      console.log("ggghhh", newSet);
      if (newSet.length) {
        setDistrict([{ id: "", value: "กรุณาเลือก" }, ...newSet]);
      }
    }
  };
  const getDistrictDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.fK_District_ID = parseInt(e.target.value);
      DataSet.customer_ZIP_Code = "";
      setDataFromRegister(DataSet);
      const newSet = SubDistrictDN.filter(
        (p) =>
          p.fK_Province_ID === parseInt(DataFromRegister.fK_Province_ID) &&
          p.fK_District_ID === parseInt(e.target.value)
      );
      console.log(newSet);
      if (newSet.length) {
        setSubDistrict([{ id: "", value: "กรุณาเลือก" }, ...newSet]);
      }
    }
  };
  const getSubDistrictDropDown = (e) => {
    console.log("target", e.target.value);
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.fK_Sub_District_ID = parseInt(e.target.value);
      DataSet.customer_ZIP_Code = "";
      const newSet = SubDistrictDN.find(
        (p) => p.id === parseInt(e.target.value)
      );
      if (newSet !== undefined) {
        DataSet.customer_ZIP_Code = newSet.zip_Code;
      }
      setDataFromRegister(DataSet);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const res = await http.post("/api/Customer/UpdateCustomer", {
      ID: DataFromRegister.id,
      Customer_Type: DataFromRegister.customer_Type,
      FirstName: DataFromRegister.customer_Name,
      LastName: DataFromRegister.customer_Surname,
      Username: DataFromRegister.username,
      Password: DataFromRegister.password,
      Member_Code: DataFromRegister.customer_Code,
      Tel: DataFromRegister.customer_Tel,
      Phone: DataFromRegister.customer_Phone,
      Email: DataFromRegister.customer_Email,
      Address: DataFromRegister.customer_Address,
      ZIP_Code: DataFromRegister.customer_ZIP_Code,
      Latitude: DataFromRegister.customer_Latitude,
      Longitude: DataFromRegister.customer_Longitude,
      FK_Province_ID: DataFromRegister.fK_Province_ID,
      FK_District_ID: DataFromRegister.fK_District_ID,
      FK_Sub_District_ID: DataFromRegister.fK_Sub_District_ID,
      Service_Center: DataFromRegister.service_Center,
      Quota_Service: DataFromRegister.quota_Service,
      IsMember: true,
      IsActive: DataFromRegister.is_Active,
      Update_By: DataFromRegister.update_By,
      Customer_Company: DataFromRegister.customer_Company,
    });
    if (res.data.message === "Success!") {
      window.location = "/home";
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
      <form onSubmit={submit}>
        <div className="container register pb-4">
          <h1 className="font-weight-bold mb-3 mt-3">แก้ไขข้อมูลส่วนตัว</h1>

          <div className="register-container">
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">ชื่อ*</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Name || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">นามสกุล*</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Surname || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Surname: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="font-weight-bold">ชื่อบริษัท</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Company || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Company: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Tel || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Tel: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">มือถือ*</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Phone || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="font-weight-bold">
                  อีเมล (โปรดระบุเพื่อให้ระบบส่งข้อความยืนยันการลงทะเบียน)
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Email || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <h3 className="font-weight-bold mb-3 mt-3">ที่อยู่การติดตั้ง</h3>
          <div className="address-container">
            <div className="row">
              <div className="col-md-12">
                <label className="font-weight-bold">
                  ที่อยู่ที่ติดตั้งสินค้า* (ไม่สามารถเปลี่ยนแปลงได้)
                </label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_Address || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_Address: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">จังหวัด*</label>
                <DropdownProvince
                  handleEvent={getProvinceDropDown}
                  setDataFromRegister={setDataFromRegister}
                  DataFromRegister={DataFromRegister}
                  data={Province}
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">อำเภอเขต*</label>
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
                <label className="font-weight-bold">ตำบล/เขต*</label>
                <DropdownSubDistrict
                  handleEvent={getSubDistrictDropDown}
                  setDataFromRegister={setDataFromRegister}
                  DataFromRegister={DataFromRegister}
                  data={SubDistrict}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label className="font-weight-bold">รหัสไปรษณีย์*</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.customer_ZIP_Code || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      customer_ZIP_Code: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">ศูนย์บริการสาขา</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.service_Center || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      service_Center: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="font-weight-bold mt-3">แผนที่ (โปรดระบุ)</label>
              <GoogleMap
                DataFromRegister={DataFromRegister}
                setDataFromRegister={setDataFromRegister}
                LagLong={LagLong}
              />
            </div>
          </div>
          <div className="login-container mt-5">
            <div className="row">
              <div className="col-md-6">
                <label className="font-weight-bold">ชื่อล็อกอิน</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.username || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="font-weight-bold">รหัสผ่าน</label>
                <input
                  type="text"
                  className="as-input"
                  value={DataFromRegister.password || ""}
                  onChange={(e) =>
                    setDataFromRegister({
                      ...DataFromRegister,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 d-flex justify-content-center">
          <ButtonMain title="ส่งข้อมูล" color="#636363" BgColor="#f1c400" />
        </div>
      </form>

      <div className="text-center mt-3 mb-4">
        <ButtonMain
          title="กลับ"
          color="#636363"
          BgColor="#58a7af"
          handleClick={goBlack}
        />
      </div>
    </div>
  );
}
