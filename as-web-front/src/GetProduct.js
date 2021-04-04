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

const GetManageProductSparePartById = async (id) => {
  console.log("id", id);
  try {
    const res = await http.post(
      `/api/Sparepart/GetManageProductSparePartById`,
      {
        ID: id,
      }
    );
    return res.data.data;
  } catch (e) {
    return false;
  }
};

const GetManageProductInstallationById = async (id) => {
  console.log("id", id);
  const res = await http.post(
    `/api/Installation/GetManageProductInstallationById`,
    {
      ID: id,
    }
  );
  return res.data.data;
};

const GetAllMenuProduct_Sparepart = async () => {
  const res = await http.post(`/api/Sparepart/GetAllMenuProduct_Sparepart`);
  return res.data.data;
};
const GetDataProduct_SparepartByClassified1 = async (id) => {
  const res = await http.post(
    `/api/Sparepart/GetDataProduct_SparepartByClassified1`,
    {
      ID: id,
    }
  );
  return res.data.data;
};
const GetDataProduct_SparepartByClassified2 = async (id) => {
  const res = await http.post(
    `/api/Sparepart/GetDataProduct_SparepartByClassified2`,
    {
      ID: id,
    }
  );
  return res.data.data;
};

const GetAllMenuProduct_Installation = async () => {
  const res = await http.post(
    `/api/Installation/GetAllMenuProduct_Installation`
  );
  return res.data.data;
};
const GetDataProduct_InstallationByClassified1 = async (id) => {
  const res = await http.post(
    `/api/Installation/GetDataProduct_InstallationByClassified1`,
    {
      ID: id,
    }
  );
  return res.data.data;
};
const GetDataProduct_InstallationByClassified2 = async (id) => {
  const res = await http.post(
    `/api/Sparepart/GetDataProduct_InstallationByClassified2`,
    {
      ID: id,
    }
  );
  return res.data.data;
};
export {
  GetAllProductModelSpare,
  GetAllClassifiedTypeSpare,
  GetAllProduct_SparepartList,
  GetManageProductSparePartById,
  GetAllMenuProduct_Sparepart,
  GetDataProduct_SparepartByClassified1,
  GetDataProduct_SparepartByClassified2,
  GetAllMenuProduct_Installation,
  GetDataProduct_InstallationByClassified1,
  GetDataProduct_InstallationByClassified2,
  GetManageProductInstallationById,
};