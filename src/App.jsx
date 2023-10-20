import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalP from "../src/components/modals/modalProveedor";
import Cliente from "./pages/Cliente";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Pedido from "./pages/Pedido";
import Proveedor from "./pages/Proveedor";
import Reportes from "./pages/Reportes";
import Usuario from "./pages/Usuario";

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
          <Route path="/Cliente" element={<Cliente />} />
          <Route path="/Pedido" element={<Pedido />} />
          <Route path="/Reportes" element={<Reportes />} />
          <Route path="/Usuario/:iduser/editar" element={<Usuario />} />
          <Route path="/Proveedor/:idprov/editar" element={<ModalP />} />
          <Route path="/Cliente/:idclient/editar" element={<ModalP />} />
          <Route path="/Pedido/:idpedido/editar" element={<ModalP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
