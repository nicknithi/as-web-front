import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import FormRate from "../Warranty/FormRate";
import FormComfirm from "../Warranty/FormComfirm";
import AddressSetting from "../../components/Warranty/AddressSetting";
import { getProvince, setTempInput } from "../../actions/fetchAction";
import ButtonMain from "../button/ButtonMain";
import CostWarrantyDetail from "./CostWarrantyDetail";
import WarrantyConfirm from "./WarrantyConfirm";
import ButtonManageForm from "../button/ButtonManageForm";
import http from "../../axios";
import axios from "axios";
import { useHistory } from "react-router-dom";
function FormWarranty(prop) {
  const history = useHistory();
  //let formtest = new FormData()
  const [Province, setProvince] = useState([]);
  const [District, setDistrict] = useState([]);
  const [SubDistrict, setSubDistrict] = useState([]);
  const [FileWaranty, setFileWaranty] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [FormInput, setFormInput] = useState(true);
  useEffect(() => {
    //GetProvince
    http
      .post("/api/Master/GetProvince")
      .then((res) => {
        //console.log("GetProvince123", res.data.data);
        setProvince(res.data.data);
      })
      .catch((e) => {});

    //GetDistrict
    http
      .post("/api/Master/GetDistrict")
      .then((res) => {
        //console.log("GetProvince123", res.data.data);
        setDistrict(res.data.data);
      })
      .catch((e) => {});

    //GetDistrict
    http
      .post("/api/Master/GetSubDistrict")
      .then((res) => {
        //console.log("GetProvince123", res.data.data);
        setSubDistrict(res.data.data);
      })
      .catch((e) => {});
  }, []);
  const handleGetFile = (file, index) => {
    FileWaranty[index] = file;
    setFileWaranty(FileWaranty);
    console.log(FileWaranty);
  };
  const [procudeForm, setProcudeForm] = useState([0]);
  const [FormDataProduct, setFormDataProduct] = useState([
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
  ]);
  const [FormDataWarranty, setFormDataWarranty] = useState({
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
  });

  const handleChangInput = (e) => {
    if (e.target) {
      FormDataWarranty[e.target.name] = e.target.value;
      setFormDataWarranty(FormDataWarranty);
      console.log(e.target.value, e.target.name);
    } else {
      FormDataWarranty[e.name] = e.value;
      setFormDataWarranty(FormDataWarranty);
      console.log(e.value, e.name);
    }
  };
  const handleInputProduct = (e) => {
    if (e.target) {
      FormDataProduct[parseInt(e.target.attributes.index.value)][
        e.target.name
      ] = e.target.value;
      console.log(
        e.target.attributes.index.value,
        e.target.value,
        e.target.name
      );
    } else {
      FormDataProduct[parseInt(e.attributes.index.value)][e.name] = e.value;
      console.log(e.attributes.index.value, e.value, e.name);
    }
  };
  const uiProductForm = () => {
    return procudeForm.map((item, index) => (
      <ProductData
        key={index}
        FormDataProduct={FormDataProduct}
        handleChangInput={handleInputProduct}
        handleGetFileForm={handleGetFile}
        index={index}
      />
    ));
  };
  const addProductForm = () => {
    setProcudeForm([...procudeForm, procudeForm[procudeForm.length - 1] + 1]);
    const tempProduct = FormDataProduct;
    FormDataProduct.push({
      Purchase_Province: tempProduct[tempProduct.length - 1].Purchase_Province,
      Purchase_Date: tempProduct[tempProduct.length - 1].Purchase_Date,
      Store_ID: tempProduct[tempProduct.length - 1].Store_ID,
      Store_Name_Other: tempProduct[tempProduct.length - 1].Store_Name_Other,
      Receipt_Number: tempProduct[tempProduct.length - 1].Receipt_Number,
      Barcode_Number: null,
      Warranty_Number: null,
      Type_ID: null,
      Product_ID: null,
      Model_ID: null,
      Product_Code_Other: null,
      QTY: null,
    });
    setFormDataProduct(FormDataProduct);
    FileWaranty.push([]);
    setFileWaranty(FileWaranty);

    console.log(FormDataProduct);
  };
  const addStoreForm = () => {
    setProcudeForm([...procudeForm, procudeForm[procudeForm.length - 1] + 1]);
    FormDataProduct.push({
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
    });
    setFormDataProduct(FormDataProduct);
    FileWaranty.push([]);
    setFileWaranty(FileWaranty);

    console.log(FormDataProduct);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let dataFromLast = FormDataProduct.map((item, index) => {
      console.log(item.Customer_Province, item);
      FormDataWarranty.Customer_Province = parseInt(
        FormDataWarranty.Customer_Province
      );
      FormDataWarranty.Customer_District = parseInt(
        FormDataWarranty.Customer_District
      );
      FormDataWarranty.Customer_SubDistrict = parseInt(
        FormDataWarranty.Customer_SubDistrict
      );
      FormDataWarranty.Score = parseInt(FormDataWarranty.Score);
      //fix customer_code
      FormDataWarranty.Customer_Code = "testets";
      item.Purchase_Province = parseInt(item.Purchase_Province);
      console.log(item);
      item.Store_ID = parseInt(item.Store_ID);
      item.Type_ID = parseInt(item.Type_ID);
      item.Product_ID = parseInt(item.Product_ID);
      item.Model_ID = parseInt(item.Model_ID);
      item.QTY = parseInt(item.QTY);

      return { ...item, ...FormDataWarranty };
    });
    setFormInput(!FormInput);
    setCheckData(!checkData);
    // prop.dispatch(setTempInput({ datas: dataFromLast, files: FileWaranty }));
    // history.push("/warranty/confirm");
    // dataFromLast.forEach((item, index) => {
    //   let FormLastData = new FormData();
    //   FormLastData.append("files", FileWaranty[index]);
    //   FormLastData.append("datas", JSON.stringify(FormLastData));
    //   axios
    //     .post(
    //       "http://119.59.117.57/API/api/Warranty/AddDataWarranty",
    //       FormLastData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //     });
    // });
    console.log("last", dataFromLast);
  };
  const deleteFormProduct = () => {};

  return (
    <div>
      {FormInput && (
        <div className="form-warranty">
          <CostWarrantyDetail />
          <WarrantyConfirm
            title={"การลงทะเบียนรับประกันสินค้า"}
            description={
              "การลงทะเบียนการรับประกันสินค้าเพื่ออำนวยความสะดวกในการแสดงข้อมูลและหลักฐานการซื้อขายเป็นไปตามเงื่อนไขอัตราค่าบริการและการรับประกันบริษัทฯขอสงวนสิทธิในการตรวจสอบข้อมูลที่แสดง กับสินค่าที่ซื้อหรือติดตั้งเพื่อความถูกต้องของข้อมูล"
            }
          />
          <MemberData handleChangInput={handleChangInput} />
          <form onSubmit={handleSubmit}>
            <AddressSetting
              Province={Province}
              District={District}
              SubDistrict={SubDistrict}
              handleChangInput={handleChangInput}
            />
            {uiProductForm()}
            <ButtonManageForm
              addProductForm={addProductForm}
              addStoreForm={addStoreForm}
              deleteFormProduct={deleteFormProduct}
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
          </form>
        </div>
      )}

      {checkData && <FormComfirm />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(FormWarranty);
