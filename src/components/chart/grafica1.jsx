import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
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

function ChartDias() {
  const [ventas, setVentas] = useState([]);

  const URL = import.meta.env.VITE_URL;

  const getData = async () => {
    try {
      const response = await fetch(URL + "totalventas");
      const datos = await response.json();
      setVentas(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  moment.locale("es");
  // var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  var ingresos = ventas.map((item) => item.total).slice(0, 7);
  var dias = ventas
    .map((item) => moment(item.fecha_entrega).format("dddd"))
    .slice(0, 7);
  console.log(dias);
  var data = {
    labels: dias,
    datasets: [
      {
        label: "Gastos",
        data: dias,
        tension: 0.2,
        fill: true,
        backgroundColor: "rgba(200, 200, 225, 0.5)",
        borderColor: "rgba(200, 200, 250, 1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(100, 150, 200, 0.9)",
        pointBorderColor: "rgba(200, 200, 250, 1)",
      },
      {
        label: "Ingresos",
        data: ingresos,
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

  return <Line data={data} options={options} />;
}
export default ChartDias;
