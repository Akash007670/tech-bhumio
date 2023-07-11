import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const EmbededGraphLink = ({ visibleRight, setVisibleRight }) => {
  return (
    <div>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        style={{ width: "24rem" }}
      >
        <p className="sidebar-header">Embeded Link</p>
        <div className="embeded-link-wrapper">
          <p>&lt;iframe</p>
          <p>
            src="
            <span class="embed-core">
              https://bhumios-sync.netlify.app/embed/EMBED_ID
            </span>
            "
          </p>
          <p>&gt;&lt;/iframe&gt;</p>
          <button type="button" className="copy-btn">
            <i className="pi pi-copy"></i>
          </button>
        </div>
        <Button
          label="Generate Link"
          size="small"
          severity="info"
          style={{ marginLeft: "8px", marginTop: "15px" }}
          onClick={() => alert("This Feature is in Progress.")}
        />
      </Sidebar>
    </div>
  );
};

export default EmbededGraphLink;
