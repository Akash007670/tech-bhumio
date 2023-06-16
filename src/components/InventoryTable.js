import React, { useEffect, useState } from "react";
import Table from "./Table";

const InventoryTable = ({ data, setData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredResult = data.filter((item) => {
      let result =
        item.part.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.alt_part.toLowerCase().includes(searchQuery.toLowerCase());

      return result;
    });
    setFilteredData(filteredResult);
  }, [searchQuery, data]);

  return (
    <div style={{ border: "2px solid blue", overflow: "auto" }}>
      <input
        type="text"
        placeholder="Search Items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
  );
};

export default InventoryTable;
