import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import FormRate from "../Warranty/FormRate";
import AddressSetting from "../../components/Warranty/AddressSetting";
import { getProvince, setTempInput } from "../../actions/fetchAction";
import ButtonMain from "../button/ButtonMain";
import CostWarrantyDetail from "./CostWarrantyDetail";
import WarrantyConfirm from "./WarrantyConfirm";
import ButtonManageForm from "../button/ButtonManageForm";
function FormWarranty(prop) {
  const [procudeForm, setProcudeForm] = useState([0]);
  let FormDataProduct = [
    {
      Purchase_Province: null,
      Purchase_Date: null,
      Store_ID: null,
      Store_Name_Other: null,
      Receipt_Number: null,
      Barcode_Number: null,
      Warranty_Number: null,
      Type_ID: null,
      Product_ID: null,
      Model_ID: null,
      Product_Code_Other: null,
      QTY: null,
    },
  ];
  let FormData = {
    Customer_Code: null,
    Customer_Firstname: null,
    Customer_Lastname: null,
    Customer_Tel: null,
    Customer_Mobile: null,
    Customer_Email: null,
    Customer_Address: null,
    Customer_Province: null,
    Customer_District: null,
    Customer_SubDistrict: null,
    Customer_ZipCode: null,
    Customer_Latitude: null,
    Customer_Longtitude: null,

    Score: null,
    Description: null,
  };
  const handleChangInput = (e) => {
    if (e.target) {
      FormData[e.target.name] = e.target.value;
      console.log(e.target.value, e.target.name);
    } else {
      FormData[e.name] = e.value;
      console.log(e.value, e.name);
    }
  };
  const handleInputProduct = (e) => {
    console.log(parseInt(e.target.attributes.index.value));
    console.log(FormDataProduct);
    if (e.target) {
      FormDataProduct[parseInt(e.target.attributes.index.value)][
        e.target.name
      ] = e.target.value;
      console.log(e.target.value, e.target.name);
    } else {
      FormDataProduct[parseInt(e.target.attributes.index.value)][e.name] =
        e.value;
      console.log(e.value, e.name);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(FormData);
  };

  const uiProductForm = () => {
    return procudeForm.map((item, index) => (
      <ProductData
        key={index}
        handleChangInput={handleInputProduct}
        index={index}
      />
    ));
  };
  const addProductForm = () => {
    setProcudeForm([...procudeForm, procudeForm[procudeForm.length - 1] + 1]);
    FormDataProduct = [
      ...FormDataProduct,
      {
        Purchase_Province: null,
        Purchase_Date: null,
        Store_ID: null,
        Store_Name_Other: null,
        Receipt_Number: null,
        Barcode_Number: null,
        Warranty_Number: null,
        Type_ID: null,
        Product_ID: null,
        Model_ID: null,
        Product_Code_Other: null,
        QTY: null,
      },
    ];
    console.log(FormDataProduct);
  };
  const addStoreForm = () => {
    setProcudeForm([...procudeForm, procudeForm[procudeForm.length - 1] + 1]);
    FormDataProduct = [
      ...FormDataProduct,
      {
        Purchase_Province: null,
        Purchase_Date: null,
        Store_ID: null,
        Store_Name_Other: null,
        Receipt_Number: null,
        Barcode_Number: null,
        Warranty_Number: null,
        Type_ID: null,
        Product_ID: null,
        Model_ID: null,
        Product_Code_Other: null,
        QTY: null,
      },
    ];
    console.log(FormDataProduct);
  };
  useEffect(() => {
    prop.dispatch(getProvince());
  }, []);
  console.log(prop.data);
  return (
    <div>
      <div className="form-warranty">
        <CostWarrantyDetail />
        <WarrantyConfirm
          title={"การลงทะเบียนรับประกันสินค้า"}
          description={
            "การลงทะเบียนการรับประกันสินค้าเพื่ออำนวยความสะดวกในการแสดงข้อมูลและหลักฐานการซื้อขายเป็นไปตามเงื่อนไขอัตราค่าบริการและการรับประกันบริษัทฯขอสงวนสิทธิในการตรวจสอบข้อมูลที่แสดง กับสินค่าที่ซื้อหรือติดตั้งเพื่อความถูกต้องของข้อมูล"
          }
        />
        <MemberData handleChangInput={handleChangInput} />
        <form onSubmit={handleSubmit}></form>
        <AddressSetting
          dataObject={prop.data.DataDropdownReducer}
          handleChangInput={handleChangInput}
        />
        {uiProductForm()}
        <ButtonManageForm
          addProductForm={addProductForm}
          addStoreForm={addStoreForm}
        />
        <FormRate handleChangInput={handleChangInput} />
        <div className="row">
          <div className="col-md-4 mx-auto text-center mt-4">
            <ButtonMain
              title="ตรวจสอบข้อมูล"
              color="#636363"
              BgColor="#ffaa29"
            />
          </div>
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
export default connect(mapStateToProps)(FormWarranty);
