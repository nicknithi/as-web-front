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
export default function Register({ data }) {
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
          <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>

          <div className="register-container">
            <h4 className="font-weight-bold">
              ประเภทสมาชิก*(กรุณากดเพื่อเลือกประเภทสมาชิก)
            </h4>
            <div className="row ml-1">
              <label className="as-container font-weight-bold">
                ลงทะเบียนสมาชิกบ้านพักอาศัย
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
                ลงทะเบียนสมาชิกผู้รับเหมารายย่อย
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
            <div className="row ml-1">
              <label className="as-container font-weight-bold">
                ลงทะเบียนสมาชิกโครงการสำนักงาน,โรงแรม,ออฟฟิศ ฯลฯ
                ที่ไม่ใช่บ้านพักอาศัย
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
                <label className="font-weight-bold">เบอร์โทรศัพท์</label>
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
                <label className="font-weight-bold">
                  อีเมล (โปรดระบุเพื่อให้ระบบส่งข้อความยืนยันการลงทะเบียน)
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
          <div className="row mt-3 d-flex justify-content-center">
            <ButtonMain title="ส่งข้อมูล" color="#636363" BgColor="#f1c400" />
          </div>
        </div>
      </form>
    </div>
  );
}
