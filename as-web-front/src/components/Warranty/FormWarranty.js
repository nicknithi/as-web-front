import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import FormRate from "../Warranty/FormRate";
import FormComfirm from "../Warranty/FormComfirm";
import AddressSetting from "../../components/Warranty/AddressSetting";
import { getProvince, setTempInput } from "../../actions/fetchAction";
import ButtonMain from "../button/ButtonMain";

import ButtonManageForm from "../button/ButtonManageForm";
import http from "../../axios";
import axios from "axios";
import dataMockD from "../../dataMock";
import { useHistory } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";
function FormWarranty({ Confirm }) {
  const [LastDataComToConfirm, setLastDataComToConfirm] = useState([]);
  //let formtest = new FormData()
  const [Province, setProvince] = useState([]);
  const [District, setDistrict] = useState([]);
  const [SubDistrict, setSubDistrict] = useState([]);
  const [FileWaranty, setFileWaranty] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [FormInput, setFormInput] = useState(true);
  const [ProvinceC, setProvinceC] = useState("");
  const [DataForComfirm, setDataForComfirm] = useState([]);

  const [dataTypeID, setDataTypeId] = useState([]);
  const [dataModelID, setDataModelID] = useState([]);
  const [dataProductID, setdataProductID] = useState([]);
  useEffect(async () => {
    //GetProvince
    await http
      .post("/api/Master/GetProvince")
      .then((res) => {
        //console.log("GetProvince123", res.data.data);
        setProvince(res.data.data);
      })
      .catch((e) => {});

    //GetDistrict
    await http
      .post("/api/Master/GetDistrict")
      .then((res) => {
        //console.log("GetProvince123", res.data.data);
        setDistrict(res.data.data);
      })
      .catch((e) => {});

    //GetDistrict
    await http
      .post("/api/Master/GetSubDistrict")
      .then((res) => {
        //console.log("GetProvince123", res.data.data);
        setSubDistrict(res.data.data);
      })
      .catch((e) => {});
    http.post("/api/Product/GetAllProduct").then((res) => {
      console.log("product", res.data.data);
      const data = res.data.data.map((item, index) => {
        return { id: item.id, value: item.product_Name_TH };
      });
      setdataProductID([{ id: 0, value: "กรุณาเลือก" }, ...data]);
      //setProduct(data);
    });
    http.post("/api/Product/GetAllProductType").then((res) => {
      const data = res.data.data.map((item, index) => {
        return { id: item.type_ID, value: item.type_Name_TH };
      });
      setDataTypeId([{ id: 0, value: "กรุณาเลือก" }, ...data]);
      //setTypeId(data);
    });
    http.post("/api/Product/GetAllProductModel").then((res) => {
      console.log("model ", res.data.data);
      const data = res.data.data.map((item, index) => {
        return { id: item.id, value: item.model_Name_TH };
      });
      setDataModelID([{ id: 0, value: "กรุณาเลือก" }, ...data]);
      //setModelId(data);
    });
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
  const handleSearchByCustomerCode = async (code) => {
    await http
      .post(`/api/Customer/GetDataCustomerByCode?Customer_Code=${code}`)
      .then((res) => {
        if (res.data.message == "Success!") {
          const data = res.data.data;
          const oldData = { ...FormDataWarranty };
          console.log("old", oldData);
          console.log("new", data);
          oldData.Customer_Firstname = data.customer_Name;
          oldData.Customer_Lastname = data.customer_Surname;
          oldData.Customer_Tel = data.customer_Tel;
          oldData.Customer_Mobile = data.customer_Phone;
          oldData.Customer_Email = data.customer_Email;
          oldData.Customer_Address = data.customer_Address;
          oldData.Customer_Province = data.fK_Province_ID;
          oldData.Customer_District = data.fK_District_ID;
          oldData.Customer_SubDistrict = data.fK_Sub_District_ID;
          oldData.Customer_ZipCode = data.customer_ZIP_Code;
          oldData.Customer_Latitude = data.customer_Latitude;
          oldData.Customer_Longtitude = data.customer_Longitude;
          setFormDataWarranty(oldData);
        } else {
          const oldData = { ...FormDataWarranty };
          oldData.Customer_Firstname = "";
          oldData.Customer_Lastname = "";
          oldData.Customer_Tel = "";
          oldData.Customer_Mobile = "";
          oldData.Customer_Email = "";
          oldData.Customer_Address = "";
          oldData.Customer_Province = "";
          oldData.Customer_District = "";
          oldData.Customer_SubDistrict = "";
          oldData.Customer_ZipCode = "";
          oldData.Customer_Latitude = "";
          oldData.Customer_Longtitude = "";
          setFormDataWarranty(oldData);
        }
      });
  };
  useEffect(() => {
    console.log(FormDataWarranty);
  }, [FormDataWarranty]);
  useEffect(() => {
    console.log("FormDataProduct", FormDataProduct);
  }, [FormDataProduct]);
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
        FormDataProduct={FormDataProduct}
        setFormDataProduct={setFormDataProduct}
        Province={Province}
      />
    ));
  };
  const addProductForm = () => {
    setProcudeForm([...procudeForm, procudeForm[procudeForm.length - 1] + 1]);
    const tempProduct = [...FormDataProduct];
    tempProduct.push({
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
    setFormDataProduct(tempProduct);
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
  const handleEdit = () => {
    setFormInput(!FormInput);
    setCheckData(!checkData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("testset", FormDataProduct);
    let dataFromLast = await FormDataProduct.map((item, index) => {
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
      if (item.Store_Name_Other === null) {
        item.Store_Name_Other = "";
      }
      if (item.Product_Code_Other === null) {
        item.Product_Code_Other = "";
      }
      item.Purchase_Province = parseInt(item.Purchase_Province);
      console.log(item);
      item.Store_ID = parseInt(item.Store_ID);
      item.Type_ID = parseInt(item.Type_ID);
      item.Product_ID = parseInt(item.Product_ID);
      item.Model_ID = parseInt(item.Model_ID);
      item.QTY = parseInt(item.QTY);

      return { ...item, ...FormDataWarranty };
    });
    setLastDataComToConfirm(cloneDeep(dataFromLast));
    // fix data show for form confirm
    const dataLoop = dataFromLast;
    const dataShow = dataLoop.map((item, index) => {
      item.Customer_Province = Province.find(
        (p) => p.id === item.Customer_Province
      ).province_Name;

      item.Customer_District = District.find(
        (d) => d.id === item.Customer_District
      ).district_Name;
      item.Customer_SubDistrict = SubDistrict.find(
        (d) => d.id === item.Customer_SubDistrict
      ).sub_District_Name;
      item.Purchase_Province = dataMockD.Purchase_Province.find(
        (d) => d.id === item.Purchase_Province
      ).value;
      item.Store_ID = dataMockD.Store_ID.find(
        (d) => d.id === item.Store_ID
      ).value;
      item.Type_ID = dataTypeID.find((d) => d.id === item.Type_ID).value;
      item.Product_ID = dataProductID.find(
        (d) => d.id === item.Product_ID
      ).value;
      item.Model_ID = dataModelID.find((d) => d.id === item.Model_ID).value;
      return item;
    });
    setDataForComfirm(dataShow);
    setFormInput(!FormInput);
    setCheckData(!checkData);
  };
  const handleLastSubmit = () => {
    console.log("LastDataComToConfirm", LastDataComToConfirm);
    LastDataComToConfirm.forEach((items, index) => {
      let FormLastData = new FormData();
      FormLastData.append("files", FileWaranty[index]);
      FormLastData.append("datas", JSON.stringify(items));
      axios
        .post(
          "http://www.mostactive.info/API/api/Warranty/AddDataWarranty",
          FormLastData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.message === "Success!") {
            window.location = "/";
          } else {
            alert("ไม่สำเร็จ กรุณาลองใหม่");
          }
        });
    });
  };
  const handleGetMemberData = (code) => {
    http
      .post(`/api/Customer/GetDataCustomerByCode?Customer_Code=${code}`)
      .then((res) => {
        if (res.data.message === "Success!") {
          console.log("res1", res);
          const data = res.data.data;
          FormDataWarranty.Customer_Firstname = data.customer_Name;
          FormDataWarranty.Customer_Lastname = data.customer_Surname;
          FormDataWarranty.Customer_Tel = data.customer_Tel;
          FormDataWarranty.Customer_Mobile = data.customer_Phone;
          FormDataWarranty.Customer_Email = data.customer_Email;
          setFormDataWarranty(FormDataWarranty);
        } else {
          FormDataWarranty.Customer_Firstname = "";
          FormDataWarranty.Customer_Lastname = "";
          FormDataWarranty.Customer_Tel = "";
          FormDataWarranty.Customer_Mobile = "";
          FormDataWarranty.Customer_Email = "";
          setFormDataWarranty(FormDataWarranty);
        }
      });
  };
  const deleteFormProduct = () => {
    if (procudeForm.length > 1) {
      let LastDataComToConfirmTT = [...LastDataComToConfirm];
      LastDataComToConfirmTT.pop();
      setLastDataComToConfirm(LastDataComToConfirmTT);
      let FileWarantyTT = [...FileWaranty];
      FileWarantyTT.pop();
      setFileWaranty(FileWarantyTT);
      let DataForComfirmTT = [...DataForComfirm];
      DataForComfirmTT.pop();
      setDataForComfirm(DataForComfirmTT);
      let FormDataProductTT = [...FormDataProduct];
      FormDataProductTT.pop();
      setFormDataProduct(FormDataProductTT);
      let values = [...procudeForm];
      values.splice(values.length - 1, 1);
      setProcudeForm(values);
    }
  };
  const test = () => {
    console.log(LastDataComToConfirm);
    console.log(FileWaranty);
    console.log(DataForComfirm);
    console.log(procudeForm);
    console.log(dataMockD);
  };
  return (
    <div>
      {/* <button onClick={test}>teste</button> */}
      <div className={"form-warranty " + (FormInput ? "d-block" : "d-none")}>
        <form onSubmit={handleSubmit}>
          <MemberData
            FormDataWarranty={FormDataWarranty}
            setFormDataWarranty={setFormDataWarranty}
            handleSearchByCustomerCode={handleSearchByCustomerCode}
            Confirm={Confirm}
          />
          <AddressSetting
            Province={Province}
            District={District}
            SubDistrict={SubDistrict}
            handleChangInput={handleChangInput}
            FormDataWarranty={FormDataWarranty}
            setFormDataWarranty={setFormDataWarranty}
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
                BgColor="#f1c400"
              />
            </div>
          </div>
        </form>
      </div>
      {checkData && (
        <div>
          <FormComfirm
            DataComfirm={{ datas: DataForComfirm, files: FileWaranty }}
            ProvinceC={ProvinceC}
          />
          <div className="d-flex justify-content-center mt-3 mb-4">
            <div className="mr-4">
              <ButtonMain
                title="ยืนยัน"
                color="#636363"
                BgColor="#f1c400"
                handleClick={handleLastSubmit}
              />
            </div>
            <div>
              <ButtonMain
                title="แก้ไขข้อมูล"
                color="#636363"
                BgColor="#58a7af"
                handleClick={handleEdit}
              />
            </div>
          </div>
          <div className="text-center mt-3 mb-4">
            <ButtonMain title="กลับ" color="#636363" BgColor="#f1c400" />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(FormWarranty);
