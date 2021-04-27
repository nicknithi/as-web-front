import http from "./axios";

const GetContent = async (id, lang) => {
  const res = await http.post("/api/Content/GetDataContent", {
    LangID: lang === "TH" ? 1 : 2,
    ID: id,
  });
  return res.data.data;
};
export { GetContent };
