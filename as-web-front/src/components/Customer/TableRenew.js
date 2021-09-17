/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { GetAllCustomerRenewByCustomer_Code } from "../../GetDataDropDown";
import "../../assets/scss/components/data-table.scss";
export default function TestDataTable({
  customer_id,
  textNoData,
  name,
  customerCode,
  setRenewData,
}) {
  const [t, i18n] = useTranslation("common");
  const [trigerShow, setTrigerShow] = useState(false);
  const [DataRenew, setDataRenew] = useState([]);
  useEffect(async () => {
    const res = await GetAllCustomerRenewByCustomer_Code(customerCode);
    const datanew = res.data.map((item, index) => {
      return { No: index + 1, ...item };
    });
    console.log(datanew);
    setDataRenew(datanew);
    setTrigerShow(true);
  }, []);

  const columns = [
    {
      name: t("table.Renew.No"),
      cell: (row) => <div>{row.No}</div>,
    },
    {
      name: t("table.Renew.Date"),
      center: true,
      cell: (row) => <div className>{row.renew_Date || "-"}</div>,
    },
    // {
    //   name: t("table.Renew.Name"),
    //   center: true,
    //   cell: (row) => <div>{name || "-"}</div>,
    // },
    {
      name: t("table.Renew.Officer"),
      // selector: "product_ID",
      //sortable: true,
      center: true,
      cell: (row) => <div>{row.service_Form || "-"}</div>,
    },
    {
      name: t("table.Renew.NumRight"),
      // selector: "store_ID",
      center: true,
      cell: (row) => <div>{row.quota_Service || "-"}</div>,
    },
    {
      name: "",
      sortable: true,
      cell: (row) => (
        <div>
          <button
            className="p-2"
            onClick={() => {
              setRenewData(row);
            }}
          >
            See More Information
          </button>
        </div>
      ),
    },
    // {
    //   name: t("table.PdAndSp.image"),
    //   center: true,
    //   cell: (row) => (
    //     <div>
    //       <button onClick={() => showimg(row.image)}>click</button>
    //     </div>
    //   ),
    // },
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
            data={DataRenew}
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
