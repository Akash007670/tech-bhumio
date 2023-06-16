import { useState } from "react";
import "./App.css";
import "primeicons/primeicons.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import CSVReader from "./components/CSVReader";
import InventoryTable from "./components/InventoryTable";

function App() {
  const [data, setData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          border: "2px solid red",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <h1>Bhumio CSV Data Table</h1>
      </div>
      <CSVReader setData={setData} setIsUploaded={setIsUploaded} />
      {isUploaded && <InventoryTable data={data} setData={setData} />}
    </div>
  );
}

export default App;
