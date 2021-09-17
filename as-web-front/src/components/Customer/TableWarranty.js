/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import {
  getWarrantyByCustomerId,
  GetProvinceData,
  getProductByBarcode,
  getProductType,
  getAllStore,
  GetAllDataWarrantyByCustomerID,
} from "../../GetDataDropDown";
import "../../assets/scss/components/data-table.scss";
export default function TestDataTable({ customer_id, textNoData }) {
  const [t, i18n] = useTranslation("common");
  const [DataProvince, setDataProvince] = useState([{}]);
  const [dataWarranty, setDataWarranty] = useState([]);
  const [trigerShow, setTrigerShow] = useState(false);
  let Type = [];
  let Store = [];
  const processArray = async (dataList) => {
    let resWarranty = [];
    let index = 0;
    for (const item of dataList) {
      const product = await getProductByBarcode(item.barcode_No);
      if (product) {
        resWarranty[index] = { ...item, ...product, key: index };
      } else {
        const mock = {
          id: index,
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
        };
        resWarranty[index] = { ...item, ...mock, key: index };
      }
      const checkType = Type.find(
        (t) => t.id === resWarranty[index].fK_Type_ID
      );
      if (checkType !== undefined) {
        resWarranty[index].fK_Type_ID = checkType.value;
      } else {
        resWarranty[index].fK_Type_ID = "-";
      }
      const checkStore = Store.find(
        (s) => s.id === resWarranty[index].store_ID
      );
      if (checkStore !== undefined) {
        resWarranty[index].store_ID = checkStore.store_Name;
      } else {
        resWarranty[index].store_ID = "-";
      }
      index++;
    }
    return resWarranty;
  };
  useEffect(async () => {
    const res = await GetProvinceData(1);
    setDataProvince(res);
    Type = await getProductType(1);
    Store = await getAllStore(1);
    // const resWarranty = await getWarrantyByCustomerId(customer_id);
    const resWarranty = await GetAllDataWarrantyByCustomerID(customer_id);
    const resWarrantySetProduct = await processArray(resWarranty);
    setDataWarranty(resWarrantySetProduct);
    setTrigerShow(true);
  }, []);
  useEffect(() => {
    // setTrigerShow(true);
  }, [dataWarranty]);
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
  const showimg = (img) => {
    var a = document.createElement("a");
    a.href = `${process.env.REACT_APP_DOMAIN_NAME}/${img}`;
    a.setAttribute("target", "_blank");
    a.click();
  };
  const columns = [
    {
      name: t("table.PdAndSp.date"),
      selector: "warranty_Date",
      sortable: true,
      cell: (row) => <div>{convertFormatDate(row.warranty_Date)}</div>,
    },
    {
      name: t("table.PdAndSp.type"),
      center: true,
      cell: (row) => <div className>{row.fK_Type_ID}</div>,
    },
    {
      name: t("table.PdAndSp.productCode"),
      center: true,
      cell: (row) => <div>{row.product_Code}</div>,
    },
    {
      name: t("table.PdAndSp.model"),
      // selector: "product_ID",
      //sortable: true,
      center: true,
      cell: (row) => <div>-</div>,
    },
    {
      name: t("table.PdAndSp.store"),
      // selector: "store_ID",
      center: true,
    },
    {
      name: t("table.PdAndSp.province"),
      selector: "province_ID",
      // sortable: true,
      cell: (row) => <div>{convertProvince(row.province_ID)}</div>,
    },
    {
      name: t("table.PdAndSp.image"),
      center: true,
      cell: (row) => (
        <div>
          <button className="p-2" onClick={() => showimg(row.image)}>
            click
          </button>
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  return (
    <div className="container">
      <div className="">
        {
          <DataTable
            data={dataWarranty}
            columns={columns}
            noDataComponent={textNoData} //or your component
            // customStyles={customStyles}
            pagination={true}
            paginationPerPage={5}
            progressPending={!trigerShow}
            progressComponent={
              <div style={{ fontSize: "20px", color: "#6e717f" }}>
                Loading...
              </div>
            }
          />
        }
      </div>
    </div>
  );
}
