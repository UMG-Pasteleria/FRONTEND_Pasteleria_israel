import React, { useEffect, useState } from "react";
import logo from "../../assets/04.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/pastelCumple.css";
import NavbarWEB from "../../components/navbarWeb";

const PastelCumpleWEB = () => {
  // const URL = "http://localhost:3000/web";

  // const [web, setWeb] = useState([]);

  // const getWeb = async () => {
  //   try {
  //     const response = await fetch(URL);
  //     const web = await response.json();
  //     setWeb(web);
  //     console.log(web);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getWeb();
  // }, []);

  const navegate = useNavigate();

  return (
    <>
      <div className="ContenedorWeb">
        <div className="main">
          <div className="log"></div>
          <hr />
          <div className="sectionMain">
            <div className="pastel">
              <div className="Cumple">
                <div className="TituloProducto">
                  <h2>Cumpleaños</h2>
                </div>
              </div>
            </div>

            <div className="Bodas">
              <div className="TituloProducto">
                <h2>Bodas</h2>
              </div>
            </div>

            <div className="Festivos">
              <div className="TituloProducto">
                <h2>Dias festivos</h2>
              </div>
            </div>

            <div className="Frios">
              <div className="TituloProducto">
                <h2>Pasteles frios</h2>
              </div>
            </div>

            <div className="Pies">
              <div className="TituloProducto">
                <h2> Pies </h2>
              </div>
            </div>
          </div>
        </div>

        <NavbarWEB />
      </div>
    </>
  );
};

export default PastelCumpleWEB;
