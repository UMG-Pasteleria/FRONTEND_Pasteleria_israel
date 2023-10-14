import { useState } from "react";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Proveedor from "./pages/Proveedor";
import Usuario from "./pages/Usuario";
import ModalP from "../src/components/modals/modalProveedor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reportes from "./pages/Reportes";
import Compras from "./pages/Compras";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/Proveedor" element={<Proveedor />} />
          <Route path="/Reportes" element={<Reportes />} />
          <Route path="/Compras" element={<Compras />} />
          <Route path="/Usuario/:iduser/editar" element={<Usuario />} />
          <Route path="/Proveedor/:idprov/editar" element={<ModalP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
