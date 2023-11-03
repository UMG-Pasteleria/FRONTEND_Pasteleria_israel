import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import ModalupPedido from "../components/modals/ModalUpdatePedido";
import ModalPed from "../components/modals/modalPedido";
import Navbar from "../components/navbar";
import SidebarPedidos from "../components/sidebarPedido";
import PDFGenerator from "../generarPDF/g.Pedido";
import moment from "moment";
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

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/";

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

  //-------------------- OBTENER DATOS DE MODO PAGO -----------------//
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

  // //---------------CALCULAR TOTAL-----------------//
  // function Total() {
  //   let precio = parseFloat((pasteles.precio = pasteles.idpastel)).value;
  //   let cantidad = parseInt(document.getElementById("cantidad"));
  //   let total = precio * cantidad;

  //   console.log(total);
  //   document.getElementById("total").htmlFor = total;
  // }
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
                <div className="contenedorInputs">
                  <div className="contDataModal">
                    {/* //----------CLIENTE----------------/ */}
                    <div className="itemPedid">
                      <label>Cliente: </label>
                      <div className="agregarNew">
                        <select
                          className="selector"
                          {...register("id_cliente")}
                          id="id_cliente"
                        >
                          <option disabled selected>
                            Seleccione un cliente
                          </option>
                          {clientes.map((clienteData, index) => (
                            <option
                              className="opciones"
                              key={index}
                              Value={clienteData.idcliente}
                            >
                              {clienteData.nombre_cl}
                            </option>
                          ))}
                        </select>
                        <button className="botonAgregar" type="button">
                          +
                        </button>
                      </div>
                    </div>
                    {/* //------------------MODO DE PAGO----------------/ */}
                    <div className="itemPedid">
                      <label>Modo pago: </label>
                      <select
                        className="selector"
                        {...register("id_modopago")}
                        id="id_modopago"
                      >
                        <option disabled selected>
                          Seleccione modo de pago
                        </option>
                        {modopagos.map((modopagoData, index) => (
                          <option
                            className="opciones"
                            key={index}
                            Value={modopagoData.idmodp}
                          >
                            {modopagoData.modo}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* //--------------------ANTICIPO----------------/*/}
                    <div className="itemPedid">
                      <label>Anticipo: </label>
                      <input
                        {...register("anticipo")}
                        type="number"
                        id="anticipo"
                        placeholder="Anticipo"
                      ></input>
                    </div>

                    {/* //--------------------FECHA DE ENTREGA----------------/*/}
                    <div className="itemPedid">
                      <label>Fecha de entrega: </label>
                      <input
                        {...register("fecha_entrega")}
                        type="dateTime-local"
                        id="fecha_entrega"
                        placeholder="Anticipo"
                      ></input>
                    </div>
                  </div>

                  <div className="contDataModal">
                    {/* //--------------------PASTEL----------------/*/}
                    <div className="itemPedid">
                      <label>Pastel: </label>
                      <div className="agregarNew">
                        <select
                          className="selector"
                          {...register("id_pastel")}
                          id="id_pastel"
                        >
                          <option disabled selected>
                            Seleccione un pastel
                          </option>
                          {pasteles.map((pastelData, index) => (
                            <option
                              className="opciones"
                              key={index}
                              Value={pastelData.idpastel}
                            >
                              {pastelData.pastel} {pastelData.tamanio} con{" "}
                              {pastelData.decoracion} {".          ."} Precio:
                              Q.
                              {pastelData.precio}
                            </option>
                          ))}
                        </select>
                        <button className="botonAgregar" type="button">
                          +
                        </button>
                      </div>
                    </div>

                    {/* //--------------------CANTIDAD----------------/ */}
                    <div className="itemPedid">
                      <label>Cantidad: </label>
                      <input
                        {...register("cantidad")}
                        type="number"
                        id="cantidad"
                        placeholder="Cantidad"
                      ></input>
                    </div>

                    {/* //--------------------DEDICATORIA----------------/ */}
                    <div className="itemPedid">
                      <label>Decicatoria: </label>
                      <input
                        {...register("dedicatoria")}
                        type="textarea"
                        id="dedicatoria"
                        placeholder="Dedicatoria"
                      ></input>
                    </div>

                    {/* //--------------------ESTADO---------------- */}
                    <div className="itemPedid">
                      <label>Estado: </label>

                      <select
                        className="selector"
                        {...register("id_estado")}
                        id="id_estado"
                      >
                        <option disabled selected>
                          Seleccione estado de pedido
                        </option>
                        {estados.map((estado, index) => (
                          <option
                            className="opciones"
                            key={index}
                            Value={estado.idestadop}
                          >
                            {estado.idestadop} - {estado.estado}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <div className="total">
                  <label htmlFor="total" id="total">
                    .
                  </label>
                  <button
                    type="button"
                    className="totalButton"
                    // onClick={function Total() {
                    //   let precio = parseFloat(
                    //     (pasteles.precio = pasteles.idpastel)
                    //   ).value;
                    //   let cantidad = parseInt(
                    //     document.getElementById("cantidad")
                    //   );
                    //   let total = precio * cantidad;

                    //   console.log(total);
                    //   document.getElementById("total").oninput = total;
                    // }}
                  >
                    Calcular
                  </button>
                </div>
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

          {/* ------------------- MODAL EDITAR  PEDIDO-------------- */}

          <ModalupPedido
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar pedido"}
            idEdit={idEdit}
            setPedidos={setPedidos}
            pedidos={pedidos}
          ></ModalupPedido>

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
            {result.map((pedidos, index) => (
              <div className="ContenedorPedidos" key={index}>
                <div className="imgPerfil">
                  <div className="pedidoID">
                    <h3>P-{pedidos.idpedido}</h3>
                    <h6>
                      {new Date(pedidos.fecha_pedido).toLocaleDateString(
                        "es-ES",
                        {
                          timeZone: "UTC",
                        }
                      )}
                    </h6>
                  </div>
                </div>

                <div
                  className="datoPedido"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(pedidos.idpedido)
                  }
                >
                  <div className="datoclientes">
                    <h5>{pedidos.nombre_cl}</h5>
                    <h4>
                      {pedidos.pastel} {pedidos.tamanio}
                    </h4>
                    <h4>{pedidos.estado}</h4>
                  </div>

                  <div className="datopastel">
                    <h6>Telefono: {pedidos.telefono_cl}</h6>
                    <h6>Direccion: {pedidos.direccion_cl}</h6>
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
          {/* //--------------------------- VERSION ESCRITORIO Y TABLET ---------------------------- */}
          <div className="pedidoEscritorioP">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>Pedido No. </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encCliente">
                  <h3>Cliente: </h3>
                </div>
                <div className="encPastel">
                  <h3>Pastel: </h3>
                </div>

                <div className="encDedicatoria">
                  <h3>Dedicatoria: </h3>
                </div>
                <div className="encDetalle">
                  <h3>Detalle: </h3>
                </div>

                <div className="encEntrega">
                  <h3>Fecha entrega: </h3>
                </div>

                <div className="encEstado">
                  <h3>Estado: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {result.map((pedidos, index) => (
              <div className="ContenedorPedidosP" key={index}>
                <div className="PEDIDO">
                  <div className="pedidosPID">
                    <h3>P-{pedidos.idpedido}</h3>
                    <div>
                      <h6>
                        {new Date(pedidos.fecha_pedido).toLocaleDateString(
                          "es-ES",
                          {
                            timeZone: "UTC",
                          }
                        )}
                      </h6>
                    </div>
                  </div>
                </div>

                <form className="datoPedido">
                  <div className="clienteinfo">
                    <h4>{pedidos.nombre_cl}</h4>
                    <p>Telefono: {pedidos.telefono_cl}</p>
                    <p>Direccion: {pedidos.direccion_cl}</p>
                  </div>
                  <div className="pastelinfo">
                    <h3>{pedidos.pastel}</h3>
                    <p>{pedidos.tamanio}</p>
                    <p>{pedidos.decoracion}</p>
                  </div>
                  <div className="dedicatoriaP">
                    <h3>{pedidos.dedicatoria}</h3>
                  </div>

                  <div className="pagoP">
                    <p>Cantidad: {pedidos.cantidad}</p>
                    <p>Total: Q. {pedidos.total}</p>
                    <p>Anticipo: Q. {pedidos.anticipo}</p>
                  </div>

                  <div className="entregaP">
                    <h3>
                      {moment(pedidos.fecha_entrega).format(
                        "DD/MM/YYYY h:mm A"
                      )}
                    </h3>
                  </div>

                  <div className="estadoP">
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
