import React from "react";

function Spinner() {
  return (
    <div className="d-flex justify-content-center m-3">
      <div className="spinner spinner-border " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
