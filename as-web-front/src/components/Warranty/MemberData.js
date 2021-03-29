import React, { useState, useEffect } from "react";
import http from "../../axios";
import { useTranslation } from "react-i18next";
export default function MemberData({
  FormDataWarranty,
  setFormDataWarranty,
  handleSearchByCustomerCode,
  Confirm,
  DisableFromSearch,
}) {
  const [t, i18n] = useTranslation("common");
  const changeCode = (e) => {
    handleSearchByCustomerCode(e.target.value);
    const data = { ...FormDataWarranty };
    setFormDataWarranty({
      ...data,
      Customer_Code: e.target.value,
    });
  };
  return (
    <div className="mt-3">
      <h3 className="font-weight-bold mb-3">ข้อมูลลูกค้า</h3>
      <div className="member-data">
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">
              {t("warranthForm.customerService")}
            </label>
            <input
              type="text"
              className="as-input"
              name="Customer_Code"
              onChange={(e) => changeCode(e)}
              disabled={!Confirm}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">
              {" "}
              {t("warranthForm.name")}
            </label>
            <input
              type="textarea"
              id="name"
              name="Customer_Firstname"
              className="as-input"
              disabled={DisableFromSearch || !Confirm}
              value={FormDataWarranty.Customer_Firstname}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Firstname: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">
              {t("warranthForm.surname")}
            </label>
            <input
              type="textarea"
              id="surname"
              className="as-input"
              name="Customer_Lastname"
              disabled={DisableFromSearch || !Confirm}
              value={FormDataWarranty.Customer_Lastname}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Lastname: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="font-weight-bold">{t("warranthForm.tel")}</label>
            <input
              type="textarea"
              id="tel"
              className="as-input"
              name="Customer_Tel"
              disabled={DisableFromSearch || !Confirm}
              value={FormDataWarranty.Customer_Tel}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Tel: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="font-weight-bold">
              {t("warranthForm.phone")}
            </label>
            <input
              type="textarea"
              id="phone"
              className="as-input"
              name="Customer_Mobile"
              disabled={DisableFromSearch || !Confirm}
              value={FormDataWarranty.Customer_Mobile}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Mobile: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="font-weight-bold">
              {t("warranthForm.email")}
            </label>
            <input
              type="textarea"
              id="email"
              className="as-input"
              name="Customer_Email"
              disabled={DisableFromSearch || !Confirm}
              value={FormDataWarranty.Customer_Email}
              onChange={(e) =>
                setFormDataWarranty({
                  ...FormDataWarranty,
                  Customer_Email: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
