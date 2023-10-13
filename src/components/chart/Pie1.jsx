import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom",
      display: true,
      labels: {
        color: "#5E5E5E",
        FontFace: "Istok Web",
        FontFaceSet: "bold",
        padding: 10,
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      text: "Total de pasteles vendidos durante la semana",
      position: "bottom",
    },
    responsive: true,
    scales: {
      x: {},
      y: {},
    },
  },
};

var data = {
  labels: ["Pastel frío", "Pastel Seco", "Pie"],
  datasets: [
    {
      label: "Ventas de pasteles",
      data: [300, 50, 100],
      backgroundColor: [
        "rgba(20, 150, 255, 0.2)",
        "rgba(200, 100, 20, 0.2)",
        "rgba(50, 200, 20, 0.2)",
      ],
      borderColor: [
        "rgba(20, 150, 255, 0.2)",
        "rgba(200, 100, 20, 0.2)",
        "rgba(50, 200, 20, 0.2)",
      ],
      hoverOffset: 15,
      borderwidth: 5,
    },
  ],
};

function Pie1() {
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Pie1;
