import http from "./axios";
const getProductType = async (lang) => {
  const res = await http.post("/api/Product/GetAllProductType", {
    Lang_ID: 1,
  });
  const data = res.data.data.map((item, index) => {
    return { id: item.id, value: item.type_Name };
  });
  return data;
};
const getStoreByProvinceData = async (Province_id, lang) => {
  console.log("Province_id", Province_id);
  const res = await http.post("/api/Product/GetStoreByName", {
    Lang_ID: 1,
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

const getProductByBarcode = async (barcode) => {
  const res = await http.post("/api/Product/GetProductByBarcode", {
    Lang_ID: 1,
    Product_Barcode: barcode,
  });
  return res.data.data;
};
const getAllStore = async (lang) => {
  const res = await http.post("/api/Master/GetStore", {
    Lang_ID: 1,
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
};
