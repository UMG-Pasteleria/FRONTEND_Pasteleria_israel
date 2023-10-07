import "../styles/sidebarCompras.css";
import logo from "../assets/04.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";

function SidebarCompras() {
  return (
    <>
      <nav className="sidebar">
        <button className="BTcompras" onClick={() => navegate("/Usuarios")}>
          <div>
            <h3>Compras</h3>
          </div>
        </button>

        <button
          className="BTproveedores"
          onClick={() => navegate("/Proveedores")}
        >
          <div>
            <h3>Proveedores</h3>
          </div>
        </button>

        <button
          className="BTdevoluciones"
          onClick={() => navegate("/Proveedores")}
        >
          <div>
            <h3>Devoluciones</h3>
          </div>
        </button>
      </nav>
    </>
  );
}

export default SidebarCompras;
