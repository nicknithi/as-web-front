import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  getWarrantyByCustomerId,
  GetProvinceData,
  getProductByBarcode,
  getProductType,
} from "../GetDataDropDown";
import "../assets/scss/components/data-table.scss";
export default function TestDataTable() {
  const [DataProvince, setDataProvince] = useState([{}]);
  useEffect(async () => {
    const res = await GetProvinceData();
    setDataProvince(res);
    const Type = await getProductType();

    const data = await getWarrantyByCustomerId(114);
    tableData = data;
    data.forEach(async (item, index) => {
      //console.log("product", item.barcode_No);
      const product = await getProductByBarcode(item.barcode_No);
      if (product) {
        data[index] = {
          ...item,
          ...product,
        };
      } else {
        data[index] = {
          ...item,
          ...{
            id: "-",
            lang_ID: "-",
            fK_Model_ID: "-",
            fK_Type_ID: "-",
            product_Code: "-",
            product_Old_Code: "-",
            product_Barcode: "-",
            product_Name: "-",
            is_Active: "-",
            create_By: "-",
            create_Date: "-",
            update_By: "-",
            update_Date: "-",
          },
        };
      }
      const checkType = Type.find((t) => t.id === data[index].fK_Type_ID);
      if (checkType !== undefined) {
        console.log("checkType", checkType);
        data[index].fK_Type_ID = checkType.value;
      } else {
        data[index].fK_Type_ID = "-";
      }
    });

    console.log("data", data);
    setTest(data);
  }, []);
  const convertProvince = (id) => {
    const province = DataProvince.find((p) => p.id === id);
    if (province !== undefined) {
      return province.value;
    } else {
      return "-";
    }
  };
  const convertFormatDate = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  };
  let tableData = [{}];
  const [test, setTest] = useState([{}]);

  const columns = [
    {
      name: "วัน/เดือน/ปี",
      sortable: true,
      cell: (row) => <div>{convertFormatDate(row.warranty_Date)}</div>,
    },
    {
      name: "ประเภทสินค้า",
      selector: "fK_Type_ID",
      sortable: true,
      center: true,
    },
    {
      name: "รหัสสินค้า",
      selector: "product_Code",
      sortable: true,
      center: true,
    },
    {
      name: "ชื่อรุ่น",
      selector: "product_ID",
      sortable: true,
      center: true,
      cell: (row) => <div>-</div>,
    },
    {
      name: "ร้านค้าที่ซื้อ",
      selector: "store_ID",
      sortable: true,
      center: true,
    },
    {
      name: "จังหวัดที่ซื้อ",
      selector: "province_ID",
      sortable: true,
      cell: (row) => <div>{convertProvince(row.province_ID)}</div>,
    },
    {
      name: "ภาพใบเสร็จ",
      sortable: true,
      center: true,
      cell: (row) => (
        <div>
          <button>คลิก</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="font-weight-bold">
        <DataTable
          data={test}
          columns={columns}
          pagination={true}
          paginationPerPage={5}
        />
      </div>
    </div>
  );
}
