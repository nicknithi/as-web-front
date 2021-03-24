import http from "./axios";
const GetAllProductModelSpare = async (lang) => {
  const res = await http.post(`/api/Sparepart/GetAllProductModel`);
  return res.data.data;
};

const GetAllClassifiedTypeSpare = async (lang) => {
  const res = await http.post(`/api/Sparepart/GetAllClassifiedType`);
  return res.data.data;
};

const GetAllProduct_SparepartList = async (lang) => {
  const res = await http.post(`/api/Sparepart/GetAllProduct_SparepartList`);
  return res.data.data;
};

const GetManageProductById = async (id) => {
  console.log("id", id);
  const res = await http.post(`/api/Sparepart/GetManageProductById`, {
    ID: id,
  });
  return res.data.data;
};

export {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
  GetManageProductById,
};
