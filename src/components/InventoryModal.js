import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const InventoryModal = ({
  filteredData,
  setData,
  data,
  showModal,
  setShowModal,
}) => {
  const locaStockEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        min={0}
        max={100}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
  const locbStockEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        min={0}
        max={100}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field } = e;

    rowData[field] = newValue;

    const updatedData = data.map((item) => {
      if (item.id === rowData.id) {
        return { ...rowData };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div>
      <Dialog
        header="Update Inventory"
        visible={showModal}
        style={{ width: "67vw" }}
        onHide={() => setShowModal(false)}
      >
        <div>
          <DataTable
            value={filteredData}
            tableStyle={{ minWidth: "60rem" }}
            editMode="cell"
          >
            <Column field="part" header="Part"></Column>
            <Column field="alt_part" header="Alt_Part"></Column>
            <Column field="model" header="Model"></Column>
            <Column field="loc_a" header="LocA"></Column>
            <Column
              field="loca_stocka"
              header="LocA_Stock"
              editor={(options) => locaStockEditor(options)}
              onCellEditComplete={onCellEditComplete}
            ></Column>
            <Column field="loc_b" header="LocB"></Column>
            <Column
              field="loca_stockb"
              header="LocB_Stock"
              editor={(options) => locbStockEditor(options)}
              onCellEditComplete={onCellEditComplete}
            ></Column>
          </DataTable>
        </div>
        <div className="modal-btn-wrapper">
          <Button
            label="Close"
            severity="danger"
            rounded
            onClick={() => setShowModal(false)}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default InventoryModal;
