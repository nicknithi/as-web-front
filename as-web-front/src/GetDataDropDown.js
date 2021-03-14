import http from "./axios";
const getProductType = async () => {
  const res = await http.post("/api/Product/GetAllProductType", { Lang_ID: 1 });
  const data = res.data.data.map((item, index) => {
    return { id: item.id, value: item.type_Name };
  });
  return data;
};
const getStoreByProvinceData = async (Province_id) => {
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
  const res = await http.post(`/api/Customer/GetDataCustomerById?ID=${id}`);

  return res.data.data;
};

const GetProvinceData = async () => {
  const res = await http.post("/api/Master/GetProvince", {
    Lang_ID: 1,
  });
  const ProvinceSet = res.data.data.map((item, index) => {
    return { id: item.id, value: item.province_Name };
  });
  return ProvinceSet;
};
const GetDistrictData = async () => {
  const res = await http.post("/api/Master/GetDistrict", {
    Lang_ID: 1,
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

const GetSubDistrictData = async () => {
  const res = await http.post("/api/Master/GetSubDistrict", {
    Lang_ID: 1,
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

export {
  getProductType,
  getStoreByProvinceData,
  getCustomerById,
  GetProvinceData,
  GetDistrictData,
  GetSubDistrictData,
};
