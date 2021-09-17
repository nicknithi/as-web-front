import http from "./axios";
const getMenuAll = async (lang) => {
  const setLang = lang === "TH" ? 1 : 2;
  const res = await http.post(`/api/Content/GetMenuAll?LangID=${setLang}`);
  return res.data.data;
};

const ForgetPasswordCustomer = async (email) => {
  const res = await http.post(
    `/api/Customer/ForgetPasswordCustomer?input_email=${email}`
  );
  return res.data;
};

export { getMenuAll, ForgetPasswordCustomer };
