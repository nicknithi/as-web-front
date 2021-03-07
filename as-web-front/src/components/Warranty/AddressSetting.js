import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GoogleMap from "../map/googleMap";
import DropDownProvince from "../Input/dropDownProvince";
import DropDownDistrict from "../Input/dropDownDistrict";
import DropDownSubDistrict from "../Input/dropDownSubDistrict";
import { getDistrict, setTempInput } from "../../actions/fetchAction";
function AddressSetting({
  handleChangInput,
  dispatch,
  Province,
  District,
  SubDistrict,
  FormDataWarranty,
  setFormDataWarranty,
}) {
  const [LagLong, setLagLong] = useState({ lat: 13.7563, lng: 100.5018 });
  const [ZipCode, setZipCode] = useState(null);
  const [tempProvince, setTempProvince] = useState(0);
  const [tempDistrict, setTempDistrict] = useState(0);
  const [titleDistric, setTitleDistric] = useState(false);
  const [DistrictDP, setDistrictDP] = useState([
    {
      id: "",
      district_Name: "กรุณาเลือก",
    },
  ]);
  const [subDistrictDP, setSubDistrictDP] = useState([
    {
      id: "",
      sub_District_Name: "กรุณาเลือก",
    },
  ]);
  useEffect(() => {
    setDistrictDP([
      {
        id: "",
        district_Name: "กรุณาเลือก",
      },
      ...District,
    ]);
  }, [District]);
  useEffect(() => {
    setSubDistrictDP([
      {
        id: "",
        sub_District_Name: "กรุณาเลือก",
      },
      ...SubDistrict,
    ]);
    console.log("SubDistrict", SubDistrict);
  }, [SubDistrict]);
  const handleProvince = (e) => {
    setFormDataWarranty({
      ...FormDataWarranty,
      Customer_Province: e.target.value,
    });
    setTempProvince(e.target.value);
    setDistrictDP([
      {
        id: "",
        district_Name: "กรุณาเลือก",
      },
    ]);
    setSubDistrictDP([
      {
        id: "",
        sub_District_Name: "กรุณาเลือก",
      },
    ]);
    let data = District.filter(
      (p) => p.fK_Province_ID === parseInt(e.target.value)
    );
    if (data.length) {
      setDistrictDP([
        {
          id: "",
          district_Name: "กรุณาเลือก",
        },
        ...data,
      ]);
    } else {
      setDistrictDP([
        {
          id: "",
          district_Name: "กรุณาเลือก",
        },
      ]);
    }
  };
  useEffect(() => {
    // let data = District.filter(
    //   (p) => p.fK_Province_ID === parseInt(FormDataWarranty.Customer_Province)
    // );
    // if (data.length) {
    //   setDistrictDP([
    //     {
    //       id: "",
    //       district_Name: "กรุณาเลือก",
    //     },
    //     ...data,
    //   ]);
    // } else {
    //   setDistrictDP([
    //     {
    //       id: "",
    //       district_Name: "กรุณาเลือก",
    //     },
    //   ]);
    // }
  }, [FormDataWarranty.Customer_Province]);
  const handleDistrict = (e) => {
    if (e.target !== undefined) {
      setFormDataWarranty({
        ...FormDataWarranty,
        Customer_District: e.target.value,
      });
      setTempDistrict(e.target.value);
      let data = SubDistrict.filter(
        (p) =>
          p.fK_District_ID === parseInt(e.target.value) &&
          p.fK_Province_ID === parseInt(tempProvince)
      );
      if (data.length) {
        setSubDistrictDP([
          {
            id: "",
            sub_District_Name: "กรุณาเลือก",
          },
          ...data,
        ]);
      } else {
        setSubDistrictDP([
          {
            id: "",
            sub_District_Name: "กรุณาเลือก",
          },
        ]);
      }
    } else {
      setFormDataWarranty({
        ...FormDataWarranty,
        Customer_District: "",
      });
    }
  };
  const handleSubDistrict = (e) => {
    if (e.target !== undefined) {
      if (e.target.value) {
        let data = SubDistrict.find(
          (d) =>
            d.id === parseInt(e.target.value) &&
            d.fK_District_ID === parseInt(tempDistrict) &&
            d.fK_Province_ID === parseInt(tempProvince)
        );
        if (data !== undefined) {
          setZipCode(data.zip_Code);
          setFormDataWarranty({
            ...FormDataWarranty,
            Customer_SubDistrict: e.target.value,
            Customer_ZipCode: data.zip_Code,
          });
        } else {
          console.log("else in");
          setZipCode("");
          setFormDataWarranty({
            ...FormDataWarranty,
            Customer_SubDistrict: "",
            Customer_ZipCode: "",
          });
        }
      } else {
        console.log("else out");
        setFormDataWarranty({
          ...FormDataWarranty,
          Customer_SubDistrict: "",
          Customer_ZipCode: "",
        });
      }
    }
  };
  // useEffect(() => {
  //   setLagLong({ lat: 15.87, lng: 100.9925 });
  // }, [
  //   FormDataWarranty.Customer_Latitude,
  //   FormDataWarranty.Customer_Longtitude,
  // ]);
  return (
    <div className="mt-3">
      <h3 className="font-weight-bold mb-3">ที่อยู่การติดตั้ง</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-12">
            <label className="font-weight-bold">
              ที่อยู่ที่ติดตั้งสินค้า* (ไม่สามารถเปลี่ยนแปลงได้)
            </label>
            <input
              type="text"
              id="addressProduct"
              className="as-input"
              name="Customer_Address"
              value={FormDataWarranty.Customer_Address}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Address: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">จังหวัด*</label>
            <DropDownProvince
              data={[{ id: "", province_Name: "กรุณาเลือก" }, ...Province]}
              handleEvent={handleProvince}
              FormDataWarranty={FormDataWarranty}
              setFormDataWarranty={setFormDataWarranty}
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">อำเภอ/เขต*</label>
            <DropDownDistrict
              data={DistrictDP}
              handleEvent={handleDistrict}
              title={titleDistric}
              FormDataWarranty={FormDataWarranty}
              setFormDataWarranty={setFormDataWarranty}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold mt-3">ตำบล*</label>
            <DropDownSubDistrict
              data={subDistrictDP}
              handleEvent={handleSubDistrict}
              FormDataWarranty={FormDataWarranty}
              setFormDataWarranty={setFormDataWarranty}
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold mt-3">รหัสไปรษณีย์*</label>
            <input
              type="text"
              id="postCode"
              value={FormDataWarranty.Customer_ZipCode}
              name="Customer_ZipCode"
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_ZipCode: e.target.value,
                })
              }
              className="as-input"
              required
            />
          </div>
        </div>
        <div>
          <label className="font-weight-bold mt-3">แผนที่ (โปรดระบุ)</label>
          <GoogleMap
            FormDataWarranty={FormDataWarranty}
            setFormDataWarranty={setFormDataWarranty}
            LagLong={LagLong}
          />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(AddressSetting);
