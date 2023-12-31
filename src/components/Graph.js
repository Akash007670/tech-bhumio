import React from "react";
import { saveAs } from "file-saver";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button } from "primereact/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Inventory Bar Chart",
    },
  },
};

const Graph = ({ graphData }) => {
  let newArr = [...graphData];

  let itemData = {};

  newArr.forEach((item) => {
    let { name, loca_stocka, loca_stockb, rate } = item;
    if (itemData[name]) {
      itemData[name].loca_stocka.push(loca_stocka);
      itemData[name].loca_stockb.push(loca_stockb);
      itemData[name].rate.push(rate);
    } else {
      itemData[name] = {
        loca_stocka: [loca_stocka],
        loca_stockb: [loca_stockb],
        rate: [rate],
      };
    }
  });
  const labels = ["Loca_StockA", "Loca_StockB", "Rate"];

  const datasets = Object.entries(itemData).map(([label, values], index) => {
    const colors = [
      "#115f9a",
      "#1984c5",
      "#22a7f0",
      "#48b5c4",
      "#76c68f",
      "#a6d75b",
      "#c9e52f",
      "#d0ee11",
      "#d0f400",
    ];

    const backgroundColor = colors[index % colors.length];
    return {
      label,
      data: [values.loca_stocka[0], values.loca_stockb[0], values.rate[0]],
      backgroundColor: backgroundColor,
    };
  });
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const downloadBarChartAsImage = () => {
    const canvasSave = document.getElementById("inventoryChart");
    if (canvasSave)
      canvasSave.toBlob(function (blob) {
        saveAs(blob, "chart.png");
      });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Bar id="inventoryChart" options={options} data={chartData} />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          label="Download Chart"
          size="small"
          severity="info"
          icon="pi pi-download"
          onClick={downloadBarChartAsImage}
        />
      </div>
    </div>
  );
};

export default Graph;
