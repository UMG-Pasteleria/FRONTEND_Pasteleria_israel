import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Pie1() {
  const [pasteles, setPastel] = useState([]);

  const URL = import.meta.env.VITE_URL;

  const getData = async () => {
    try {
      const response = await fetch(URL + "pastelesvendidos");
      const datos = await response.json();
      setPastel(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  var stock = pasteles.map((item) => item.total).slice(0, 15);
  var pastel = pasteles.map((item) => item.pastel).slice(0, 15);

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
    labels: pastel,
    datasets: [
      {
        label: "Ventas de pasteles",
        data: stock,
        backgroundColor: [
          "rgba(255, 114, 70,0.5)",
          "rgba(255, 175, 92,0.5)",
          "rgba(255, 212, 84,0.5)",
          "rgba(144, 156, 90,0.5)",
          "rgba(0, 138, 147,0.5)",
        ],
        borderColor: [
          "rgba(255, 114, 70,0.7",
          "rgba(255, 175, 92,0.7)",
          "rgba(255, 212, 84,0.7)",
          "rgba(144, 156, 90,0.7)",
          "rgba(0, 138, 147,0.7)",
        ],
        hoverOffset: 15,
        borderwidth: 5,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Pie1;
