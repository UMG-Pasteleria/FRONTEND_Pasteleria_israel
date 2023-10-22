import "../styles/navbar.css";
import logo from "../assets/04.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";
function Navbar() {
  const { handleSubmit, register } = useForm();
  const enviarInicio = handleSubmit((data) => {
    console.log(data);
  });

  const navegate = useNavigate();

  return (
    <>
      <header className="header">
        <h2>Pasteleria Israel</h2>

        <div className="logoPI">
          <img
            src={logo}
            className="logoLogin"
            onClick={() => navegate("/Inicio")}
          />
        </div>
      </header>

      <nav className="navbarUMG">
        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Reportes")}
        >
          <div className="Reportes">
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Reportes</span>
          </div>
        </button>

        <button type="button" className="navB">
          <div className="Pedidos">
            <span className="material-symbols-outlined">smartphone</span>
            <span>Pedidos</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Usuario")}
        >
          <div className="Administrar">
            <span className="material-symbols-outlined">apartment</span>
            <span>Administrar</span>
          </div>
        </button>

        <button type="button" className="navB">
          <div className="Inventario">
            <span className="material-symbols-outlined">package_2</span>
            <span>Inventario</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Compras")}
        >
          <div className="Inventario">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Compras</span>
          </div>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
