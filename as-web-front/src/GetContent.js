import http from "./axios";

const GetContent = async (id, lang) => {
  const res = await http.post("/api/Content/GetDataContent", {
    LangID: lang === "TH" ? 1 : 2,
    ID: id,
  });
  return res.data.data;
};
const GetAllDataASCC = async (search) => {
  const res = await http.post(`/api/Master/GetAllDataASCC?Search=${search}`);
  return res.data.data;
};
export { GetContent, GetAllDataASCC };
