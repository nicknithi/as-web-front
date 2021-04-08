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

const GetManageProductSparePartById = async (id, lang) => {
  console.log("id", id);
  try {
    const res = await http.post(
      `/api/Sparepart/GetManageProductSparePartById`,
      {
        ID: id,
        // Lang_ID: lang,
        Lang_ID: 1,
      }
    );
    return res.data.data;
  } catch (e) {
    return false;
  }
};

const GetAllMenuProduct_Sparepart = async (lang) => {
  const res = await http.post(
    `/api/Sparepart/GetAllMenuProduct_Sparepart?Lang_ID=${1}`
  );
  return res.data.data;
};
const GetDataProduct_SparepartByClassified1 = async (id, lang) => {
  const res = await http.post(
    `/api/Sparepart/GetDataProduct_SparepartByClassified1`,
    {
      ID: id,
      // Lang_ID: lang,
      Lang_ID: 1,
    }
  );
  return res.data.data;
};
const GetDataProduct_SparepartByClassified2 = async (id, lang) => {
  const res = await http.post(
    `/api/Sparepart/GetDataProduct_SparepartByClassified2`,
    {
      ID: id,
      // Lang_ID: lang,
      Lang_ID: 1,
    }
  );
  return res.data.data;
};

const GetAllMenuProduct_Installation = async (lang) => {
  const res = await http.post(
    `/api/Installation/GetAllMenuProduct_Installation?Lang_ID=${lang}`
  );
  return res.data.data;
};
const GetDataProduct_InstallationByClassified1 = async (id, lang) => {
  const res = await http.post(
    `/api/Installation/GetDataProduct_InstallationByClassified1`,
    {
      ID: id,
      Lang_ID: lang,
      // Lang_ID: 1,
    }
  );
  return res.data.data;
};
const GetDataProduct_InstallationByClassified2 = async (id, lang) => {
  const res = await http.post(
    `/api/Installation/GetDataProduct_InstallationByClassified2`,
    {
      ID: id,
      Lang_ID: lang,
      // Lang_ID: 1,
    }
  );
  return res.data.data;
};
const GetManageProductInstallationById = async (id, lang) => {
  console.log("id", id);
  const res = await http.post(
    `/api/Installation/GetManageProductInstallationById`,
    {
      ID: id,
      Lang_ID: lang,
      // Lang_ID: 1,
    }
  );
  return res.data.data;
};
const GetManageProductInstallationByCode = async (id, code, lang) => {
  const res = await http.post(
    `/api/Installation/GetManageProductInstallationByCode`,
    {
      ID: id,
      Lang_ID: lang,
      Product_Old_Code: code,
    }
  );
  return res.data.data;
};
const GetManageProductSparePartByCode = async (id, code, lang) => {
  const res = await http.post(
    `/api/Sparepart/GetManageProductSparePartByCode`,
    {
      ID: id,
      Lang_ID: lang,
      Product_Old_Code: code,
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
  GetManageProductInstallationByCode,
  GetManageProductSparePartByCode,
};
