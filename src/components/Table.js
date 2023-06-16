import React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const Table = ({ filterData, setData, setFilteredData, data }) => {
  const deleteHandler = (idToDelete) => {
    let deletedData = filterData.filter((item) => item.id !== idToDelete);
    setFilteredData(deletedData); // Here i've removed the item from the filteredArray

    const updateMainArray = data.filter((item) => item.id !== idToDelete);
    setData(updateMainArray); //similarly removed that item from the main array as well.
  };

  const deleteBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-times"
        rounded
        outlined
        severity="danger"
        aria-label="Cancel"
        onClick={() => deleteHandler(rowData.id)}
      />
    );
  };
  return (
    <div>
      <DataTable value={filterData} tableStyle={{ minWidth: "60rem" }}>
        <Column field="part" header="Part"></Column>
        <Column field="alt_part" header="Alt_Part"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="brand" header="Brand"></Column>
        <Column field="model" header="Model"></Column>
        <Column field="engine" header="Engine"></Column>
        <Column field="car" header="Car"></Column>
        <Column field="loc_a" header="LocA"></Column>
        <Column field="loca_stocka" header="LocA_Stock"></Column>
        <Column field="loc_b" header="LocB"></Column>
        <Column field="loca_stockb" header="LocB_Stock"></Column>
        <Column field="unit" header="Unit"></Column>
        <Column field="rate" header="Rate"></Column>
        <Column field="value" header="Value"></Column>
        <Column field="remarks" header="Remarks"></Column>
        <Column body={deleteBodyTemplate} header="Action"></Column>
      </DataTable>
    </div>
  );
};

export default Table;
