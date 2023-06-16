import React from "react";
import { useCSVReader } from "react-papaparse";
import { v4 as uuidv4 } from "uuid";

export default function CSVReader({ setData, setIsUploaded }) {
  const { CSVReader } = useCSVReader();

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
  };
  const errorHandler = (err) => {
    console.log(err);
    setIsUploaded(false);
  };

  const handleRemove = () => {
    setData([]);
    setIsUploaded(false);
  };

  return (
    <CSVReader onUploadAccepted={uploadHandler} onUploadRejected={errorHandler}>
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <div>
            <button type="button" {...getRootProps()}>
              Browse file
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            <button
              type="button"
              {...getRemoveFileProps()}
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
          <ProgressBar />
        </>
      )}
    </CSVReader>
  );
}
