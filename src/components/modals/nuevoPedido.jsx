import React from "react";
import "../../styles/pedido.css";
const newPedido = () => {
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

export default newPedido;
