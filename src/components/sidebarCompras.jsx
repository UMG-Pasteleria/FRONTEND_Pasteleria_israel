import "../styles/sidebarCompras.css";
import React from "react";
import { useNavigate } from "react-router-dom";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";

function SidebarCompras() {
  const navegate = useNavigate();
  return (
    <>
      <div className="ContenedorSBC">
        <nav className="sidebar">
          <button className="BTcompras" onClick={() => navegate("/Compras")}>
            <div>
              <h3>Compras</h3>
            </div>
          </button>

          <button
            className="BTproveedores"
            onClick={() => navegate("/Proveedor")}
          >
            <div>
              <h3>Proveedores</h3>
              {/* <a href="#">Proveeedores</a> */}
            </div>
          </button>

          <button
            className="BTdevoluciones"
            onClick={() => navegate("/Proveedor")}
          >
            <div>
              <h3>Devoluciones</h3>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}

export default SidebarCompras;
