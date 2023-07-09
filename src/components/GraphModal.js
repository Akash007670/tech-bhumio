import React from "react";
import { Dialog } from "primereact/dialog";
import Graph from "./Graph";

const GraphModal = ({ showGraphModal, setShowGraphModal, data }) => {
  return (
    <div>
      <Dialog
        header="Inventory Graph"
        visible={showGraphModal}
        style={{ width: "60vw", height: "35vw" }}
        onHide={() => setShowGraphModal(false)}
      >
        <Graph graphData={data} />
      </Dialog>
    </div>
  );
};

export default GraphModal;
