import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
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

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/cliente";

  const getData = async () => {
    try {
      const response = await fetch(URL);
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
  const { handleSubmit, register } = useForm();
  const enviarCliente = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Cliente Agregado!",
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

  const handleDelete = async (id_cliente) => {
    const res = await fetch(`http://localhost:3000/cliente/${id_cliente}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setClientes(
      clientes.filter((cliente) => cliente.id_cliente !== id_cliente)
    );
  };

  //------------------------------------FIN ELIMINA CLIENTE -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (id_cliente) => {
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
          handleDelete(id_cliente);
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
          >
            <div className="containerNewClient">
              <form
                className="nuevoClientForm"
                id="FormularioC"
                onSubmit={enviarCliente}
              >
                <div className="itemClient">
                  <label>NIT: </label>
                  <input
                    {...register("nit_cl")}
                    type="number"
                    id="nit_client"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemClient">
                  <label>Cliente: </label>
                  <input
                    {...register("nombre_cl")}
                    type="text"
                    id="nombre_client"
                    placeholder="Cliente"
                  ></input>
                </div>

                <div className="itemClient">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_cl")}
                    type="number"
                    id="telefono_client"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemClient">
                  <label>Correo: </label>
                  <input
                    {...register("direccion_cl")}
                    type="text"
                    id="correo_client"
                    placeholder="Correo electronico"
                  ></input>

                  <div className="itemClient">
                    <label>Direccion: </label>
                    <input
                      {...register("tipo_cliente")}
                      type="text"
                      id="direccion_client"
                      placeholder="Direccion"
                    ></input>
                  </div>
                </div>
                <br />

                <div className="bonotesNewClient">
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
          </ModalCli>
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
                    <span>{cliente.id_cliente}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(cliente.id_cliente)
                    }
                  />
                </div>

                <div
                  className="datoCliente"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(cliente.id_cliente)
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
                </div>
                <div className="controlBtC">
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
                    <span>{cliente.id_cliente}</span>
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
                    <p>{cliente.tipo_cliente}</p>
                  </div>
                </form>
                <div className="controlBtC">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(cliente.id_cliente)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(cliente.id_cliente)}
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
