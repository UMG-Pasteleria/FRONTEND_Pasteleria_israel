import "../styles/navbar.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function NavbarWEB() {
  const { handleSubmit, register } = useForm();
  const enviarInicio = handleSubmit((data) => {
    console.log(data);
  });

  const navegate = useNavigate();

  return (
    <>
      <nav className="navbarUMG">
        <button type="button" className="navB" onClick={() => navegate("/")}>
          <div className="Reportes">
            <span className="material-symbols-outlined">home</span>

            <span>Inicio</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/productos")}
        >
          <div className="Pedidos">
            <span className="material-symbols-outlined">storefront</span>
            <span>Productos</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Usuario")}
        >
          <div className="Administrar">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>Carrito</span>
          </div>
        </button>
      </nav>
    </>
  );
}

export default NavbarWEB;
