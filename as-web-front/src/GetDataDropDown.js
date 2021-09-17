import http from "./axios";
const getProductType = async (lang) => {
  const res = await http.post("/api/Product/GetAllProductType", {
    Lang_ID: lang,
  });
  const data = res.data.data.map((item, index) => {
    return { id: item.id, value: item.type_Name };
  });
  return data;
};
const getStoreByProvinceData = async (Province_id, lang) => {
  const res = await http.post("/api/Product/GetStoreByName", {
    Lang_ID: lang,
    Province_ID: Province_id,
    Store_Name: "",
  });
  if (res.data.data) {
    const storeDataSet = res.data.data.map((item, index) => {
      return {
        id: item.id,
        value: `${item.store_Name} (${item.store_Branch})`,
      };
    });
    return storeDataSet;
  } else {
    return [];
  }
};

const getCustomerById = async (id) => {
  const res = await http.post(`/api/Customer/GetDataCustomerById`, {
    ID: id,
  });

  return res.data.data;
};

const GetProvinceData = async (lang) => {
  const res = await http.post("/api/Master/GetProvince", {
    Lang_ID: lang,
  });
  const ProvinceSet = res.data.data.map((item, index) => {
    return { id: item.id, value: item.province_Name };
  });
  return ProvinceSet;
};
const GetDistrictData = async (lang) => {
  const res = await http.post("/api/Master/GetDistrict", {
    Lang_ID: lang,
  });
  const DistrictSet = res.data.data.map((item, index) => {
    return {
      id: item.id,
      value: item.district_Name,
      fK_Province_ID: item.fK_Province_ID,
    };
  });
  return DistrictSet;
};

const GetSubDistrictData = async (lang) => {
  const res = await http.post("/api/Master/GetSubDistrict", {
    Lang_ID: lang,
  });
  const subDistrictSet = res.data.data.map((item, index) => {
    return {
      id: item.id,
      value: item.sub_District_Name,
      fK_Province_ID: item.fK_Province_ID,
      fK_District_ID: item.fK_District_ID,
      zip_Code: item.zip_Code,
    };
  });
  return subDistrictSet;
};
const getWarrantyByCustomerId = async (id) => {
  const res = await http.post(
    `/api/Warranty/GetDataWarranty?Customer_ID=${id}`
  );
  return res.data.data.warrantyData;
};
const GetAllDataWarrantyByCustomerID = async (id) => {
  const res = await http.post(
    `api/Warranty/GetAllDataWarrantyByCustomerID?Customer_ID=${id}`
  );
  return res.data.data;
};

const getProductByBarcode = async (barcode) => {
  const res = await http.post("/api/Product/GetProductByBarcode", {
    Lang_ID: 1,
    Product_Barcode: barcode,
  });
  return res.data.data;
};
const getAllStore = async (lang) => {
  const res = await http.post("/api/Master/GetStore", {
    Lang_ID: lang,
  });
  return res.data.data;
};
const GetAllDataCareCenter = async (lang, id) => {
  const res = await http.post("/api/CareCenter/GetAllDataCareCenter", {
    ProvinceID: id,
    Lang_ID: lang,
  });
  return res.data.data;
};
const GetProductTop20ByBarcode = async (lang, id, type) => {
  const type_id = parseInt(type);
  const res = await http.post("/api/Product/GetProductTop20ByBarcode", {
    Lang_ID: lang,
    Product_Barcode: id,
    Product_TypeID: type_id,
  });
  return res;
};
const GetProductTop20ByCode = async (lang, id, type) => {
  const type_id = parseInt(type);
  const res = await http.post("/api/Product/GetProductTop20ByCode", {
    Lang_ID: lang,
    Product_Code: id,
    Product_TypeID: type_id,
  });
  return res;
};
const GetProductTop20ByName = async (lang, id, type) => {
  const type_id = parseInt(type);
  const res = await http.post("/api/Product/GetProductTop20ByName", {
    Lang_ID: lang,
    Product_Name: id,
    Product_TypeID: type_id,
  });
  return res;
};
const SaveRequestCustomerRenew = async (ID, type, center) => {
  const res = await http.post("/api/CustomerRenew/SaveRequestCustomerRenew", {
    Customer_ID: ID,
    Renew_Type: type,
    Renew_Center: center,
  });
  return res;
};
const GetAllCustomerRenewByCustomer_Code = async (Customer_Code) => {
  const res = await http.post(
    `/api/CustomerRenew/GetAllCustomerRenewByCustomer_Code?Customer_Code=${Customer_Code}`
  );
  return res.data;
};
const GetDataServiceHistoryByCustomerCode = async (Customer_Code) => {
  const res = await http.post(
    `/api/ServiceInformation/GetDataServiceHistoryByCustomerCode?CustomerCode=${Customer_Code}`
  );
  return res.data;
};
const AddDataSatisfactionAssessmentByCustomerCode = async (data) => {
  const res = await http.post(
    "/api/ServiceInformation/AddDataSatisfactionAssessmentByCustomerCode",
    data
  );
  return res;
};

export {
  getProductType,
  getStoreByProvinceData,
  getCustomerById,
  GetProvinceData,
  GetDistrictData,
  GetSubDistrictData,
  getWarrantyByCustomerId,
  getProductByBarcode,
  getAllStore,
  GetAllDataCareCenter,
  GetProductTop20ByBarcode,
  GetProductTop20ByCode,
  GetProductTop20ByName,
  SaveRequestCustomerRenew,
  GetAllDataWarrantyByCustomerID,
  GetAllCustomerRenewByCustomer_Code,
  GetDataServiceHistoryByCustomerCode,
  AddDataSatisfactionAssessmentByCustomerCode,
};
