import http from "./axios";
const getMenuAll = async () => {
  const res = await http.post(`/api/Content/GetMenuAll?LangID=${1}`);
  return res.data.data;
};

export { getMenuAll };
