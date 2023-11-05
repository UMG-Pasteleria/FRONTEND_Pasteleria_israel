import React, { useEffect, useState } from "react";
import logo from "../../assets/04.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/pastelCumple.css";
import NavbarWEB from "../../components/navbarWeb";

const PastelCumpleWEB = () => {
  const URL = "https://8086zfpm-3000.use.devtunnels.ms/pastel";

  const [pasteles, setPastel] = useState([]);

  const getPastel = async () => {
    try {
      const response = await fetch(
        "https://8086zfpm-3000.use.devtunnels.ms/pastel"
      );
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
          {pasteles.map((pasteles, index) => (
            <div className="sectionMainCumple" key={index}>
              <div className="pastel">
                <div className="Cumple"></div>
                <div className="datoPastel">
                  <div className="TituloPastel">
                    <h3>{pasteles.pastel}</h3>
                  </div>
                  <div className="descripcion">
                    <h5>{pasteles.tamanio}</h5>
                    <h5>{pasteles.decoracion}</h5>
                    <h5>{pasteles.categoria}</h5>
                  </div>
                  <div className="precio">
                    <h3>Q. {pasteles.precio}</h3>
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
