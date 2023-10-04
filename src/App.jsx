import { useState } from "react";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Proveedor from "./pages/Proveedor";
import Usuario from "./pages/Usuario";
import ProtectedRoute from "./protectedPage";

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Inicio",
        element: <Inicio />,
      },
    ],
  }
);

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/Proveedor" element={<Proveedor />} />
          <Route path="/Usuario/:iduser/editar" element={<Usuario />} />
          <Route
            path="/Proveedor/:idproveedor/editar"
            element={<Proveedor />}
          />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
