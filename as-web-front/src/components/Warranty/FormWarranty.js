import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import FormRate from "../Warranty/FormRate";
import FormComfirm from "../Warranty/FormComfirm";
import AddressSetting from "../../components/Warranty/AddressSetting";
import {
  getProvince,
  setTempInput,
  formatDate,
} from "../../actions/fetchAction";
import ButtonMain from "../button/ButtonMain";

import ButtonManageForm from "../button/ButtonManageForm";
import http from "../../axios";
import axios from "axios";
import { useHistory } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";
import {
  Confirm,
  getProductType,
  getStoreByProvinceData,
  GetProvinceData,
  GetDistrictData,
  GetSubDistrictData,
} from "../../GetDataDropDown";
function FormWarranty({ Confirm }) {
  const [LastDataComToConfirm, setLastDataComToConfirm] = useState([]);

  const [storeData, setStoreData] = useState([
    [{ id: "", value: "กรุณาเลือก" }],
  ]);
  //let formtest = new FormData()
  const [Province, setProvince] = useState([{ id: "", value: "กรุณาเลือก" }]);

  const [District, setDistrict] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "" },
  ]);

  const [SubDistrict, setSubDistrict] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "", fK_District_ID: "" },
  ]);

  const [DistrictDN, setDistrictDN] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "" },
  ]);

  const [SubDistrictDN, setSubDistrictDN] = useState([
    { id: "", value: "กรุณาเลือก", fK_Province_ID: "", fK_District_ID: "" },
  ]);
  const [DisableFromSearch, setDisableFromSearch] = useState(false);

  const [FileWaranty, setFileWaranty] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [FormInput, setFormInput] = useState(true);
  const [ProvinceC, setProvinceC] = useState("");
  const [DataForComfirm, setDataForComfirm] = useState([]);

  const [dataTypeID, setDataTypeId] = useState([]);
  const [dataModelID, setDataModelID] = useState([]);
  const [dataProductID, setdataProductID] = useState([]);
  useEffect(async () => {
    const typeData = await getProductType();
    setDataTypeId([{ id: 0, value: "กรุณาเลือก" }, ...typeData]);
    //GetProvince
    const ProvinceData = await GetProvinceData();
    setProvince([...Province, ...ProvinceData]);

    const DistrictData = await GetDistrictData();
    setDistrict([...District, ...DistrictData]);
    setDistrictDN([...DistrictDN, ...DistrictData]);

    const SubDistrictData = await GetSubDistrictData();
    setSubDistrict([...SubDistrict, ...SubDistrictData]);
    setSubDistrictDN([...SubDistrictDN, ...SubDistrictData]);
    http
      .post("/api/Product/GetAllProduct", {
        Lang_ID: 1,
      })
      .then((res) => {
        console.log("product", res.data.data);
        const data = res.data.data.map((item, index) => {
          return { id: item.id, value: item.product_Name_TH };
        });
        setdataProductID([{ id: 0, value: "กรุณาเลือก" }, ...data]);
        //setProduct(data);
      });

    http
      .post("/api/Product/GetAllProductModel", {
        Lang_ID: 1,
      })
      .then((res) => {
        console.log("model ", res.data.data);
        // const data = res.data.data.map((item, index) => {
        //   return { id: item.id, value: item.model_Name_TH };
        // });
        // setDataModelID([{ id: 0, value: "กรุณาเลือก" }, ...data]);
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
      Product_ID: 0,
      Model_ID: null,
      Product_Code_Other: null,
      QTY: 0,
      Product_code: null,
      product_Name: null,
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
          setDistrict(DistrictDN);
          setSubDistrict(SubDistrictDN);

          const data = res.data.data;
          console.log("data.fK_Province_ID", data.fK_Province_ID);
          const oldData = { ...FormDataWarranty };
          console.log("old", oldData);
          console.log("new", data);
          oldData.Customer_Code = code;
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
          setDisableFromSearch(true);
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
          setDisableFromSearch(false);
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
        Confirm={Confirm}
        key={index}
        storeData={storeData}
        setStoreData={setStoreData}
        FormDataProduct={FormDataProduct}
        handleChangInput={handleInputProduct}
        handleGetFileForm={handleGetFile}
        index={index}
        FormDataProduct={FormDataProduct}
        setFormDataProduct={setFormDataProduct}
        Province={Province}
        FileWaranty={FileWaranty}
      />
    ));
  };
  const addProductForm = async () => {
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
      Product_ID: 0,
      Model_ID: null,
      Product_Code_Other: null,
      QTY: 0,
      Product_code: null,
      product_Name: null,
    });

    setFormDataProduct(tempProduct);
    FileWaranty.push(FileWaranty[FileWaranty.length - 1]);
    setFileWaranty(FileWaranty);
    if (tempProduct[tempProduct.length - 1].Purchase_Province) {
      const storeDataSetLoad = await getStoreByProvinceData(
        parseInt(tempProduct[tempProduct.length - 1].Purchase_Province)
      );
      const storeDataSet = [...storeData];
      storeDataSet.push([{ id: "", value: "กรุณาเลือก" }, ...storeDataSetLoad]);
      setStoreData(storeDataSet);
    } else {
      const storeDataSet = [...storeData];
      storeDataSet.push([{ id: "", value: "กรุณาเลือก" }]);
      setStoreData(storeDataSet);
    }

    setProcudeForm([...procudeForm, procudeForm[procudeForm.length - 1] + 1]);
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
      Product_ID: 0,
      Model_ID: null,
      Product_Code_Other: null,
      QTY: 0,
      Product_code: null,
      product_Name: null,
    });
    setFormDataProduct(FormDataProduct);
    FileWaranty.push([]);
    setFileWaranty(FileWaranty);
    const storeDataSet = [...storeData];
    storeDataSet.push([{ id: "", value: "กรุณาเลือก" }]);
    setStoreData(storeDataSet);
    console.log(FormDataProduct);
  };
  const handleEdit = () => {
    setFormInput(!FormInput);
    setCheckData(!checkData);
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("testset", FormDataProduct, FormDataWarranty);
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
      // item.Purchase_Date = formatDate(item.Purchase_Date);
      item.Purchase_Province = parseInt(item.Purchase_Province);
      item.Store_ID = parseInt(item.Store_ID) || 0;
      item.Type_ID = parseInt(item.Type_ID);
      item.Product_ID = parseInt(item.Product_ID);
      item.Model_ID = 0;
      item.QTY = parseInt(item.QTY) || 0;

      return { ...item, ...FormDataWarranty };
    });
    setLastDataComToConfirm(cloneDeep(dataFromLast));
    // fix data show for form confirm
    let validate = true;
    FormDataProduct.forEach((item, index) => {
      console.log("item", item.Product_ID);
      if (item.Product_ID || item.Product_Code_Other) {
      } else {
        alert("กรุณาเลือก รหัสสินค้า");
        validate = false;
        return 0;
      }
      console.log("FileWarantyFileWaranty", Array.isArray(FileWaranty[index]));
      if (Array.isArray(FileWaranty[index])) {
        alert("กรุณาเลือก รูปภาพใบเสร็จ");
        validate = false;
        return 0;
      } else {
      }
      if (FileWaranty[index]) {
      } else {
        alert("กรุณาเลือก รูปภาพใบเสร็จ");
        validate = false;
        return 0;
      }
      if (FormDataWarranty.Score) {
      } else {
        alert("กรุณาเลือกระดับความพึงพอใจ");
        validate = false;
        return 0;
      }
    });

    if (validate) {
      const dataLoop = dataFromLast;
      const dataShow = await Promise.all(
        dataLoop.map(async (item, index) => {
          item.Customer_Province = Province.find(
            (p) => p.id === item.Customer_Province
          ).province_Name;

          item.Customer_District = District.find(
            (d) => d.id === item.Customer_District
          ).district_Name;
          item.Customer_SubDistrict = SubDistrict.find(
            (d) => d.id === item.Customer_SubDistrict
          ).sub_District_Name;
          item.Purchase_Province = Province.find(
            (d) => d.id === item.Purchase_Province
          ).province_Name;
          const storeData = await getStoreByProvinceData(
            FormDataProduct[index].Purchase_Province
          );
          item.Purchase_Date = formatDate(item.Purchase_Date);
          const sotreidset = storeData.find((s) => s.id === item.Store_ID);
          if (sotreidset !== undefined) {
            console.log("store", sotreidset);
            item.Store_ID = parseInt(sotreidset.value);
          } else {
            item.Store_ID = 0;
          }

          const resTypeID = await getProductType();
          const FindREtype = resTypeID.find((t) => t.id === item.Type_ID);
          if (FindREtype !== undefined) {
            item.Type_ID = FindREtype.value;
          } else {
            item.Type_ID = 0;
          }

          item.Model_ID = 0;
          return item;
        })
      );

      setDataForComfirm(dataShow);

      setFormInput(!FormInput);
      setCheckData(!checkData);
    } else {
      // alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };
  const handleLastSubmit = () => {
    console.log("LastDataComToConfirm", LastDataComToConfirm);
    let successCheck = 0;
    LastDataComToConfirm.forEach((items, index) => {
      let FormLastData = new FormData();
      items.Purchase_Date = convertDate(items.Purchase_Date);
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
          } else {
            successCheck = successCheck + 1;
          }
        })
        .catch((e) => {
          successCheck = successCheck + 1;
        });
      if (successCheck > 0) {
        alert("ไม่สำเร็จ กรุณาลองใหม่");
      } else {
        window.location = "/";
      }
    });
  };
  const convertDate = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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
  return (
    <div>
      {/* <button onClick={test}>teste</button> */}
      <div className={"form-warranty " + (FormInput ? "d-block" : "d-none")}>
        <form onSubmit={handleSubmit}>
          <MemberData
            Confirm={Confirm}
            DisableFromSearch={DisableFromSearch}
            FormDataWarranty={FormDataWarranty}
            setFormDataWarranty={setFormDataWarranty}
            handleSearchByCustomerCode={handleSearchByCustomerCode}
            DisableFromSearch={DisableFromSearch}
          />
          <AddressSetting
            Confirm={Confirm}
            Province={Province}
            District={District}
            SubDistrict={SubDistrict}
            setProvince={setProvince}
            setDistrict={setDistrict}
            setSubDistrict={setSubDistrict}
            DistrictDN={DistrictDN}
            SubDistrictDN={SubDistrictDN}
            setDistrictDN={setDistrictDN}
            setSubDistrictDN={setSubDistrictDN}
            DisableFromSearch={DisableFromSearch}
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
          <FormRate handleChangInput={handleChangInput} Confirm={Confirm} />
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
