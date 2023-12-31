import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; //PROTEGER RUTA--UTILIZAR_useEffect
import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
import ModalEditUser from "../components/modals/modalUserUp2";
import Modal from "../components/modals/modalUsuario";
import Navbar from "../components/navbar";
import PDFGenerator from "../generarPDF/gUsuarios";

import "../styles/usuarios.css";

const Usuario = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  //------------------------------------MOSTRAR DATOS DE LOS USUARIOS DESDE EL BACKEND--------------------------------------------------------------
  const [usuarios, setUsuarios] = useState([]);

  const URL = import.meta.env.VITE_URL;
  const getData = async () => {
    try {
      const response = await fetch(URL + "usuario");
      const datos = await response.json();
      setUsuarios(datos);
      console.log(datos);
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
    try {
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
    } catch (error) {
      console.log(error.massage);
    }
  });

  // ------------------------- ACTUALIZAR USUARIO ------------------------------------

  //--------------------------------- OBTENER DATOS DE USUARIOA A ACTUALIZAR
  const [idEdit, setIdEdit] = useState("");

  // //----------------------------------

  // // ------------------------ FIN ACTUALIZAR USUARIO ---------------------------------

  //------------ELIMINAR USUARIO------------------
  const handleDelete = async (idusuario) => {
    const res = await fetch(URL + `usuario/${idusuario}`, {
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

  //------------busqueda inteligente -----------------
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = usuarios;
  } else {
    result = usuarios.filter((datos) =>
      datos.nombre_u.toLowerCase().includes(search.toLowerCase())
    );
  }

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
          <ModalEditUser
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar usuario"}
            idEdit={idEdit}
            setUsuarios={setUsuarios}
            usuarios={usuarios}
          ></ModalEditUser>
          {/* //------------------------------ FIN MODAL EDITAR USUARIO */}

          {/* //----------------------------------ELIMINAR USUARIO ----------------------------------*/}
          <div className="centrarControles">
            <div className="controlesUsuario">
              <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                <span className="material-symbols-outlined">person_add</span>
              </button>

              <div className="busqueda">
                <form method="get" className="cuadroBusqueda">
                  <input
                    type="text"
                    onChange={searcher}
                    placeholder="Buscar usuario"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={usuarios} />

              <button>
                <span className="material-symbols-outlined" onClick={getData}>
                  refresh
                </span>
              </button>
            </div>
          </div>

          <hr></hr>
          <br />

          {/* ------------------------ MOSTRAR USUARIOS VERSION MOVIL --------------------------- */}
          <div className="usuarioMovil">
            {result.map((usuario, index) => (
              <div className="conenedorPusuario" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{usuario.idusuario}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(usuario.idusuario)
                    }
                  />
                </div>
                <div
                  className="datoUsuario"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(usuario.idusuario)
                  }
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
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
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
            {result.map((usuario, index) => (
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
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(usuario.idusuario)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>

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
