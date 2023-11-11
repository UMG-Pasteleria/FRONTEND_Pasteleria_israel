// import "../styles/inicio.css";
import React from "react";
import Navbar from "../components/navbar";
import ChartDias from "../components/chart/grafica1";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Pie1 from "../components/chart/Pie1";

function Reportes() {
  const { handleSubmit, register } = useForm();
  const enviarInicio = handleSubmit((data) => {
    console.log(data);
  });

  const navegate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="grid-container">
        <section className="main">
          <article className="contenido">
            <div className="reportes">
              <h1>Reportes</h1>
              <br />
              <ChartDias />
            </div>
            <br></br>

            <div className="ContenedorPie">
              <div className="ChartPie">
                <span className="TituloItem">Pasteles vendidos</span>
                <div style={{ width: "70%", maxHeight: "400px" }}>
                  <Pie1 />
                </div>
              </div>
              <div className="ChartPie">
                <span className="TituloItem">Insumos disponibles</span>
                <div style={{ width: "70%", maxHeight: "400px" }}>
                  <Pie1 />
                </div>
              </div>
            </div>
          </article>
          {/* <article className="MenuInicio">
            <div className="ElementoMenu1">
              <span className="TituloItem">Productos</span>
            </div>

            <div className="ElementoMenu2">
              <span className="TituloItem">Clientes</span>
            </div>

            <div className="ElementoMenu3" onClick={() => navegate("/Usuario")}>
              <span className="TituloItem">Empleados</span>
            </div>

            <div className="ElementoMenu4">
              <span className="TituloItemWEB">Pagina WEB</span>
              <div className="Logo"></div>
            </div>
          </article> */}
        </section>
      </div>
    </>
  );
}

export default Reportes;

// style={{
//   width: "200px",
//   height: "200px",
//   padding: "10px 0px",
//   margin: "10px 0px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// }}
