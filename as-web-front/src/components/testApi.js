import React, { useState, useEffect } from "react";
import axios from "axios";
export default function TestApi() {
  const [name, setName] = useState("");
  useEffect(() => {
    console.log(name);
  }, [name]);
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
  let dataMock2 = {
    Barcode_Number: "123",
    Customer_Address: "123",
    Customer_Code: "ทดสอบรับประกัน123",
    Customer_District: 1,
    Customer_Email: "ทดสอบรับประกัน@email.com",
    Customer_Firstname: "123",
    Customer_Lastname: "123",
    Customer_Latitude: "15.881473792312825",
    Customer_Longtitude: "100.97935717582705",
    Customer_Mobile: "0123456789",
    Customer_Province: 1,
    Customer_SubDistrict: 1,
    Customer_Tel: "0123456789",
    Customer_ZipCode: "123",
    Description: "ทดสอบรับประกัน description",
    Model_ID: 1,
    Product_Code_Other: "12",
    Product_ID: 1,
    Purchase_Date: "2021-03-19",
    Purchase_Province: 1,
    QTY: 12,
    Receipt_Number: "1",
    Score: 1,
    Store_ID: 1,
    Store_Name_Other: "12",
    Type_ID: 1,
    Warranty_Number: "12",
  };
  const formData = new FormData();
  const handleSelectFile = (e) => {
    console.dir(e.target.attributes.index.value);
    formData.append("files", e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("datas", JSON.stringify(dataMock));
    axios
      .post(
        "http://www.mostactive.info/API/api/Warranty/AddDataWarranty",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const test = () => {
    setName("Nick");
  };
  return (
    <div>
      <button onClick={test}>tesat</button>
      <form onSubmit={handleSubmit}>
        <label for="upload-photo">Browse...</label>
        <input
          type="file"
          name="photo"
          id="upload-photo"
          index="1"
          onChange={handleSelectFile}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  );
}
