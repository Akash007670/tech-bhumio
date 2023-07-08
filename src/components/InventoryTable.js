import React, { useEffect, useState } from "react";
import InventoryModal from "./InventoryModal";
import Table from "./Table";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { usePapaParse } from "react-papaparse";
import { useCSVDownloader } from "react-papaparse";

const InventoryTable = ({ data, setData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { jsonToCSV } = usePapaParse();
  const { CSVDownloader } = useCSVDownloader();

  useEffect(() => {
    const filteredResult = data.filter((item) => {
      let result =
        item.part.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.alt_part.toLowerCase().includes(searchQuery.toLowerCase());

      return result;
    });
    setFilteredData(filteredResult);
  }, [searchQuery, data]);

  const handleJsonToCSV = () => {
    const jsonData = [...data];
    let newData = jsonData.map((item) => {
      delete item.id;
      delete item.undefined;
      return item;
    });
    let res = jsonToCSV(newData);
    return res;
  };

  return (
    <div className="inventory-table-wrapper">
      <div className="search-bar-wrapper">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            value={searchQuery}
            className="p-inputtext-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </span>
        <Button
          label="Update Inventory"
          size="small"
          severity="info"
          onClick={() => setShowModal(true)}
          icon="pi pi-file-edit"
        />
        <CSVDownloader filename="Inventory" bom={true} data={handleJsonToCSV}>
          <Button
            label="Export Data"
            size="small"
            severity="info"
            icon="pi pi-download"
          />
        </CSVDownloader>
      </div>
      <InventoryModal
        filteredData={filteredData}
        data={data}
        setData={setData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="main-table-wrapper">
        {data.length > 0 && (
          <Table
            filterData={filteredData}
            hasDeleteBtn={true}
            setData={setData}
            setFilteredData={setFilteredData}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryTable;
