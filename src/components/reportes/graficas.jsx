import "../styles/navbar.css";
import logo from "../assets/04.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

function Graficas() {
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});

  useEffect(() => {
    fetch('src/routes/compras.routes')
      .then(response => response.json())
      .then(data => {
        const labels1 = data.map(compra => compra.nombre_producto);
        const datasetData1 = data.map(compra => compra.cantidad);

        const transformedData1 = {
          labels: labels1,
          datasets: [
            {
              label: 'Gastos por producto',
              data: datasetData1,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de fondo de las barras
              borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
              borderWidth: 1, // Ancho del borde de las barras        
            },
          ],
        };

        setChartData1(transformedData1);
      });
  }, []);

  useEffect(() => {
    fetch('src/routes/pasteles.routes')
      .then(response => response.json())
      .then(data => {
        const labels2 = data.map(pastel => pastel.nombre_past);
        const datasetData2 = data.map(pastel => pastel.precio_pastel);

        const transformedData2 = {
            labels: labels2,
            datasets: [
              {
                label: 'Ventas de pastel',
                data: datasetData2,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)', // Color de fondo del primer segmento
                  'rgba(54, 162, 235, 0.6)', // Color de fondo del segundo segmento
                  'rgba(255, 206, 86, 0.6)', // Color de fondo del tercer segmento
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)', // Color del borde del primer segmento
                  'rgba(54, 162, 235, 1)', // Color del borde del segundo segmento
                  'rgba(255, 206, 86, 1)', // Color del borde del tercer segmento
                ],
                borderWidth: 1, // Ancho del borde de los segmentos
              },
            ],
            options: {
              cutoutPercentage: 50, // Porcentaje de recorte del centro del gráfico de dona
              rotation: -0.5 * Math.PI, // Rotación inicial del gráfico de dona (en radianes)
            },
          };

        setChartData2(transformedData2);
      });
  }, []);

  return (
    <div className="App">
      <Bar data={chartData1} />
      <Doughnut data={chartData2} />
    </div>
  );
}

export default Graficas;