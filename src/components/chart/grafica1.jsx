import { Line } from "react-chartjs-2";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
var ingresos = [2951, 3254, 3568, 4024, 3558, 3958];
var gastos = [3351, 3254, 3368, 3024, 3058, 3158];

var data = {
  labels: dias,
  datasets: [
    {
      label: "Ingresos",
      data: ingresos,
      tension: 0.2,
      fill: true,
      backgroundColor: "rgba(200, 200, 225, 0.5)",
      borderColor: "rgba(200, 200, 250, 1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(100, 150, 200, 0.9)",
      pointBorderColor: "rgba(200, 200, 250, 1)",
    },
    {
      label: "Gatos",
      data: gastos,
      tension: 0.2,
      fill: true,
      backgroundColor: "rgba(20, 200, 225, 0.5)",
      borderColor: "rgba(20, 200, 250, 1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(20, 150, 200, 0.9)",
      pointBorderColor: "rgba(20, 200, 250, 1)",
    },
  ],
};

var options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: false,
    },
    x: {
      ticks: { color: "gray" },
    },
  },
};
function ChartDias() {
  return <Line data={data} options={options} />;
}
export default ChartDias;
