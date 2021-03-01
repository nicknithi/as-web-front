import React, { useEffect } from "react";
import { connect } from "react-redux";
import MemberData from "../Warranty/MemberData";
import ProductData from "../Warranty/ProductData";
import FormRate from "../Warranty/FormRate";
import AddressSetting from "../../components/Warranty/AddressSetting";
import { getProvince, setTempInput } from "../../actions/fetchAction";
import ButtonMain from "../button/ButtonMain";
import CostWarrantyDetail from "./CostWarrantyDetail";
import WarrantyConfirm from "./WarrantyConfirm";

function FormWarranty(prop) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        <CostWarrantyDetail />
        <WarrantyConfirm
          title={"การลงทะเบียนรับประกันสินค้า"}
          description={
            "การลงทะเบียนการรับประกันสินค้าเพื่ออำนวยความสะดวกในการแสดงข้อมูลและหลักฐานการซื้อขายเป็นไปตามเงื่อนไขอัตราค่าบริการและการรับประกันบริษัทฯขอสงวนสิทธิในการตรวจสอบข้อมูลที่แสดง กับสินค่าที่ซื้อหรือติดตั้งเพื่อความถูกต้องของข้อมูล"
          }
        />
        <MemberData />
        <form onSubmit={handleSubmit}>
          <AddressSetting dataObject={prop.data.DataDropdownReducer} />
        </form>
        <ProductData />
        <FormRate />
        <div className="row">
          <div className="col-md-4 mx-auto text-center mt-4">
            <ButtonMain
              title="ตรวจสอบข้อมูล"
              color="#636363"
              BgColor="#ffaa29"
            />
          </div>
        </div>
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
