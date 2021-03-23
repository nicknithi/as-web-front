import http from "./axios";
const getMenuAll = async (lang) => {
  console.log("fet", lang);
  const setLang = lang === "TH" ? 1 : 2;
  const res = await http.post(`/api/Content/GetMenuAll?LangID=${setLang}`);
  return res.data.data;
};

export { getMenuAll };
