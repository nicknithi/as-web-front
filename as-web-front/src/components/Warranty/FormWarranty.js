import React, { useEffect } from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import AddressSetting from "../../components/Warranty/AddressSetting";
import { getProvince, setTempInput } from "../../actions/fetchAction";
function FormWarranty(prop) {
  let fromWarrantyInput = {
    memberService: "",
    name: "",
    surname: "",
    tel: "",
    phone: "",
    email: "",
    addressProduct: "",
    postCode: "",
    map: "",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fromWarrantyInput.memberService = document.getElementById(
      "memberService"
    ).value;
    fromWarrantyInput.name = document.getElementById("name").value;
    fromWarrantyInput.surname = document.getElementById("surname").value;
    fromWarrantyInput.tel = document.getElementById("tel").value;
    fromWarrantyInput.phone = document.getElementById("phone").value;
    fromWarrantyInput.email = document.getElementById("email").value;
    fromWarrantyInput.addressProduct = document.getElementById(
      "addressProduct"
    ).value;
    fromWarrantyInput.postCode = document.getElementById("postCode").value;
    prop.dispatch(setTempInput(fromWarrantyInput));
  };
  useEffect(() => {
    prop.dispatch(getProvince());
  }, []);
  console.log(prop.data);
  return (
    <div>
      <div className="form-warranty">
        <MemberData />
        <form onSubmit={handleSubmit}>
          <AddressSetting dataObject={prop.data.DataDropdownReducer} />
        </form>
        <ProductData />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
export default connect(mapStateToProps)(FormWarranty);
