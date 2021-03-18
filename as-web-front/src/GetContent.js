import http from "./axios";
const getContent = async (id) => {
  const res = await http.post("/api/Content/GetDataContent", {
    LangID: 1,
    ID: id,
  });
  console.log(res);
  return res.data.data;
};
export { getContent };
