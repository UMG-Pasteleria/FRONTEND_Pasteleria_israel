import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Pie1 from "../components/chart/Pie1";
import ChartDias from "../components/chart/grafica1";
import Navbar from "../components/navbar";
import "../styles/inicio.css";

function Reportes() {
  const { handleSubmit, register } = useForm();
  const enviarInicio = handleSubmit((data) => {
    console.log(data);
  });


     /*----Proteger Rutas---Solo se puede accesar SI ESTA LOGEADO */
     const navegate = useNavigate();

     useEffect(() => {
       // Comprobar si el token existe en el localStorage
       const token = localStorage.getItem('token');
   
       // Si no hay token, redirigir al inicio
       if (!token) {
         navegate('/Admin'); // Reemplaza '/inicio' con la ruta a la que quieres redirigir
       }
     }, []);

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
