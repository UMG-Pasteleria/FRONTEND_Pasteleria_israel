import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/avatar.png";
import ModalupTClient from "../components/modals/ModalUpdateTipoCliente";
import ModalTipoCli from "../components/modals/modalTipoCliente";
import Navbar from "../components/navbar";
//import SidebarCompras from "../components/sidebarCompras";
import SidebarPedidos from "../components/sidebarPedido";
import PDFGenerator from "../generarPDF/g.Cliente";
import "../styles/tipoClientes.css";

function TCliente() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  const [tclientes, setTClientes] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/";

  const getData = async () => {
    try {
      const response = await fetch(URL + "tipo_cliente");
      const json = await response.json();
      setTClientes(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO CLIENTE------//
  const { handleSubmit, register } = useForm();
  const enviarTCliente = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Tipo de cliente Agregado!",
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
  });

  //-----------------ELIMINAR CLIENTE---------------------------------

  const handleDelete = async (idtcl) => {
    const res = await fetch(URL + `tipo_cliente/${idtcl}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setTClientes(tclientes.filter((tcliente) => tcliente.idtcl !== idtcl));
  };

  //------------------------------------FIN ELIMINA CLIENTE -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idtcl) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del tipo cliente",
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
          handleDelete(idtcl);
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

  //--------------------------------- EDITAR CLIENTE ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR CLIENTE ----------------------------------//

  //------------busqueda inteligente -----------------
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = tclientes;
  } else {
    result = tclientes.filter((datos) =>
      datos.tipo_cl.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <Navbar />
      <SidebarPedidos />
      <div className="bodyTClient">
        <div className="ContainerTC"></div>
        <div className="TClientes">
          <br></br>
          <h2>Listado Del Tipo Cliente</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO CLIENTE-------------- */}
          <ModalTipoCli
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo Tipo de Cliente"
          >
            <div className="containerNewTClient">
              <form
                className="nuevoTClientForm"
                id="FormularioTC"
                onSubmit={enviarTCliente}
              >
                <div className="itemTClient">
                  <label>Tipo cliente: </label>
                  <input
                    {...register("tipo_cl")}
                    type="text"
                    id="tipo_cl"
                    placeholder="Tipo cliente"
                  ></input>
                </div>

                {/* <div className="itemClient">
                  <label>Cliente: </label>
                  <input
                    {...register("nombre_cl")}
                    type="text"
                    id="nombre_cl"
                    placeholder="Cliente"
                  ></input>
                </div> */}

                {/* <div className="itemClient">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_cl")}
                    type="number"
                    id="telefono_cl"
                    placeholder="Telefono"
                  ></input>
                </div> */}

                {/* <div className="itemClient">
                  <label>Direccion: </label>
                  <input
                    {...register("direccion_cl")}
                    type="text"
                    id="direccion_cl"
                    placeholder="Direccion"
                  ></input>

                  <div className="itemClient">
                    <label>Tipo Cliente: </label>
                    <input
                      {...register("idtcl")}//id tabla tipo_cliente
                      type="number"
                      id="idtcl"
                      placeholder="Tipo_cliente"
                    ></input>
                  </div>
                </div> */}
                <br />

                <div className="bonotesNewTClient">
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
                    {/* <button
                      type="submit"
                      className="btGuardar"
                      
                    > */}

                    <button type="submit" className="btGuardar">
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalTipoCli>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO CLIENTE ------------------ */}

          {/* ------------------- MODAL EDITAR  CLIENTE-------------- */}

          <ModalupTClient
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar tipo cliente"}
            idEdit={idEdit}
            setTClientes={setTClientes}
            tclientes={tclientes}
          ></ModalupTClient>
          {/* --------------------------- FIN MODAL EDITAR PROVEEDOR ------------------ */}

          {/* //----------------------------------ELIMINAR PROVEEDOR ----------------------------------*/}

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
                    placeholder="Buscar tipo de cliente"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={tclientes} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="tclienteMovil">
            {result.map((tcliente, index) => (
              <div className="ContenedorTClientes" key={index}>
                <div className="imgPerfil">
                  <div className="tclienteID">
                    <p>ID</p>
                    <span>{tcliente.idtcl}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(tcliente.idtcl)
                    }
                  />
                </div>

                <div
                  className="datoTCliente"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(tcliente.idtcl)
                  }
                >
                  <div>
                    <h3>{tcliente.tipo_cl}</h3>
                  </div>
                  {/* <div>
                    <h5>NIT: {tcliente.nit_cl}</h5>
                  </div>
                  <div>
                    <p>Telefono: {tcliente.telefono_cl}</p>
                  </div>
                  <div>
                    <p>Direccion: {tcliente.direccion_cl}</p>
                  </div>
                  <div>
                    <p>Tipo Cliente: {tcliente.idtcl}</p>
                  </div> */}
                </div>
                <div className="controlBtC">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(tcliente.idtcl)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="tclienteEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>ID: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Tipo de cliente: </h3>
                </div>
                {/* <div className="encD">
                  <h3>NIT: </h3>
                </div>
                <div className="encD">
                  <h3>Telefono: </h3>
                </div>
                <div className="encD">
                  <h3>Direccion: </h3>
                </div>
                <div className="encD">
                  <h3>Tipo: </h3>
                </div> */}
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {result.map((tcliente, index) => (
              <div className="ContenedorTClientes" key={index}>
                <div className="imgPerfil">
                  <div className="tclienteID">
                    <p>ID</p>
                    <span>{tcliente.idtcl}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoTCliente"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{tcliente.tipo_cl}</h3>
                  </div>
                  {/* <div>
                    <h5>{tcliente.nit_cl}</h5>
                  </div>
                  <div>
                    <p>{tcliente.telefono_cl}</p>
                  </div>
                  <div>
                    <p>{tcliente.direccion_cl}</p>
                  </div>
                  <div>
                    <p>{tcliente.idtcl}</p>
                  </div> */}
                </form>
                <div className="controlBtC">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(tcliente.idtcl)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(tcliente.idtcl)}
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

export default TCliente;
