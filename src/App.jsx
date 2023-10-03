import { useState } from "react";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";

import Usuario from "./pages/Usuario";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Usuario" element={<Usuario />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
