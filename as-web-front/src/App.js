import React from "react";
import "./assets/scss/app.scss";
import Header from "./components/Header";
import FormWarranty from "./components/Warranty/FormWarranty";
import RecheckFormWarranty from "./components/Warranty/RecheckFormWarranty";

export default function App() {
  return (
    <div className="site-content">
      {/* <Header /> */}
      <FormWarranty />
      <RecheckFormWarranty />
    </div>
  );
}
