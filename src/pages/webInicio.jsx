import React, { useEffect, useState } from "react";
import logo from "../assets/04.jpg";
import { Navigate } from "react-router-dom";
import "../styles/webInicio.css";
import NavbarWEB from "../components/navbarWeb";
const Web = () => {
  const URL = "https://8086zfpm-3000.use.devtunnels.ms/web";

  const [web, setWeb] = useState([]);

  const getWeb = async () => {
    try {
      const response = await fetch(URL);
      const web = await response.json();
      setWeb(web);
      console.log(web);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeb();
  }, []);

  return (
    <>
      <div className="ContenedorWeb">
        <div className="main">
          <div className="bannerEncabezado">
            <img src={logo} className="logoLogin" />
          </div>
          <div className="sectionMain">
            {web.map((web, index) => (
              <div className="contenedorDatosWeb" key={index}>
                <div className="TituloWeb">
                  <h2>{web.titulo}</h2>
                </div>
                <div className="DescripcionWeb">
                  <p>{web.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="footer">
          <div className="cont">
            <h3>Pasteleria Israel</h3>
            <div className="texto">
              <h5>derechos reservados</h5>
            </div>
          </div>
        </footer>
        <NavbarWEB />
      </div>
    </>
  );
};

export default Web;
