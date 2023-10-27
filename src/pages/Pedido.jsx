import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import swal from "sweetalert2";
import ModalupPedido from "../components/modals/ModalUpdatePedido";
import ModalPed from "../components/modals/modalPedido";
import Navbar from "../components/navbar";
//import SidebarCompras from "../components/sidebarCompras";
import SidebarPedidos from "../components/sidebarPedido";
import PDFGenerator from "../generarPDF/g.Pedido";
import "../styles/pedido.css";

function Pedido() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  const [pedidos, setPedidos] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/pedidos";

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setPedidos(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO PEDIDO------//
  const { handleSubmit, register } = useForm();
  const enviarPedido = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Pedido Agregado!",
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
    (document.getElementById("correo_pr").value = null),
      (document.getElementById("nit_pr").value = null),
      (document.getElementById("nombre_pr").value = null),
      (document.getElementById("telefono_pr").value = null),
      (document.getElementById("direccion_pr").value = null);
  });

  //-----------------ELIMINAR PEDIDO---------------------------------

  const handleDelete = async (idpedido) => {
    const res = await fetch(`http://localhost:3000/pedidos/${idpedido}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setPedidos(pedidos.filter((pedido) => pedido.idpedido !== idpedido));
  };

  //------------------------------------FIN ELIMINA PEDIDO -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idpedido) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del Pedido",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#FF8A00",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#5E5E5E",
        buttonsStyling: false,
        showCloseButton: true,

        customClass: {
          confirmButton: "btEliminar",
          cancelButton: "btCancelar",
          popup: "popus-class",
          title: "titulo-pop",
          text: "text-pop",
          icon: "icon-pop",
          container: "contenedor-alert",
        },
      })
      .then((response) => {
        if (response.isConfirmed) {
          handleDelete(idpedido);

          swal.fire({
            title: "¡Eliminado!",
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
        }
      });
  };
  //----------------------------FIN DE ALERTAS --------------------------------

  //--------------------------------- EDITAR PEDIDO ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR PEDIDO ----------------------------------//

  return (
    <>
      <Navbar />
      <SidebarPedidos />
      <div className="bodyPedid">
        <div className="ContainerPed"></div>
        <div className="Pedidoss">
          <br></br>
          <h2>Listado de Pedidos</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PEDIDO-------------- */}
          <ModalPed
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo pedido"
          >
            <div className="containerNewPedid">
              <form
                className="nuevoPedidForm"
                id="FormularioPedid"
                onSubmit={enviarPedido}
              >
                <div className="itemPedid">
                  <label>No. </label>
                  <input
                    {...register("nit_pd")}
                    type="number"
                    id="nit_pr"
                    placeholder="No."
                  ></input>
                </div>

                <div className="itemPedid">
                  <label>Productos: </label>
                  <input
                    {...register("productos_pd")}
                    type="text"
                    id="productos_pd"
                    placeholder="Productos"
                  ></input>
                </div>

                <div className="itemPedid">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_pd")}
                    type="number"
                    id="telefono_pd"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemPedid">
                  <label>Estado: </label>
                  <input
                    {...register("estado_pd")}
                    type="text"
                    id="estado_pd"
                    placeholder="Estado"
                  ></input>

                  {/* <div className="itemProv">
                    <label>Direccion: </label>
                    <input
                      {...register("direccion_pr")}
                      type="text"
                      id="direccion_pr"
                      placeholder="direccion"
                    ></input>
                  </div> */}
                </div>
                <br />

                <div className="bonotesNewPedid">
                  <div>
                    <button
                      type="button"
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
                      className="btcancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div>
                    <button type="submit" className="btGuardar">
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalPed>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PEDIDO ------------------ */}

          {/* ------------------- MODAL EDITAR  PEDIDO-------------- */}

          <ModalupPedido
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar pedido"}
            idEdit={idEdit}
            setPedidos={setPedidos}
            pedidos={pedidos}
          ></ModalupPedido>
          {/* --------------------------- FIN MODAL EDITAR PEDIDO ------------------ */}

          {/* //----------------------------------ELIMINAR PEDIDO ----------------------------------*/}

          <div className="centrarControles">
            <div className="controlesUsuario">
              <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                <span className="material-symbols-outlined">person_add</span>
              </button>

              <div className="busqueda">
                <form
                  action="http://localhost:3000/pedidos"
                  method="get"
                  className="cuadroBusqueda"
                >
                  <input
                    type="text"
                    placeholder="Buscar pedido"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={pedidos} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>

          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="pedidoMovil">
            {pedidos.map((pedido, index) => (
              <div className="ContenedorPedidos" key={index}>
                <div className="imgPerfil">
                  <div className="pedidoID">
                    <p>No.</p>
                    <span>{pedido.idpedido}</span>
                  </div>
                </div>

                <div
                  className="datoPedido"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(pedido.idpedido)
                  }
                >
                  <div>
                    <h3>{pedido.producto_pro}</h3>
                  </div>
                  <div>
                    <h5>Cliente: {pedido.id_client}</h5>
                  </div>
                  <div>
                    <p>Total: {pedido.total}</p>
                  </div>
                </div>
                <div className="controlBtPd">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    // onClick={() => mostrarAlerta(usuario.iduser)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="pedidoEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>No. </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Producto: </h3>
                </div>
                <div className="encD">
                  <h3>Cliente: </h3>
                </div>
                <div className="encD">
                  <h3>cantidad: </h3>
                </div>
                <div className="encD">
                  <h3>Fecha: </h3>
                </div>
                {/* <div className="encD">
                  <h3>Direccion: </h3>
                </div> */}
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {pedidos.map((pedido, index) => (
              <div className="ContenedorPedidos" key={index}>
                <div className="imgPerfil">
                  <div className="pedidosID">
                    <span>{pedido.idpedido}</span>
                  </div>
                </div>

                <form
                  className="datoPedido"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{pedido.producto_pro}</h3>
                  </div>
                  <div>
                    <h5>{pedido.id_client}</h5>
                  </div>
                  <div>
                    <p>{pedido.cantidad_pro}</p>
                  </div>
                  <div>
                    <p>{pedido.fecha_pedido}</p>
                  </div>
                  {/* <div>
                    <p>{proveedor.direccion_pr}</p>
                  </div> */}
                </form>
                <div className="controlBtPd">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(pedido.idpedido)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(pedido.idpedido)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pedido;
