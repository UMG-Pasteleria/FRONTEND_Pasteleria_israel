import React, { useEffect, useState } from "react";
import logo from "../assets/04.jpg";
import NavbarWEB from "../components/navbarWeb";
import { useNavigate } from "react-router-dom";

import "../styles/webInicio.css";
const Web = () => {
  const URL = import.meta.env.VITE_URL;

  const [web, setWeb] = useState([]);

  const getWeb = async () => {
    try {
      const response = await fetch(URL + "web");
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
  const navegate = useNavigate();
  return (
    <>
      <div className="ContenedorWeb">
        <div className="main">
          <div className="bannerEncabezado">
            <img
              src={logo}
              className="logoLogin"
              onClick={() => navegate("/Admin")}
            />
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
