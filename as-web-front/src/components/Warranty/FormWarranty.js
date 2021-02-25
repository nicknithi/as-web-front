import React from "react";
import { connect } from "react-redux";

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
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={(input) => (getTitle = input)}
          placeholder="Enter title"
          required
        />
        <br />
        <br />
        <input
          type="textarea"
          ref={(input) => (getDetail = input)}
          placeholder="Enter detail"
          required
        />
        <br />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
}
export default connect()(FormWarranty);
