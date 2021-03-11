import React, { useState, useEffect } from "react";
import "../assets/scss/register.scss";
import DropdownProvince from "../components/Register/DropdownProvince";
import DropdownDistrict from "../components/Register/DropdownDistrict";
import DropdownSubDistrict from "../components/Register/DropdownSubDistrict";
import GoogleMap from "../components/map/googleMapRegister";
import http from "../axios";
export default function Register() {
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
    Customer_Type: 0,
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
    //get Province
    http
      .post("/api/Master/GetProvince", {
        Lang_ID: 1,
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
        Lang_ID: 1,
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
        Lang_ID: 1,
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
  const getProvinceDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.FK_Province_ID = parseInt(e.target.value);
      DataSet.FK_Sub_District_ID = "";
      DataSet.FK_District_ID = "";
      DataSet.ZIP_Code = "";
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
        setSubDistrict([{ id: "", value: "กรุณาเลือก" }, ...newSet]);
      }
    }
  };
  const getSubDistrictDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...DataFromRegister };
      DataSet.FK_Sub_District_ID = parseInt(e.target.value);
      DataSet.ZIP_Code = "";
      setDataFromRegister(DataSet);
      const newSet = SubDistrictDN.find(
        (p) => p.id === parseInt(e.target.value)
      );
      console.log(newSet);
      if (newSet !== undefined) {
        const dataSetZipcode = { ...DataFromRegister };
        dataSetZipcode.ZIP_Code = newSet.zip_Code;
        setDataFromRegister(dataSetZipcode);
      }
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const res = await http.post("/api/Customer/AddCustomer", DataFromRegister);
    if (res.data.message === "Success!") {
      window.location = "/login";
    }
  };
  // useEffect(() => {
  //   console.log("DataFromRegister", DataFromRegister);
  // }, [DataFromRegister]);
  return (
    <form onSubmit={submit}>
      <div className="container register pb-4">
        <h3 className="font-weight-bold mb-3">ลงทะเบียนสมัครสมาชิก</h3>
        <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>

        <div className="register-container">
          <div className="row">
            <div className="col-md-6">
              <label className="font-weight-bold">ชื่อ*</label>
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
              <label className="font-weight-bold">นามสกุล*</label>
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
              <label className="font-weight-bold">ชื่อบริษัท</label>
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
              <label className="font-weight-bold">เบอ์โทรศัพท์</label>
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
              <label className="font-weight-bold">มือถือ*</label>
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
              <label className="font-weight-bold">อีเมล</label>
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
            <div className="col-md-6">
              <label className="font-weight-bold">จังหวัด*</label>
              <DropdownSubDistrict
                handleEvent={getSubDistrictDropDown}
                setDataFromRegister={setDataFromRegister}
                DataFromRegister={DataFromRegister}
                data={SubDistrict}
              />
            </div>
            <div className="col-md-6">
              <label className="font-weight-bold">รหัสไปรษณีย์*</label>
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
              <label className="font-weight-bold">ศูนย์บริการสาขา</label>
              <input
                type="text"
                className="as-input"
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
            <label className="font-weight-bold mt-3">แผนที่ (โปรดระบุ)</label>
            <GoogleMap
              DataFromRegister={DataFromRegister}
              setDataFromRegister={setDataFromRegister}
              LagLong={LagLong}
            />
          </div>
        </div>
      </div>
      <button>submit</button>
    </form>
  );
}