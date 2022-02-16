import "./UploadForm.css";
import React, { useState } from "react";
import Card from "../Card/Card";

const UploadForm = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const uploadFile1 = (event) => {
    setInput1(event.target.files[0]);
  };

  const uploadFile2 = (event) => {
    setInput2(event.target.files[0]);
  };

  const clearForm = () => {
    setInput1("");
    setInput2("");
  };

  const submitCompare = async (e) => {
    e.preventDefault();

    try {
      let contentFile1 = await readFileAsync(input1);
      debugger;
      console.log(contentFile1);
    } catch (err) {
      console.log(err);
    }
  };

  const readFileAsync = (csvFile) => {
    return new Promise((resolve, reject) => {
        debugger;
      let reader = new FileReader();

      reader.onload = (res) => {
        resolve(res.target.result); //return the value to the await
      };
      reader.onerror = (err) => console.log(err);
      reader.readAsText(csvFile);
    });
  };

  return (
    <Card>
      <form className="center-form" onSubmit={submitCompare}>
        <div className="flex-side">
          <label>Upload CSV:</label>
          <input type="file" accept=".csv" onChange={uploadFile1} />
        </div>
        <div className="flex-side">
          <label>Upload CSV:</label>
          <input type="file" accept=".csv" onChange={uploadFile2} />
        </div>
        <div className="center-buttons">
          <button type="reset" onClick={clearForm}>
            Clear
          </button>
          <button type="submit">Compare</button>
        </div>
      </form>
    </Card>
  );
};

export default UploadForm;
