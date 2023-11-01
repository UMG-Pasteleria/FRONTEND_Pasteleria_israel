import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import ModalupPedido from "../components/modals/ModalUpdatePedido";
import ModalPed from "../components/modals/modalPedido";
import Navbar from "../components/navbar";
import SidebarPedidos from "../components/sidebarPedido";
import PDFGenerator from "../generarPDF/g.Pedido";
import "../styles/pedido.css";

function Pedido() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");
  const [estados, setEstados] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pasteles, setPasteles] = useState([]);
  const [modopagos, setModopagos] = useState([]);

  const URL = "http://localhost:3000/";

  //--------------- OBTENER DATOS DE PEDIDOS -----------------//

  const getData = async () => {
    try {
      const response = await fetch(URL + "pedidos");
      const datos = await response.json();
      setPedidos(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };

  //--------------- OBTENER DATOS DE ESTADOS -----------------//

  const getEstado = async () => {
    try {
      const response = await fetch(URL + "estado");
      const estado = await response.json();
      setEstados(estado);
      console.log(estado);
    } catch (err) {
      console.error(err);
    }
  };

  //--------------- OBTENER DATOS DE CLIENTES -----------------//

  const getCliente = async () => {
    try {
      const response = await fetch(URL + "cliente");
      const clienteData = await response.json();
      setClientes(clienteData);
      console.log(clienteData);
    } catch (err) {
      console.error(err);
    }
  };

  //--------------- OBTENER DATOS DE PASTELES -----------------//

  const getPastel = async () => {
    try {
      const response = await fetch(URL + "pastel");
      const pastelData = await response.json();
      setPasteles(pastelData);
      console.log(pastelData);
    } catch (err) {
      console.error(err);
    }
  };
  const getModopago = async () => {
    try {
      const response = await fetch(URL + "modo_pago");
      const modopagoData = await response.json();
      setModopagos(modopagoData);
      console.log(modopagoData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
    getEstado();
    getCliente();
    getPastel();
    getModopago();
  }, []);
  // //------------------ENVIAR DATOS DE SELECTOR ESTADO -----------------//
  // const [selectEstado, setSelectEstado] = useState();
  // const handleSelectChange = (a) => {
  //   console.log(a.target.value);
  //   setSelectEstado(a.target.value);
  // };
  // //------------------ENVIAR DATOS DE SELECTOR CLIENTE -----------------//
  // const [selectCliente, setSelectCliente] = useState();
  // const handleSelectChangeCliente = (b) => {
  //   console.log(b.target.value);
  //   setSelectCliente(b.target.value);
  // };
  // //------------------ENVIAR DATOS DE SELECTOR PASTEL -----------------//
  // const [selectPastel, setSelectPastel] = useState();
  // const handleSelectChangePastel = (c) => {
  //   console.log(c.target.value);
  //   setSelectPastel(c.target.value);
  // };

  //-----CAPTURAR DATOS DE NUEVO PEDIDO------//
  const { handleSubmit, register } = useForm();
  const enviarPedido = handleSubmit((data) => {
    console.log(data);
    fetch(URL + "pedidos", {
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

    //   (document.getElementById("nit_pr").value = null),
    //   (document.getElementById("nombre_pr").value = null),
    //   (document.getElementById("telefono_pr").value = null),
    //   (document.getElementById("direccion_pr").value = null);
  });

  //-----------------ELIMINAR PEDIDO---------------------------------

  const handleDelete = async (idpedido) => {
    const res = await fetch(URL + `pedidos/${idpedido}`, {
      method: "DELETE",
    });

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

  //--------------------------------- EDITAR PEDIDO ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //----------------------BUSQUEDA INTELIGENTE-------------------------//
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = pedidos;
  } else {
    result = pedidos.filter((datos) =>
      datos.nombre_cl.toLowerCase().includes(search.toLowerCase())
    );
  }

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
                  <label>Cliente: </label>
                  <select
                    className="selector"
                    {...register("id_cliente")}
                    id="id_cliente"
                    placeholder="Seleccione cliente"
                    // onChange={handleSelectChangeCliente}
                  >
                    {/* <option value="" disabled selected>
                      Seleccione un cliente
                    </option> */}
                    {clientes.map((clienteData, index) => (
                      <option
                        className="opciones"
                        key={index}
                        defaultValue={clienteData.idcliente}
                      >
                        {clienteData.nombre_cl}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="itemPedid">
                  <label>Pastel: </label>
                  <select
                    className="selector"
                    {...register("id_pastel")}
                    id="id_pastel"
                    // onChange={handleSelectChangePastel}
                  >
                    <option defaultValue="" disabled selected>
                      Seleccione un pastel
                    </option>
                    {pasteles.map((pastelData, index) => (
                      <option
                        className="opciones"
                        key={index}
                        defaultValue={pastelData.idpastel}
                      >
                        {pastelData.pastel} {pastelData.tamanio} con{" "}
                        {pastelData.decoracion} {".          ."} Precio: Q.
                        {pastelData.precio}
                      </option>
                    ))}
                  </select>
                  <button>+</button>
                </div>

                <div className="itemPedid">
                  <label>Modo pago: </label>
                  <input
                    {...register("id_modopago")}
                    type="number"
                    id="id_modopago"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemPedid">
                  <label>Cantidad: </label>
                  <input
                    {...register("cantidad")}
                    type="number"
                    id="cantidad"
                    placeholder="Cantidad"
                  ></input>

                  <div className="itemPedid">
                    <label>Estado: </label>

                    <select
                      className="selector"
                      {...register("id_estado")}
                      id="id_estado"
                      defaultValue=""
                      // onChange={handleSelectChange}
                    >
                      {/* 
                      <option value="" disabled selected>
                        Seleccione un cliente
                      </option> */}
                      {estados.map((estado, index) => (
                        <option
                          className="opciones"
                          key={index}
                          defaultValue={estado.idestadop}
                        >
                          {estado.idestadop} - {estado.estado}
                        </option>
                      ))}
                    </select>
                  </div>
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
                <form method="get" className="cuadroBusqueda">
                  <input
                    type="text"
                    value={search}
                    onChange={searcher}
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
            {result.map((pedido, index) => (
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
                  <h3>Pedido No. </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Fecha: </h3>
                </div>
                <div className="encD">
                  <h3>Cliente: </h3>
                </div>
                <div className="encD">
                  <h3>Pastel: </h3>
                </div>
                <div className="encD">
                  <h3>Tamaño: </h3>
                </div>
                <div className="encD">
                  <h3>Decoracion: </h3>
                </div>
                <div className="encD">
                  <h3>Cantidad: </h3>
                </div>
                <div className="encD">
                  <h3>Total: </h3>
                </div>
                <div className="encD">
                  <h3>Estado: </h3>
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

            {result.map((pedidos, index) => (
              <div className="ContenedorPedidos" key={index}>
                <div className="imgPerfil">
                  <div className="pedidosID">
                    <span>P#{pedidos.idpedido}</span>
                  </div>
                </div>

                <form
                  className="datoPedido"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>
                      {new Date(pedidos.fecha_pedido).toLocaleDateString(
                        "es-ES",
                        {
                          timeZone: "UTC",
                        }
                      )}
                    </h3>
                  </div>
                  <div>
                    <h5>{pedidos.nombre_cl}</h5>
                  </div>
                  <div>
                    <p>{pedidos.pastel}</p>
                  </div>
                  <div>
                    <p>{pedidos.tamanio}</p>
                  </div>
                  <div>
                    <p>{pedidos.decoracion}</p>
                  </div>
                  <div>
                    <p>{pedidos.cantidad}</p>
                  </div>
                  <div>
                    <p>{pedidos.total}</p>
                  </div>
                  <div>
                    <p>{pedidos.estado}</p>
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
                      setIdEdit(pedidos.idpedido)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>

                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(pedidos.idpedido)}
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
