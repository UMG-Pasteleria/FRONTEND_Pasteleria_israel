import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";

const ModalupPedido = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setPedidos,
  pedidos,
}) => {
  const [pedido, setPedido] = useState([]);

  const getDataUp = async (idpedido) => {
    try {
      const response = await fetch(
        `http://localhost:3000/pedidos/${idpedido}`,
        { headers: { "content-Type": "application/json" } }
      );
      const pedido = await response.json();
      setPedido(pedido);
      setPedidooUP({
        idpedido: pedido.idpedido,
        producto_pro: pedido.producto_pro,
        id_client: pedido.id_client,
        fecha_pedido: pedido.fecha_pedido,
        estado_pd: pedido.estado_pd,
      });
      console.log(pedido);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(pedido);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [pedidoUP, setPedidooUP] = useState({
    idpedido: "",
    producto_pro: "",
    id_client: "",
    telefono_pd: "",
    estado_pd: "",
  });

  const onChangeData = (e) => {
    setPedidooUP({ ...pedidoUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(
        `http://localhost:3000/pedidos/${pedidoUP.idpedido}`,
        {
          method: "PUT",
          body: JSON.stringify(pedidoUP),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      setPedidos(
        pedidos.map((pedido) =>
          pedido.idpedido === pedidoUP.idpedido ? pedidoUP : pedido
        )
      );
      cambiarEstado2(false);

      if (response.status === 200) {
        swal.fire({
          title: "Proveedor Actualizado!",
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
          customClass: {
            confirmButton: "btEliminar",
            cancelButton: "btCancelar",
            popup: "popus-eliminado",
            title: "titulo-pop",
            container: "contenedor-alert",
          },
        });
      } else {
        swal.fire({
          title: "Error al Actualizar!",
          icon: "error",
          showConfirmButton: false,
          timer: 1200,
          customClass: {
            confirmButton: "btEliminar",
            cancelButton: "btCancelar",
            popup: "popus-eliminado",
            title: "titulo-pop",
            container: "contenedor-alert",
          },
        });
      }

      //Si el servidor devuelve codigo 204 de confirmación
      //lanza alerta de guardado correctamente
      //   if (response.status === 204) {
      //     saveSweetalert();
      //   }
    } catch (error) {
      console.log(error.massage);
    }
  };

  //----------------------------------

  // ------------------------ FIN ACTUALIZAR PEDIDO ---------------------------------

  return (
    <>
      {estado2 && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>{titulo2}</h3>
            </EncabezadoModal>
            <BotonCerrar onClick={() => cambiarEstado2(false)}>
              <span className="material-symbols-outlined">close</span>
            </BotonCerrar>
            <div className="ContenedorEditarUsuario">
              <form className="nuevoUserForm">
                <div className="itemUser">
                  <label>No. </label>
                  <input
                    // {...register("iduser")}
                    type="text"
                    id="idUser"
                    placeholder="ID"
                    value={pedidoUP.idpedido}
                    name="idpedido"
                    onChange={(e) => onChangeData(e)}
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Producto: </label>
                  <input
                    // {...register("nombre")}
                    value={pedidoUP.producto_pro}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="producto_pro"
                    placeholder="Producto"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Cliente: </label>
                  <input
                    // {...register("apellido")}
                    value={pedidoUP.id_client}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="id_client"
                    placeholder="Cliente"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    // {...register("telefono")}
                    value={pedidoUP.telefono_pd}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="telefonoUser"
                    name="telefono_pd"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Estado: </label>
                  <input
                    // {...register("email")}
                    value={pedidoUP.estado_pd}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="estado_pd"
                    placeholder="Estado"
                  ></input>
                </div>

                {/* <div className="itemUser">
                  <label>direccion: </label>
                  <input
                    // {...register("contrasenia")}
                    value={proveedorUP.direccion_pr}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="passwordUser"
                    name="direccion_pr"
                    placeholder="Contraseña"
                  ></input>
                </div> */}

                <br />

                <div className="bonotesNewUser">
                  <div>
                    <button
                      type="button"
                      onClick={() => cambiarEstado2(false)}
                      className="btcancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btGuardar"
                      onSubmit={handleSubmit}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {children}
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalupPedido;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 98;
`;

const ContenedorModal = styled.div`
  width: 400px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  z-index: 99;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;
const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #e8e8e8;

  &:hover {
    background: #ff8a00;
    transition: 0.3s;
  }

  span {
    width: 100%;
    height: 100%;
  }
`;
