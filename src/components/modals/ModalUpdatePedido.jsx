import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";
import PDFGenerator from "../../generarPDF/g.Pedido";
import "../../styles/pedido.css";
const ModalupPedido = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setPedidos,
  pedidos,
  URL,
}) => {
  const [pedido, setPedido] = useState([]);

  const getDataUp = async (idpedido) => {
    try {
      const response = await fetch(URL + `pedidos/${idpedido}`, {
        headers: { "content-Type": "application/json" },
      });
      const pedido = await response.json();
      setPedido(pedido);
      setPedidooUP({
        idpedido: pedido.idpedido,
        pastel: pedido.pastel,
        decoracion: pedido.decoracion,
        dedicatoria: pedido.dedicatoria,
        cantidad: pedido.cantidad,
        fecha_pedido: pedido.fecha_pedido,
        estado: pedido.estado,
        direccion_cl: pedido.direccion_cl,
        fecha_entrega: pedido.fecha_entrega,
        nombre_cl: pedido.nombre_cl,
        tamanio: pedido.tamanio,
        telefono_cl: pedido.telefono_cl,
        total: pedido.total,
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
    pastel: "",
    decoracion: "",
    dedicatoria: "",
    cantidad: "",
    fecha_pedido: "",
    estado: "",
    direccion_cl: "",
    fecha_entrega: "",
    nombre_cl: "",
    tamanio: "",
    telefono_cl: "",
    total: "",
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
      const response = await fetch(`URL + pedidos/${pedidoUP.idpedido}`, {
        method: "PUT",
        body: JSON.stringify(pedidoUP),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
              <h3>
                <b>
                  {" "}
                  {titulo2} {pedidoUP.idpedido}
                </b>{" "}
                | {pedidoUP.nombre_cl}
              </h3>
              <br />
              <PDFGenerator data={pedidoUP} />
            </EncabezadoModal>
            <BotonCerrar onClick={() => cambiarEstado2(false)}>
              <span className="material-symbols-outlined">close</span>
            </BotonCerrar>
            <div className="ContenedorEditarUsuario">
              <form className="nuevoUserForm">
                <div className="itemUser">
                  <label>Fecha de pedido:</label>
                  <input
                    // {...register("iduser")}
                    type="text"
                    id="idUser"
                    placeholder="ID"
                    value={moment(pedidoUP.fecha_pedido).format(
                      "DD/MM/YYYY  | h:mm A"
                    )}
                    name="fecha_pedido"
                    onChange={(e) => onChangeData(e)}
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Fecha de entrega:</label>
                  <input
                    // {...register("nombre")}
                    value={moment(pedidoUP.fecha_entrega).format(
                      "DD/MM/YYYY  | h:mm A"
                    )}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="fecha_entrega"
                    placeholder="Pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Direccion: </label>
                  <input
                    // {...register("apellido")}
                    value={pedidoUP.direccion_cl}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="pastel"
                    placeholder="Pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Direccion: </label>
                  <input
                    // {...register("apellido")}
                    value={pedidoUP.telefono_cl}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="telefono_cl"
                    placeholder="Pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Pastel: </label>
                  <input
                    // {...register("apellido")}
                    value={"Pastel de " + pedidoUP.pastel}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="pastel"
                    placeholder="Pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Tamaño: </label>
                  <input
                    // {...register("email")}
                    value={pedidoUP.tamanio}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="tamanio"
                    placeholder="Tamaño del pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Decoración: </label>
                  <input
                    // {...register("email")}
                    value={pedidoUP.decoracion}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="decoracion"
                    placeholder="Estado"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Dedicatoria: </label>
                  <input
                    // {...register("email")}
                    value={pedidoUP.dedicatoria}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="dedicatoria"
                    placeholder="Dedicatoria"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Cantidad: </label>
                  <input
                    // {...register("email")}
                    value={pedidoUP.cantidad}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="cantidad"
                    placeholder="Cantidad"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Estado: </label>
                  <input
                    // {...register("email")}
                    value={pedidoUP.estado}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="estado"
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
