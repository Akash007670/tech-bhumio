import React, { useRef } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const Table = ({ filterData, setData, setFilteredData, data }) => {
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Row Deleted Successfully.",
      life: 3000,
    });
  };

  const deleteHandler = (idToDelete) => {
    let deletedData = filterData.filter((item) => item.id !== idToDelete);
    setFilteredData(deletedData); // Here i've removed the item from the filteredArray

    const updateMainArray = data.filter((item) => item.id !== idToDelete);
    setData(updateMainArray); //similarly removed that item from the main array as well.

    showSuccess();
  };

  const deleteBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        aria-label="Cancel"
        onClick={() => deleteHandler(rowData.id)}
      />
    );
  };
  return (
    <div className="table-wrapper">
      <DataTable
        value={filterData}
        size="small"
        scrollable
        scrollHeight="flex"
        tableStyle={{ minWidth: "40rem" }}
      >
        <Column
          field="part"
          header="Part"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="alt_part"
          header="Alt_Part"
          style={{ minWidth: "9rem" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          style={{ minWidth: "8rem" }}
        ></Column>
        <Column field="brand" header="Brand"></Column>
        <Column field="model" header="Model"></Column>
        {/* <Column field="engine" header="Engine"></Column> */}
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
      <Toast ref={toast} />
    </div>
  );
};

export default Table;
