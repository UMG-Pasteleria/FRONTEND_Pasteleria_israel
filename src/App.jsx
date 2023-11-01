import { useState } from "react";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Proveedor from "./pages/Proveedor";
import Usuario from "./pages/Usuario";
import ModalP from "../src/components/modals/modalProveedor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reportes from "./pages/Reportes";
import Compras from "./pages/Compras";
import Web from "./pages/webInicio";
import ProductosWEB from "./pages/ProductosWEB";
import PastelCumpleWEB from "./pages/Pasteles/PastelCumple";
import Cliente from "./pages/Cliente";
import Pedido from "./pages/Pedido";
import ModalProd from "../src/components/modals/modalProducto";
import Producto from "./pages/Producto";
//import MateriaP from "./pages/MateriaPri";

function App() {
  //const [count, setCount] = useState(0)

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
          <Route path="/Admin/Compras" element={<Compras />} />
          <Route path="/Admin/Cliente" element={<Cliente />} />
          <Route path="/Admin/Pedido" element={<Pedido />} />
          <Route path="/Admin/Producto" element={<Producto />} />
          <Route path="/Admin/Usuario/:iduser/editar" element={<Usuario />} />
          <Route path="/Admin/Proveedor/:idprov/editar" element={<ModalP />} />
          {/* <Route path="/Admin/MateriaPri/:id_mateprima/editar" element={<ModalProd />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
