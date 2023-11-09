import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/avatar.png";
import ModalupClient from "../components/modals/ModalUpdateCliente";
import ModalCli from "../components/modals/modalCliente";
import Navbar from "../components/navbar";
//import SidebarCompras from "../components/sidebarCompras";
import SidebarPedidos from "../components/sidebarPedido";
import PDFGenerator from "../generarPDF/g.Cliente";
import "../styles/clientes.css";

function Cliente() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");
  const [clientes, setClientes] = useState([]);

  const URL = import.meta.env.VITE_URL;

  const getData = async () => {
    try {
      const response = await fetch(URL + "cliente");
      const json = await response.json();
      setClientes(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO CLIENTE------//
  // const { handleSubmit, register } = useForm();
  // const enviarCliente = handleSubmit((data) => {
  //   console.log(data);
  //   fetch(URL, {
  //     method: "POST",
  //     headers: { "content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  //   getData();
  //   cambiarEstadoModal1(!estadoModal1);
  //   swal.fire({
  //     title: "Cliente Agregado!",
  //     icon: "success",
  //     showConfirmButton: false,
  //     timer: 1200,
  //     customClass: {
  //       confirmButton: "btEliminar",
  //       cancelButton: "btCancelar",
  //       popup: "popus-eliminado",
  //       title: "titulo-pop",
  //       container: "contenedor-alert",
  //     },
  //   });
  // });

  //-----------------ELIMINAR CLIENTE---------------------------------

  const handleDelete = async (idcliente) => {
    const res = await fetch(URL + `cliente/${idcliente}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setClientes(clientes.filter((cliente) => cliente.idcliente !== idcliente));
  };

  //------------------------------------FIN ELIMINA CLIENTE -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idcliente) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del Cliente",
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
          handleDelete(idcliente);
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
    result = clientes;
  } else {
    result = clientes.filter((datos) =>
      datos.nombre_cl.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <Navbar />
      <SidebarPedidos />
      <div className="bodyClient">
        <div className="ContainerC"></div>
        <div className="Clientes">
          <br></br>
          <h2>Listado de Clientes</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO CLIENTE-------------- */}
          <ModalCli
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo cliente"
            setClientes={setClientes}
            clientes={clientes}
            URL={URL}
          ></ModalCli>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO CLIENTE ------------------ */}

          {/* ------------------- MODAL EDITAR  CLIENTE-------------- */}

          <ModalupClient
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar cliente"}
            idEdit={idEdit}
            setClientes={setClientes}
            clientes={clientes}
          ></ModalupClient>
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
                    placeholder="Buscar cliente"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={clientes} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="clienteMovil">
            {result.map((cliente, index) => (
              <div className="ContenedorClientes" key={index}>
                <div className="imgPerfil">
                  <div className="clienteID">
                    <p>ID</p>
                    <span>{cliente.idcliente}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(cliente.idcliente)
                    }
                  />
                </div>

                <div
                  className="datoCliente"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(cliente.idcliente)
                  }
                >
                  <div>
                    <h3>{cliente.nombre_cl}</h3>
                  </div>
                  <div>
                    <h5>NIT: {cliente.nit_cl}</h5>
                  </div>
                  <div>
                    <p>Telefono: {cliente.telefono_cl}</p>
                  </div>
                  <div>
                    <p>Direccion: {cliente.direccion_cl}</p>
                  </div>
                  <div>
                    <p>Tipo Cliente: {cliente.tipo_cl}</p>
                  </div>
                </div>
                <div className="controlBtC">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(cliente.idcliente)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="clienteEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>ID: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Cliente: </h3>
                </div>
                <div className="encD">
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
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {result.map((cliente, index) => (
              <div className="ContenedorClientes" key={index}>
                <div className="imgPerfil">
                  <div className="clienteID">
                    <p>ID</p>
                    <span>{cliente.idcliente}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoCliente"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{cliente.nombre_cl}</h3>
                  </div>
                  <div>
                    <h5>{cliente.nit_cl}</h5>
                  </div>
                  <div>
                    <p>{cliente.telefono_cl}</p>
                  </div>
                  <div>
                    <p>{cliente.direccion_cl}</p>
                  </div>
                  <div>
                    <p>{cliente.tipo_cl}</p>
                  </div>
                </form>
                <div className="controlBtC">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(cliente.idcliente)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(cliente.idcliente)}
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

export default Cliente;
