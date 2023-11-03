import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebarPedidos.css";

//import styled from 'styled-components';
//import Modal from './componentes/modal';

function SidebarPedidos() {
  const navegate = useNavigate();
  return (
    <>
      <div className="ContenedorSBPd">
        <nav className="sidebar">
          <button
            className="BTpedidos"
            onClick={() => navegate("/Admin/Pedido")}
          >
            <div>
              <h3>Pedidos</h3>
            </div>
          </button>

          <button
            className="BTclientes"
            onClick={() => navegate("/Admin/Cliente")}
          >
            <div>
              <h3>Clientes</h3>
              {/* <a href="#">Proveeedores</a> */}
            </div>
          </button>

          <button
            className="BTdevoluciones"
            onClick={() => navegate("/Admin/TipoCliente")}
          >
            <div>
              <h3>Tipo de cliente</h3>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}

export default SidebarPedidos;
