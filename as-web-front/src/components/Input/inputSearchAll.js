import React, { useState } from "react";
import { GetAllDataASCC } from "../../GetContent";
import "../../assets/scss/components/input/input-search.scss";
export default function InputSearch({ placehoder }) {
  const [keySearch, setKeySearch] = useState("");
  const clickSearch = async () => {};

  const handleSearch = async (keySearch) => {
    const resSearch = await GetAllDataASCC(keySearch);
    console.clear();
    console.log(resSearch);
  };
  return (
    <div className="row no-gutters input-search input-group">
      <div className="col-md-10">
        <input
          type="text"
          className="input pl-2 w-100"
          placeholder={placehoder}
          onChange={(i) => {
            handleSearch(i.target.value);
          }}
        />
      </div>
      <div className="col-md-2">
        <button
          type="button"
          className="button"
          onClick={() => {
            clickSearch();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
