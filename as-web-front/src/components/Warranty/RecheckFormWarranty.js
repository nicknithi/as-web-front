import React from "react";
import { connect } from "react-redux";
function RecheckFormWarranty(props) {
  return (
    <div>
      <h1>test all post</h1>
      {console.log(props.posts)}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state,
  };
};

export default connect(mapStateToProps)(RecheckFormWarranty);
