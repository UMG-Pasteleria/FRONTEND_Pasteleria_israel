import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ModalP from "../src/components/modals/modalProveedor";
import Cliente from "./pages/Cliente";
import Compras from "./pages/Compras";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Pastel from "./pages/Pasteles";
import PastelCumpleWEB from "./pages/Pasteles/PastelCumple";
import Pedido from "./pages/Pedido";
import Producto from "./pages/Producto";
import ProductosWEB from "./pages/ProductosWEB";
import Proveedor from "./pages/Proveedor";
import ReporteOficial from "./pages/ReporteOficial";
import Reportes from "./pages/Reportes";
import TipoCliente from "./pages/TipoCliente";
import TipoPastel from "./pages/TipoPastel";
import Usuario from "./pages/Usuario";
import Web from "./pages/webInicio";

function App() {
    //const [count, setCount] = useState(0)
    /* Lógica de autenticación de Usuario */
    const [isAuthenticated, setIsAuthenticated] = useState(true);//Cambiar false
    const setAuth = (booleand) => {
      setIsAuthenticated(booleand);
    };
  
    async function isAuth() {
      try {
        const response = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    useEffect(() => {
      isAuth();
    });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Web />} />
          <Route path="/pastelcumpleaños" element={<PastelCumpleWEB />} />
          <Route path="/productos" element={<ProductosWEB />} />
          <Route path="/Admin" element={<Login />} />
          <Route path="/Admin/Inicio" element={<Inicio />} />
          <Route path="/Admin/Usuario" element={<Usuario />} />
          <Route path="/Admin/Proveedor" element={<Proveedor />} />
          <Route path="/Admin/Reportes" element={<Reportes />} />
          <Route path="/Admin/ReporteOficial" element={<ReporteOficial />} />
          <Route path="/Admin/Compras" element={<Compras />} />
          <Route path="/Admin/Cliente" element={<Cliente />} />
          <Route path="/Admin/Pedido" element={<Pedido />} />
          <Route path="/Admin/Pasteles" element={<Pastel />} />
          <Route path="/Admin/Producto" element={<Producto />} />
          <Route path="/Admin/TipoCliente" element={<TipoCliente />} />
          <Route path="/Admin/TipoPastel" element={<TipoPastel />} />
          <Route path="/Admin/Usuario/:iduser/editar" element={<Usuario />} />
          <Route path="/Admin/Proveedor/:idprov/editar" element={<ModalP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
