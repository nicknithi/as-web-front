import React from "react";
import "../../assets/scss/components/button/manage-form.scss";
export default function ButtonManageForm({
  addProductForm,
  addStoreForm,
  deleteFormProduct,
}) {
  return (
    <div className="manage-form text-center mt-3 d-flex justify-content-center">
      <button
        className="mr-3 delete-product font-weight-bold"
        type="button"
        onClick={deleteFormProduct}
      >
        ลบสินค้ารับประกัน
      </button>
      <button
        type="button"
        className="mr-3 plus-product font-weight-bold"
        onClick={addProductForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        เพิ่มสินค้ารับประกัน
      </button>
      <button
        className="plus-store font-weight-bold"
        type="button"
        onClick={addStoreForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        เพิ่มร้านค้า
      </button>
    </div>
  );
}
