import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebarInventario.css";

//import styled from 'styled-components';
//import Modal from './componentes/modal';

function SidebarInventario() {
  const navegate = useNavigate();
  return (
    <>
      <div className="ContenedorSBInv">
        <nav className="sidebar">
          <button
            className="BTpasteles"
            onClick={() => navegate("/Admin/Pasteles")}
          >
            <div>
              <h3>Pasteles</h3>
            </div>
          </button>

          <button
            className="BTproductos"
            onClick={() => navegate("/Admin/Cliente")}
          >
            <div>
              <h3>Eliminar</h3>
              {/* <a href="#">Proveeedores</a> */}
            </div>
          </button>

          <button
            className="BTdevoluciones"
            onClick={() => navegate("/Admin/Proveedor")}
          >
            <div>
              <h3>Productos</h3>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}

export default SidebarInventario;
