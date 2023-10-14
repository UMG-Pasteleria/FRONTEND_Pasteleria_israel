import React from "react";
import "../../styles/clientes.css";
const newCliente = () => {
  return (
    <>
      <div>
        <form>
          <label>Nombre</label>
          <input type="text" id="nombreUser" placeholder="Nombre"></input>
        </form>
      </div>
    </>
  );
};

export default newCliente;