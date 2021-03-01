import React from "react";
import axios from "axios";
export default function testApi() {
  let dataMock = {
    Customer_Code: "ทดสอบรับประกัน",
    Customer_Firstname: "ทดสอบรับประกัน1",
    Customer_Lastname: "ทดสอบรับประกัน2",
    Customer_Tel: "0123456789",
    Customer_Mobile: "0123456789",
    Customer_Email: "ทดสอบรับประกัน@email.com",
    Customer_Address: "ทดสอบรับประกัน address",
    Customer_Province: 1,
    Customer_District: 1,
    Customer_SubDistrict: 1,
    Customer_ZipCode: "12345",
    Customer_Latitude: "123.456",
    Customer_Longtitude: "456.123",
    Purchase_Province: 1,
    Purchase_Date: "2021-02-28T16:49:06.885Z",
    Store_ID: 1,
    Store_Name_Other: "ทดสอบรับประกัน",
    Receipt_Number: "123456789",
    Barcode_Number: "123456789",
    Warranty_Number: "123456789",
    Type_ID: 1,
    Product_ID: 1,
    Model_ID: 1,
    Product_Code_Other: "ทดสอบรับประกัน",
    QTY: 23,
    Score: 4,
    Description: "ทดสอบรับประกัน description",
  };
  const formData = new FormData();
  const handleSelectFile = (e) => {
    formData.append("files", e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("datas", JSON.stringify(dataMock));
    axios
      .post("http://119.59.117.57/API/api/Warranty/AddDataWarranty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleSelectFile} />
        <button>submit</button>
      </form>
    </div>
  );
}
