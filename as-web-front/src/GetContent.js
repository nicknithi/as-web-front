import http from "./axios";
const getContent = async (id) => {
  const res = await http.post("/api/Content/GetAllDataContent", {
    LangID: 1,
    ID: id,
  });
  return res.data.data;
};
export { getContent };
