import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getWarrantyByCustomerId } from "../GetDataDropDown";
export default function TestDataTable() {
  let tableData = [{}];
  const [test, setTest] = useState([{}]);
  useEffect(async () => {
    const data = await getWarrantyByCustomerId(114);
    tableData = data;
    console.log(data);
    setTest(data);
  }, []);
  //   const data = [
  //     {
  //       id: 1,
  //       title: "Conan the Barbarian",
  //       summary:
  //         "Orphaned boy Conan is enslaved after his village is destroyed...",
  //       year: "1982",
  //       expanderDisabled: true,
  //       image: "http://conan.image.png",
  //     },
  //   ];
  const columns = [
    {
      name: "วัน/เดือน/ปี",
      sortable: true,
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: "ประเภทสินค้า",
      selector: "product_ID",
      sortable: true,
      right: true,
    },
    {
      name: "รหัสสินค้า",
      selector: "product_ID",
      sortable: true,
      right: true,
    },
    {
      name: "ชื่อรุ่น",
      selector: "product_ID",
      sortable: true,
      right: true,
    },
    {
      name: "ร้านค้าที่ซื้อ",
      selector: "store_ID",
      sortable: true,
      right: true,
    },
    {
      name: "จังหวัดที่ซื้อ",
      selector: "province_ID",
      sortable: true,
      right: true,
    },
    {
      name: "ภาพใบเสร็จ",
      selector: "province_ID",
      sortable: true,
      right: true,
    },
  ];

  return (
    <div className="container">
      <DataTable
        data={test}
        columns={columns}
        pagination={true}
        paginationRowsPerPageOptions={[5, 15, 20, 25, 30]}
        paginationPerPage={5}
      />
    </div>
  );
}
