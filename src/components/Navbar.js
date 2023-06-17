import { Button } from "primereact/button";
import React from "react";

const Navbar = ({ setShowModal }) => {
  return (
    <nav className="navbar">
      <h1 className="nav-title">Bhumio Sync</h1>
      <Button
        label="Add"
        icon="pi pi-file"
        size="small"
        severity="info"
        onClick={() => setShowModal(true)}
        style={{ marginRight: "10px" }}
      />
    </nav>
  );
};

export default Navbar;
