import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import ModalupPedido from "../components/modals/ModalUpdatePedido";
import ModalCli from "../components/modals/modalCliente";
import ModalPed from "../components/modals/modalPedido";
import Navbar from "../components/navbar";
import SidebarPedidos from "../components/sidebarPedido";
import PDFGenerator from "../generarPDF/g.Pedido";
import "../styles/pedido.css";

function Pedido() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [estadoModal4, cambiarEstadoModal4] = useState(false);
  const [search, setSaerch] = useState("");
  const [estados, setEstados] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pasteles, setPasteles] = useState([]);
  const [modopagos, setModopagos] = useState([]);

  const URL = import.meta.env.VITE_URL;

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

  //-----CAPTURAR DATOS DE NUEVO PEDIDO------//
  const { handleSubmit, register } = useForm();
  const enviarPedido = handleSubmit(async (data) => {
    console.log(data);
    await fetch(URL + "pedidos", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });

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
    getData();
    cambiarEstadoModal1(!estadoModal1);

    // if (response.status === 200) {
    //   // swal.fire({
    //   //   title: "Pedido Agregado!",
    //   //   icon: "success",
    //   //   showConfirmButton: false,
    //   //   timer: 1200,
    //   //   customClass: {
    //   //     confirmButton: "btEliminar",
    //   //     cancelButton: "btCancelar",
    //   //     popup: "popus-eliminado",
    //   //     title: "titulo-pop",
    //   //     container: "contenedor-alert",
    //   //   },
    //   // });

    //   // Optionally update your clients state or perform other actions
    //   setClientes([...clientes, data]);
    // } else {
    //   swal.fire({
    //     title: "Error al Agregar",
    //     icon: "error",
    //     text: `${response.status}`,
    //     showConfirmButton: false,
    //     timer: 1500,
    //     customClass: {
    //       confirmButton: "btEliminar",
    //       cancelButton: "btCancelar",
    //       popup: "popus-eliminado",
    //       title: "titulo-pop",
    //       container: "contenedor-alert",
    //     },
    //   });
    // }

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

  //-----------------busqueda por fecha------------------//
  // state = {
  //   fecahPedido: new Date("2023", "09", "01"),
  // };

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

  /*----Proteger Rutas---Solo se puede accesar SI ESTA LOGEADO */
  const navegate = useNavigate();

  useEffect(() => {
    // Comprobar si el token existe en el localStorage
    const token = localStorage.getItem("token");

    // Si no hay token, redirigir al inicio
    if (!token) {
      navegate("/Admin"); // Reemplaza '/inicio' con la ruta a la que quieres redirigir
    }
  }, []);

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
          <ModalCli
            estado={estadoModal3}
            cambiarEstado={cambiarEstadoModal3}
            titulo="Nuevo cliente"
            setClientes={setClientes}
            clientes={clientes}
            URL={URL}
          ></ModalCli>
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
                        {/* <button
                          className="botonAgregar"
                          type="button"
                          onClick={() => cambiarEstadoModal3(!estadoModal3)}
                        >
                          +
                        </button> */}
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
                        placeholder="Fecha de entrega"
                      ></input>
                    </div>

                    {/* //-----------PASTEL----------------------- */}
                  </div>
                  <div className="contDataModal">
                    <div className="itemPedid">
                      <label>Pastel: </label>
                      <div className="agregarNew">
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
                              Value={pastelData.idpastel}
                            >
                              {pastelData.pastel} {pastelData.tamanio} con{" "}
                              {pastelData.decoracion} {".          ."} Precio:
                              Q.
                              {pastelData.precio}
                            </option>
                          ))}
                        </select>
                        {/* <button className="botonAgregar" type="button">
                          +
                        </button> */}
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
                {/* <div className="total">
                  <label htmlFor="total" id="total">
                    .
                  </label>
                  <button
                    type="button"
                    className="totalButton"
                    onClick={function Total() {
                      let precio = parseFloat(
                        (pasteles.precio = pasteles.idpastel)
                      ).value;
                      let cantidad = parseInt(
                        document.getElementById("cantidad")
                      );
                      let total = precio * cantidad;

                      console.log(total);
                      document.getElementById("total").oninput = total;
                    }}
                  >
                    Calcular
                  </button>
                </div> */}
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
            titulo2={"P-"}
            idEdit={idEdit}
            setPedidos={setPedidos}
            pedidos={pedidos}
            URL={URL}
          ></ModalupPedido>
          {/* //----------------------------------ELIMINAR PEDIDO ----------------------------------*/}
          <div className="centrarControles">
            <div className="controlesUsuario">
              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
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

              <PDFGenerator data={result} />
              <br />
              {/* <DatePicker
                selected={this.state.fecahPedido}
                onChange={this.onChange}
              /> */}
              {/* <button>
                <span className="material-symbols-outlined">refresh</span>
              </button> */}
            </div>
          </div>
          <hr></hr>
          <br></br>
          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="pedidoMovil">
            {result.map((pedidos, index) => (
              <div className="ContenedorPedidos" key={index}>
                <div
                  className="imgPerfil"
                  onClick={() =>
                    cambiarEstadoModal4(!estadoModal4) &
                    setIdEdit(pedidos.idpedido)
                  }
                >
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

          <ModalPed
            estado={estadoModal4}
            cambiarEstado={cambiarEstadoModal4}
            titulo={"Actualizar pedido"}
            idEdit={idEdit}
            setPedidos={setPedidos}
            pedidos={pedidos}
          >
            <label htmlFor="" value={pedidos.idprov}>
              `ID + ${pedidos.idprov}`
            </label>
          </ModalPed>

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
                    {/* <p>Total: Q. {pedidos.total}</p> */}
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
                  {/* <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(pedidos.idpedido)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button> */}

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
