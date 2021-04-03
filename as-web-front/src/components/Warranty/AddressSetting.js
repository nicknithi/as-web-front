import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GoogleMap from "../map/googleMap";
import DropDownProvince from "../Input/dropDownProvince";
import DropDownDistrict from "../Input/dropDownDistrict";
import DropDownSubDistrict from "../Input/dropDownSubDistrict";
import { useTranslation } from "react-i18next";
function AddressSetting({
  Confirm,
  handleChangInput,
  dispatch,
  FormDataWarranty,
  setFormDataWarranty,
  Province,
  District,
  SubDistrict,
  setProvince,
  setDistrict,
  setSubDistrict,
  DistrictDN,
  SubDistrictDN,
  setDistrictDN,
  setSubDistrictDN,
  DisableFromSearch,
}) {
  const [t, i18n] = useTranslation("common");
  const [LagLong, setLagLong] = useState({ lat: 13.7563, lng: 100.5018 });

  const getProvinceDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...FormDataWarranty };
      DataSet.Customer_Province = parseInt(e.target.value);
      DataSet.Customer_District = "";
      DataSet.Customer_SubDistrict = "";
      DataSet.Customer_ZipCode = "";
      setFormDataWarranty(DataSet);
      const newSet = DistrictDN.filter(
        (p) => p.fK_Province_ID === parseInt(e.target.value)
      );
      console.log("ggghhh", newSet);
      if (newSet.length) {
        console.log("55566888");
        setDistrict([{ id: "", value: "กรุณาเลือก" }, ...newSet]);
      }
    }
  };
  const getDistrictDropDown = (e) => {
    if (e.target) {
      const DataSet = { ...FormDataWarranty };
      DataSet.Customer_District = parseInt(e.target.value);
      DataSet.Customer_ZipCode = "";
      DataSet.Customer_SubDistrict = "";
      setFormDataWarranty(DataSet);
      const newSet = SubDistrictDN.filter(
        (p) =>
          p.fK_Province_ID === parseInt(FormDataWarranty.Customer_Province) &&
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
      const DataSet = { ...FormDataWarranty };
      DataSet.Customer_SubDistrict = parseInt(e.target.value);
      DataSet.Customer_ZipCode = "";
      const newSet = SubDistrictDN.find(
        (p) => p.id === parseInt(e.target.value)
      );
      if (newSet !== undefined) {
        DataSet.Customer_ZipCode = newSet.zip_Code;
      }
      setFormDataWarranty(DataSet);
    }
  };
  useEffect(async () => {}, []);
  return (
    <div className="mt-3">
      <h3 className="mb-3">{t("warranthForm.addressTitle")}</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-12">
            <label className="">{t("warranthForm.address")}</label>
            <input
              type="text"
              id="addressProduct"
              className="as-input"
              name="Customer_Address"
              disabled={DisableFromSearch || !Confirm}
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
            <label className="">{t("warranthForm.province")}</label>
            <DropDownProvince
              data={Province}
              Confirm={Confirm}
              DisableFromSearch={DisableFromSearch}
              handleEvent={getProvinceDropDown}
              FormDataWarranty={FormDataWarranty}
              setFormDataWarranty={setFormDataWarranty}
            />
          </div>
          <div className="col-md-6">
            <label className=""> {t("warranthForm.district")}</label>
            <DropDownDistrict
              data={District}
              Confirm={Confirm}
              DisableFromSearch={DisableFromSearch}
              handleEvent={getDistrictDropDown}
              FormDataWarranty={FormDataWarranty}
              setFormDataWarranty={setFormDataWarranty}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="mt-3">{t("warranthForm.subDistrict")}</label>
            <DropDownSubDistrict
              data={SubDistrict}
              Confirm={Confirm}
              DisableFromSearch={DisableFromSearch}
              handleEvent={getSubDistrictDropDown}
              FormDataWarranty={FormDataWarranty}
              setFormDataWarranty={setFormDataWarranty}
            />
          </div>
          <div className="col-md-6">
            <label className="mt-3">{t("warranthForm.zipCode")}</label>
            <input
              type="text"
              id="postCode"
              value={FormDataWarranty.Customer_ZipCode}
              name="Customer_ZipCode"
              disabled={DisableFromSearch || !Confirm}
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
          <label className="mt-3">{t("warranthForm.map")}</label>
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
