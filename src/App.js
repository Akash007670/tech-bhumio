import { useEffect, useRef, useState } from "react";
import "./App.css";
import "primeicons/primeicons.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import CSVReader from "./components/CSVReader";
import InventoryTable from "./components/InventoryTable";
import Navbar from "./components/Navbar";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import NoDataFoundIcon from "./assets/No data-cuate.svg";

function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUploaded, setIsUploaded] = useState(() => {
    return localStorage.getItem("isUploaded") === "true";
  });

  const toast = useRef(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("csvData"));
    if (storedData) {
      setData((prev) => [...prev, ...storedData]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("isUploaded", isUploaded);
  }, [isUploaded]);

  useEffect(() => {
    localStorage.setItem("csvData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isUploaded) {
        setShowModal(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isUploaded]);

  useEffect(() => {
    if (isUploaded) {
      setTimeout(() => {
        setShowModal(false);
      }, 0);
    }
  }, [isUploaded]);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "File Uploaded Successfully.",
      life: 3000,
    });
  };
  const showRemoveSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "File Removed Successfully.",
      life: 2000,
    });
  };

  return (
    <div className="App">
      <div className="overlay-wrapper">
        <Navbar setShowModal={setShowModal} />
        <Dialog
          header="Upload File (.csv)"
          visible={showModal}
          style={{ width: "45vw", height: "20vw" }}
          onHide={() => setShowModal(false)}
        >
          <CSVReader
            setData={setData}
            setIsUploaded={setIsUploaded}
            setShowModal={setShowModal}
            isUploaded={isUploaded}
            showSuccess={showSuccess}
            showRemoveSuccess={showRemoveSuccess}
          />
        </Dialog>
        <div className="inventory-main-table-wrapper">
          {isUploaded ? (
            <InventoryTable data={data} setData={setData} />
          ) : (
            <div className="no-data-found-wrapper">
              <span className="no-data-found-title">No Data Found!!</span>
              <Image src={NoDataFoundIcon} alt="Image" width="250" />
            </div>
          )}
        </div>
        <Toast ref={toast} />
      </div>
    </div>
  );
}

export default App;
