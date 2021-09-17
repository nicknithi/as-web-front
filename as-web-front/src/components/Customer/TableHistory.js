/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { GetDataServiceHistoryByCustomerCode } from "../../GetDataDropDown";
import "../../assets/scss/components/data-table.scss";
export default function TestDataTable({
  customer_id,
  textNoData,
  name,
  setSummaryData,
  customerCode,
}) {
  const [t, i18n] = useTranslation("common");
  const [trigerShow, setTrigerShow] = useState(false);
  const [DataRenew, setDataRenew] = useState([]);
  useEffect(async () => {
    const res = await GetDataServiceHistoryByCustomerCode(customerCode);
    console.log("res", res);
    if (customerCode) {
      const datanew = res.data.map((item, index) => {
        return { No: index + 1, ...item };
      });
      setDataRenew(datanew);
    }
    setTrigerShow(true);
  }, []);
  const convertDate = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  const columns = [
    {
      name: t("table.History.No"),
      cell: (row) => <div>{row.No}</div>,
    },
    {
      name: t("table.History.Date"),
      center: true,
      cell: (row) => <div className>{convertDate(row.serviceDate) || "-"}</div>,
      // cell: (row) => <div className>{row.ServiceDate || "-"}</div>,
    },
    {
      name: t("table.History.RecipeNumber"),
      center: true,
      cell: (row) => <div>{row.serviceHistory.serviceNumber || "-"}</div>,
    },
    {
      name: t("table.History.Admin"),
      // selector: "product_ID",
      //sortable: true,
      center: true,
      cell: (row) => <div>{row.serviceHistory.serviceStaff || "-"}</div>,
    },
    // {
    //   name: t("table.History.putan"),
    //   // selector: "store_ID",
    //   center: true,
    //   cell: (row) => <div>{row.serviceHistory.serviceStaff || "-"}</div>,
    // },
    {
      name: t("table.History.costService"),
      sortable: true,
      cell: (row) => <div>{row.serviceHistory.serviceCharge || "-"}</div>,
    },
    {
      name: t("table.History.costSpare"),
      sortable: true,
      cell: (row) => <div>{row.serviceHistory.spareCharge || "-"}</div>,
    },
    {
      name: "",
      center: true,
      cell: (row) => (
        <div>
          <button
            style={{ fontSize: "10px", margin: "10px" }}
            className="p-1"
            onClick={() => {
              setSummaryData(row);
            }}
          >
            See More Information
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
