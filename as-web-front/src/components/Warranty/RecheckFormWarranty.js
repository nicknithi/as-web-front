import React from "react";
import { connect } from "react-redux";
import FormDisableWarranty from "./FormDisableWarranty";
function RecheckFormWarranty(prop) {
  return (
    <div>
      <h1>test all post</h1>
      {/* {prop.post.map((post, index) => (
        <FormDisableWarranty key={index} dataObject={post} />
      ))} */}
    </div>
  );
}

export default connect()(RecheckFormWarranty);
