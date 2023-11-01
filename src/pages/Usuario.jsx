import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Modal from "../components/modals/modalUsuario";
import ModalupUser from "../components/modals/ModalUpdateProveedor";
import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
import "../styles/usuarios.css";
import ModalEditUser from "../components/modals/modalUserUp2";

const Usuario = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  //------------------------------------MOSTRAR DATOS DE LOS USUARIOS DESDE EL BACKEND--------------------------------------------------------------
  const [usuario, setUsuario] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/usuario";
  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setUsuario(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //-----------------FIN DE MOSTRAR DATOS DE USUARIOS-----------------------------------
  const { handleSubmit, register } = useForm();

  //-----CAPTURAR DATOS DE NUEVO USUARIO------

  const enviarUsuario = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "¡Usuario agregado!",
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

  // ------------------------- ACTUALIZAR USUARIO ------------------------------------

  //--------------------------------- OBTENER DATOS DE USUARIOA A ACTUALIZAR
  // const [idUserEdit, setIdUserEdit] = useState("");

  // //----------------------------------

  // // ------------------------ FIN ACTUALIZAR USUARIO ---------------------------------

  //------------ELIMINAR USUARIO------------------
  const handleDelete = async (idusuario) => {
    const res = await fetch(`http://localhost:3000/susuario/${idusuario}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    // setUsuario(usuario.filter((usuario) => usuario.iduser !== iduser));
    getData();
  };
  // --------------------FIN ELIMINAR USUARIO----------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idusuario) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del usuario",
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
          handleDelete(idusuario);

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
  return (
    <>
      <Navbar />
      <div className="bodyUser">
        <div className="ContainerU"></div>
        <div className="Usuarios">
          <br></br>
          <h2>Usuarios</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO USUARIO-------------- */}
          <Modal
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo usuario"
          >
            <div className="containerNewUSer">
              <form className="nuevoUserForm" onSubmit={enviarUsuario}>
                <div className="itemUser">
                  <label>Nombre: </label>
                  <input
                    {...register("nombre_u")}
                    type="text"
                    id="nombreUser"
                    placeholder="Nombre"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Apellido: </label>
                  <input
                    {...register("apellido_u")}
                    type="text"
                    id="apellidoUser"
                    placeholder="Apellido"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono")}
                    type="number"
                    id="telefonoUser"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Correo: </label>
                  <input
                    {...register("correo")}
                    type="text"
                    id="emailUser"
                    placeholder="Correo electronico"
                  ></input>
                </div>
                <br />

                <div className="bonotesNewUser">
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
                    <button
                      type="submit"
                      className="btGuardar"
                      // onSubmit={() => cambiarEstadoModal1(!estadoModal1)}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO USUARIO ------------------ */}
          {/* //------------------------------- MODAL PARA EDITAR USUARIO */}

          {/* //------------------------------ FIN MODAL EDITAR USUARIO */}

          {/* //----------------------------------ELIMINAR USUARIO ----------------------------------*/}
          <div className="centrarControles">
            <div className="controlesUsuario">
              <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                <span className="material-symbols-outlined">person_add</span>
              </button>

              <div className="busqueda">
                <form
                  action="http://localhost:3000/usuario"
                  method="get"
                  className="cuadroBusqueda"
                >
                  <input
                    type="text"
                    placeholder="Buscar usuario"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <button>
                <span className="material-symbols-outlined">print</span>
              </button>
              <button>
                <span className="material-symbols-outlined" onClick={getData}>
                  refresh
                </span>
              </button>
            </div>
          </div>

          <hr></hr>
          <br />
          <div className="usuarioMovil">
            {usuario.map((usuario, index) => (
              <div className="conenedorPusuario" key={index}>
                <div className="imgPerfil">
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() => (
                      <ModalEditUser idUserEdit={usuario.idusuario} />
                    )}
                  />
                </div>
                <div
                  className="datoUsuario"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>
                      {usuario.nombre_u} {usuario.apellido_u}
                    </h3>
                  </div>
                  <div>
                    <h5>{usuario.correo}</h5>
                  </div>
                  <div> Telefono: {usuario.telefono}</div>
                </div>
                <div className="btControlU">
                  <button
                    className="btEditarU"
                    onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(usuario.idusuario)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="usuarioEscritorio">
            {usuario.map((usuario, index) => (
              <div className="conenedorPusuario" key={index}>
                <div className="imgPerfil">
                  <img src={avatar} className="avatar" />
                </div>
                <div className="datoUsuario">
                  <div>
                    <h3>
                      {usuario.nombre_u} {usuario.apellido_u}
                    </h3>
                  </div>
                  <div>
                    <h5>{usuario.correo}</h5>
                  </div>
                  <div> Telefono: {usuario.telefono}</div>
                </div>
                <div className="btControlU">
                  <ModalEditUser idUserEdit={usuario.idusuario} />

                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(usuario.idusuario)}
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
};

export default Usuario;
