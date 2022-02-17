import "./UploadForm.css";
import React, { useState } from "react";
import Card from "../Card/Card";

const UploadForm = () => {
  const [poshmark, setPoshmark] = useState("");
  const [inventory, setInventory] = useState("");
  const [notFound, setNotFound] = useState([]);

  const uploadPoshmark = (event) => {
    setPoshmark(event.target.files[0]);
  };

  const uploadInventory = (event) => {
    setInventory(event.target.files[0]);
  };

  const readFileAsync = (csvFile) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (res) => {
        resolve(res.target.result); //return the value to the await
      };
      reader.onerror = (err) => console.log(err);
      reader.readAsText(csvFile);
    });
  };

  const clearForm = () => {
    setPoshmark("");
    setInventory("");
    setNotFound([]);
  };

  const submitCompare = async (e) => {
    e.preventDefault();

    try {
      let poshmarkFile = await readFileAsync(poshmark);
      let inventoryFile = await readFileAsync(inventory);

      let poshmark_lines = poshmarkFile.split("\n"); //split by crlf
      let inventory_lines = inventoryFile.split("\n"); //split by crlf

      let poshmarkLength = poshmark_lines.length - 1;
      let inventoryLength = inventory_lines.length - 1;
      for (let i = 0; i < poshmarkLength; i++) {
        let poshmarkTitle = poshmark_lines[i];
        let matches = 0;
        for (let j = 0; j < inventoryLength; j++) {
          let inventoryTitle = inventory_lines[j];
          if (poshmarkTitle.toUpperCase() === inventoryTitle.toUpperCase()) {
            matches++;
          }
        }
        if (matches == 0) {
          setNotFound((arr) => [...arr, poshmarkTitle]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showNotFound = notFound.map((item) => {
    return <div className="line-items">{item}</div>;
  });

  return (
    <Card>
      <form className="center-form" onSubmit={submitCompare}>
        <div className="flex-side">
          <label>Upload Poshmark CSV:</label>
          <input type="file" accept=".csv" onChange={uploadPoshmark} />
        </div>
        <div className="flex-side">
          <label>Upload Inventory CSV:</label>
          <input type="file" accept=".csv" onChange={uploadInventory} />
        </div>
        <div className="center-buttons">
          <button type="reset" onClick={clearForm}>
            Clear
          </button>
          <button type="submit">Compare</button>
        </div>
      </form>
      <div>NUMBER OF MISMATCHES: {notFound.length}</div>
      {notFound.length > 0 && <div>{showNotFound}</div>}
    </Card>
  );
};

export default UploadForm;
