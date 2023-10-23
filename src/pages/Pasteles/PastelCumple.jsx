import React, { useEffect, useState } from "react";
import logo from "../../assets/04.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/pastelCumple.css";
import NavbarWEB from "../../components/navbarWeb";

const PastelCumpleWEB = () => {
  const URL = "http://localhost:3000/pastel";

  const [pastel, setPastel] = useState([]);

  const getPastel = async () => {
    try {
      const response = await fetch("http://localhost:3000/pastel");
      const pastel = await response.json();
      setPastel(pastel);
      console.log(pastel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPastel();
  }, []);

  const navegate = useNavigate();

  return (
    <>
      <div className="ContenedorWeb">
        <div className="main">
          <div className="logo">
            <img src={logo} className="logoLoginC" />
            <div className="TituloPagina">
              {" "}
              <h2>Cumpleaños</h2>
            </div>
          </div>
          <hr />
          {pastel.map((pastel, index) => (
            <div className="sectionMainCumple" key={index}>
              <div className="pastel">
                <div className="Cumple"></div>
                <div className="datoPastel">
                  <div className="TituloPastel">
                    <h3>{pastel.nombre_past}</h3>
                  </div>
                  <div className="descripcion">
                    <h5>{pastel.descripcion_pastel}</h5>
                  </div>
                  <div className="precio">
                    <h3>Q. {pastel.precio_pastel}</h3>
                  </div>
                </div>
                <div className="controles">
                  <button className="agregar">+</button>
                  <div className="cantidad">0</div>
                  <button className="quitar">-</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <NavbarWEB />
      </div>
    </>
  );
};

export default PastelCumpleWEB;
