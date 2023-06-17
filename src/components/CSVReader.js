import React from "react";
import { useCSVReader, usePapaParse } from "react-papaparse";
import sampleFile from "../inventory.csv";
import { v4 as uuidv4 } from "uuid";
import { Button } from "primereact/button";

export default function CSVReader({
  setData,
  setIsUploaded,
  setShowModal,
  isUploaded,
  showSuccess,
  showRemoveSuccess,
}) {
  const { CSVReader } = useCSVReader();
  const { readRemoteFile } = usePapaParse();

  //These are the keys for my parsed csv data in which i will assign these keys to their respective values.
  const keys = [
    "part",
    "alt_part",
    "name",
    "brand",
    "model",
    "engine",
    "car",
    "loc_a",
    "loca_stocka",
    "loc_b",
    "loca_stockb",
    "unit",
    "rate",
    "value",
    "remarks",
  ];

  //This is upload handler

  const uploadHandler = (e) => {
    let csvData = [];
    for (let i = 1; i < e.data.length - 1; i++) {
      const data = e.data[i];
      csvData.push(data);
    }
    const result = csvData.map((entry) =>
      entry.reduce(
        (acc, value, index) => {
          acc[keys[index]] = value;
          return acc;
        },
        { id: uuidv4() } // ---> Adding my uuid for Edit/Delete purpose
      )
    );
    setData(result);
    setIsUploaded(true);
    showSuccess();
  };
  const errorHandler = (err) => {
    console.log(err);
    setIsUploaded(false);
    setData([]);
    setShowModal(false);
  };

  //Handling sample file in case user does not have required csv

  const handleSampleFile = () => {
    readRemoteFile(sampleFile, {
      complete: (e) => {
        let csvData = [];
        for (let i = 1; i < e.data.length - 1; i++) {
          const data = e.data[i];
          csvData.push(data);
        }
        const result = csvData.map((entry) =>
          entry.reduce(
            (acc, value, index) => {
              acc[keys[index]] = value;
              return acc;
            },
            { id: uuidv4() }
          )
        );
        setData(result);
        setIsUploaded(true);
        showSuccess();
      },
    });
  };

  const handleRemove = () => {
    setData([]);
    setIsUploaded(false);
    setShowModal(false);
    showRemoveSuccess();
  };

  return (
    <CSVReader
      onUploadAccepted={uploadHandler}
      onUploadRejected={errorHandler}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        event.preventDefault();
      }}
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps }) => (
        <>
          <Button
            label="Use Sample File"
            size="small"
            severity="info"
            onClick={handleSampleFile}
            icon="pi pi-arrow-right"
            iconPos="right"
            className="sample-file-btn"
            disabled={isUploaded}
          />
          <div {...getRootProps()} className="csv-reader-wrapper">
            {acceptedFile ? (
              <>
                <div>
                  <div>
                    <span>{acceptedFile.name}</span>
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    onMouseOver={(event) => {
                      event.preventDefault();
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                    }}
                  ></div>
                </div>
              </>
            ) : (
              "Drop CSV file here or click to upload"
            )}
          </div>
          <div className="remove-btn-wrapper">
            <Button
              label="Remove"
              size="small"
              severity="danger"
              {...getRemoveFileProps()}
              onClick={handleRemove}
            />
          </div>
        </>
      )}
    </CSVReader>
  );
}
