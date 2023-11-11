import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import ModalupTPastel from "../components/modals/ModalUpdateTipoPastel";
import ModalTipoPast from "../components/modals/modalTipoPastel";
import Navbar from "../components/navbar";
//import SidebarCompras from "../components/sidebarCompras";
import SidebarInventario from "../components/sidebarInventario";
import "../styles/tipoPasteles.css";

function TPastel() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  const [tpasteles, setTPasteles] = useState([]);
  const [tampasteles, setTamPasteles] = useState([]);
  const [decpasteles, setDecPasteles] = useState([]);
  const [catpasteles, setCatPasteles] = useState([]);

  const URL = import.meta.env.VITE_URL;

  //--------OBTENER DATOS DE TIPO DE PASTEL---

  const getTipo = async () => {
    try {
      const response = await fetch(URL + "tipo");
      const json = await response.json();
      setTPasteles(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  //--------OBTENER DATOS DE TAMAÑO DE PASTEL---

  const getTamaño = async () => {
    try {
      const response = await fetch(URL + "tamanio");
      const json = await response.json();
      setTamPasteles(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  //--------OBTENER DATOS DE DECORACION DE PASTEL---

  const getDecoracion = async () => {
    try {
      const response = await fetch(URL + "decoracion");
      const json = await response.json();
      setDecPasteles(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  //--------OBTENER DATOS DE CATEGORIA DE PASTEL---

  const getCategoria = async () => {
    try {
      const response = await fetch(URL + "categoria");
      const json = await response.json();
      setCatPasteles(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTipo();
    getTamaño();
    getDecoracion();
    getCategoria();
  }, []);

  //-----------------ELIMINAR TIPO PASTEL---------------------------------

  const handleDelete = async (idtpastel) => {
    const res = await fetch(URL + `tipo/${idtpastel}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setTPasteles(
      tpasteles.filter((tpastel) => tpastel.idtpastel !== idtpastel)
    );
  };

  //------------------------------------FIN ELIMINA TIPO PASTEL -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idtpastel) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del tipo pastel",
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
          handleDelete(idtpastel);
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

  //--------------------------------- EDITAR TIPO PASTEL ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR TIPO PASTEL ----------------------------------//

  //------------busqueda inteligente -----------------

  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = tpasteles;
  } else {
    result = tpasteles.filter((datos) =>
      datos.tipo_pastel.toLowerCase().includes(search.toLowerCase())
    );
  }


    /*----Proteger Rutas---Solo se puede accesar SI ESTA LOGEADO */
    const navegate = useNavigate();

    useEffect(() => {
      // Comprobar si el token existe en el localStorage
      const token = localStorage.getItem('token');
  
      // Si no hay token, redirigir al inicio
      if (!token) {
        navegate('/Admin'); // Reemplaza '/inicio' con la ruta a la que quieres redirigir
      }
    }, []);
    

  return (
    <>
      <Navbar />
      <SidebarInventario />
      <div className="bodyTPast">
        <div className="ContainerTPast"></div>
        <div className="TPasteles">
          <br></br>
          <h2>Listado de caracteristicas</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO TIPO PASTEL-------------- */}
          <ModalTipoPast
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo Tipo de Pastel"
            URL={URL}
            setTPasteles={setTPasteles}
            tpasteles={tpasteles}
          ></ModalTipoPast>

          {/* --------------------------- FIN MODAL INGRESAR TIPO PASTEL ------------------ */}

          {/* ------------------- MODAL EDITAR  TIPO PASTEL-------------- */}

          <ModalupTPastel
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar tipo pastel"}
            idEdit={idEdit}
            setTPasteles={setTPasteles}
            tpasteles={tpasteles}
          ></ModalupTPastel>
          {/* --------------------------- FIN MODAL EDITAR TIPO PASTEL ------------------ */}

          {/* //----------------------------------ELIMINAR TIPO PASTEL ----------------------------------*/}

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="tpastelMovil">
            {result.map((tpastel, index) => (
              <div className="ContenedorTPasteles" key={index}>
                <div className="imgPerfil">
                  <div className="tpastelID">
                    <p>ID</p>
                    <span>{tpastel.idtpastel}</span>
                  </div>
                </div>

                <div
                  className="datoTPastel"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(tpastel.idtpastel)
                  }
                >
                  <div>
                    <h3>{tpastel.tipo_pastel}</h3>
                  </div>
                </div>
                <div className="controlBtC">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(tpastel.idtpastel)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}

          {/*/-------------------------- CONTENEDOR TIPO PASTEL -----------------------------------*/}

          <div className="tpastelEscritorio">
            <div className="contenedorTipoPastel">
              {/*/--------Agrega Iconos Agregar, Refresh*/}
              <div className="centrarControles">
                <div className="controlesUsuario">
                  <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </button>

                  <button onClick={getTipo}>
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>
              {/*/--------FIN de Agrega Iconos Agregar,Refresh*/}

              <div className="encabezadoEscritorio">
                <div className="encID">
                  <div>
                    <h3>ID: </h3>
                  </div>
                </div>

                <div className="encDato">
                  <div className="encD">
                    <h3>Tipo de pastel: </h3>
                  </div>
                </div>
                <div className="encBT">
                  <div>
                    <h3>Accion: </h3>
                  </div>
                </div>
              </div>

              {tpasteles.map((tpastel, index) => (
                <div className="ContenedorTPasteles" key={index}>
                  <div className="imgPerfil">
                    <div className="tpastelID">
                      <p>ID</p>
                      <span>{tpastel.idtpastel}</span>
                    </div>
                  </div>

                  <form
                    className="datoTPastel"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                    <div>
                      <h3>{tpastel.tipo_pastel}</h3>
                    </div>
                  </form>
                  <div className="controlBtC">
                    <button
                      className="btEditarU"
                      onClick={() =>
                        cambiarEstadoModal2(!estadoModal2) &
                        setIdEdit(tpastel.idtpastel)
                      }
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <br />
                    <button
                      className="btEliminarU"
                      onClick={() => mostrarAlerta(tpastel.idtpastel)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*/-------------------------- CONTENEDOR TAMAÑO PASTEL -----------------------------------*/}

            <div className="contenedorTamañoPastel">
              {/*/--------Agrega Iconos Agregar, Refresh*/}
              <div className="centrarControles">
                <div className="controlesUsuario">
                  <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </button>

                  <button onClick={getTipo}>
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>
              {/*/--------FIN de Agrega Iconos Agregar,Refresh*/}

              <div className="encabezadoEscritorio">
                <div className="encID">
                  <div>
                    <h3>ID: </h3>
                  </div>
                </div>

                <div className="encDato">
                  <div className="encD">
                    <h3>Tamaño de pastel: </h3>
                  </div>
                </div>
                <div className="encBT">
                  <div>
                    <h3>Accion: </h3>
                  </div>
                </div>
              </div>
              {tampasteles.map((tampastel, index) => (
                <div className="ContenedorTPasteles" key={index}>
                  <div className="imgPerfil">
                    <div className="tpastelID">
                      <p>ID</p>
                      <span>{tampastel.idtampast}</span>
                    </div>
                  </div>

                  <form
                    className="datoTPastel"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                    <div>
                      <h3>{tampastel.tamanio}</h3>
                    </div>
                  </form>
                  <div className="controlBtC">
                    <button
                      className="btEditarU"
                      onClick={() =>
                        cambiarEstadoModal2(!estadoModal2) &
                        setIdEdit(tampastel.idtampast)
                      }
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <br />
                    <button
                      className="btEliminarU"
                      onClick={() => mostrarAlerta(tampastel.idtampast)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*/-------------------------- CONTENEDOR DECORACION PASTEL -----------------------------------*/}

            <div className="contenedorDecoracionPastel">
              {/*/--------Agrega Iconos Agregar, Refresh*/}
              <div className="centrarControles">
                <div className="controlesUsuario">
                  <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </button>

                  <button onClick={getTipo}>
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>
              {/*/--------FIN de Agrega Iconos Agregar,Refresh*/}

              <div className="encabezadoEscritorio">
                <div className="encID">
                  <div>
                    <h3>ID: </h3>
                  </div>
                </div>

                <div className="encDato">
                  <div className="encD">
                    <h3>Decoracion de pastel: </h3>
                  </div>
                </div>
                <div className="encBT">
                  <div>
                    <h3>Accion: </h3>
                  </div>
                </div>
              </div>

              {decpasteles.map((decpastel, index) => (
                <div className="ContenedorTPasteles" key={index}>
                  <div className="imgPerfil">
                    <div className="tpastelID">
                      <p>ID</p>
                      <span>{decpastel.idecpast}</span>
                    </div>
                  </div>

                  <form
                    className="datoTPastel"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                    <div>
                      <h3>{decpastel.decoracion}</h3>
                    </div>
                  </form>
                  <div className="controlBtC">
                    <button
                      className="btEditarU"
                      onClick={() =>
                        cambiarEstadoModal2(!estadoModal2) &
                        setIdEdit(decpastel.idecpast)
                      }
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <br />
                    <button
                      className="btEliminarU"
                      onClick={() => mostrarAlerta(decpastel.idecpast)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*/-------------------------- CONTENEDOR CATEGORIA PASTEL -----------------------------------*/}

            <div className="contenedorCategoriaPastel">
              {/*/--------Agrega Iconos Agregar, Refresh*/}
              <div className="centrarControles">
                <div className="controlesUsuario">
                  <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                    <span className="material-symbols-outlined">
                      person_add
                    </span>
                  </button>

                  <button onClick={getTipo}>
                    <span className="material-symbols-outlined">refresh</span>
                  </button>
                </div>
              </div>
              {/*/--------FIN de Agrega Iconos Agregar,Refresh*/}

              <div className="encabezadoEscritorio">
                <div className="encID">
                  <div>
                    <h3>ID: </h3>
                  </div>
                </div>

                <div className="encDato">
                  <div className="encD">
                    <h3>Categoria de pastel: </h3>
                  </div>
                </div>
                <div className="encBT">
                  <div>
                    <h3>Accion: </h3>
                  </div>
                </div>
              </div>

              {catpasteles.map((catpastel, index) => (
                <div className="ContenedorTPasteles" key={index}>
                  <div className="imgPerfil">
                    <div className="tpastelID">
                      <p>ID</p>
                      <span>{catpastel.idcatp}</span>
                    </div>
                  </div>

                  <form
                    className="datoTPastel"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                    <div>
                      <h3>{catpastel.categoria}</h3>
                    </div>
                  </form>
                  <div className="controlBtC">
                    <button
                      className="btEditarU"
                      onClick={() =>
                        cambiarEstadoModal2(!estadoModal2) &
                        setIdEdit(catpastel.idcatp)
                      }
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <br />
                    <button
                      className="btEliminarU"
                      onClick={() => mostrarAlerta(catpastel.idcatp)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TPastel;
