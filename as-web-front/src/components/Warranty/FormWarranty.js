import React from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import AddressSetting from "../../components/Warranty/AddressSetting";
function FormWarranty(prop) {
  let getTitle = "";
  let getDetail = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = getTitle.value;
    const detail = getDetail.value;
    const data = {
      id: new Date(),
      title,
      detail,
    };
    console.log(prop);
    prop.dispatch({
      type: "ADD_POST",
      data,
    });
    getTitle.value = "";
    getDetail.value = "";
  };
  return (
    <div>
      <div className="form-warranty">
        <form>
          <MemberData />
          <AddressSetting />
          <ProductData />
        </form>
      </div>
    </div>
  );
}
export default connect()(FormWarranty);
