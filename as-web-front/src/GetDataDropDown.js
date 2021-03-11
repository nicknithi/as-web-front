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
  const storeDataSet = res.data.data.map((item, index) => {
    return {
      id: item.id,
      value: `${item.store_Name} (${item.store_Branch})`,
    };
  });
  return storeDataSet;
};

export { getProductType, getStoreByProvinceData };
