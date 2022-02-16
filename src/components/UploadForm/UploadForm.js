import "./UploadForm.css";
import React from "react";
import Card from "../Card/Card";

const UploadForm = () => {
  const fileName1 = "Testing.csv";
  const fileName2 = "Testing.csv";
  return (
    <Card>
      <form className="center-form">
        <div className="label-space-right">
          <label>Upload CSV:</label>
          <button>Upload</button>
          <label>{fileName1}</label>
        </div>
        <div className="label-space-right">
          <label>Upload CSV:</label>
          <button>Upload</button>
          <label>{fileName2}</label>
        </div>
        <button>Compare</button>
      </form>
    </Card>
  );
};

export default UploadForm;
