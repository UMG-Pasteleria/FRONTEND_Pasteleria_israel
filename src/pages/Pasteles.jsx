import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import avatar from "../assets/Chocolate.jpeg";
import ModalupPastel from "../components/modals/ModalUpdatePastel";
import ModalPast from "../components/modals/modalPastel";
import Navbar from "../components/navbar";
import SidebarInventario from "../components/sidebarInventario";
import PDFGenerator from "../generarPDF/gProveedores";
import "../styles/pasteles.css";

const Pastel = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  const [pasteles, setPasteles] = useState([]);
  const [tamanios, setTamanio] = useState([]);
  const [decoracines, setDecoracion] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [tipos, setTipo] = useState([]);

  const URL = import.meta.env.VITE_URL;

  const getData = async () => {
    try {
      const response = await fetch(URL + "pastel");
      const datos = await response.json();
      setPasteles(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };

  //--------------------TAMAÑO DE PASTELES----------------------
  const getTamanio = async () => {
    try {
      const response = await fetch(URL + "tamanio");
      const datos = await response.json();
      setTamanio(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };

  //--------------------- DECORACION DE PASTELES----------------------

  const getDecoracion = async () => {
    try {
      const response = await fetch(URL + "decoracion");
      const datos = await response.json();
      setDecoracion(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };

  //---------------------  CATEGORIA DE PASTELES----------------------

  const getCategoria = async () => {
    try {
      const response = await fetch(URL + "categoria");
      const datos = await response.json();
      setCategoria(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };

  //-------------- TIPO DE PASTEL ------------------

  const getTipo = async () => {
    try {
      const response = await fetch(URL + "tipo");
      const datos = await response.json();
      setTipo(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
    getTamanio();
    getDecoracion();
    getCategoria();
    getTipo();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO PROVEEDOR------//
  const { handleSubmit, register } = useForm();
  const enviarPastel = handleSubmit((data) => {
    console.log(data);
    fetch(URL + "pastel", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Pastel Agregado!",
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
    // (document.getElementById("email").value = null),
    //   (document.getElementById("nit").value = null),
    //   (document.getElementById("nombre_proveedor").value = null),
    //   (document.getElementById("telefono_prov").value = null),
    //   (document.getElementById("direccion_prov").value = null);
  });

  //-----------------ELIMINAR PASTEL---------------------------------

  const handleDelete = async (idpastel) => {
    const res = await fetch(URL + `pastel/${idpastel}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setPasteles(pasteles.filter((pastel) => pastel.idpastel !== idpastel));
  };

  //------------------------------------FIN ELIMINA PROVEEDOR -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idpastel) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del Pastel",
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
          handleDelete(idpastel);

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

  //--------------------------------- EDITAR PROVEEDOR ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR PROVEEDOR ----------------------------------//

  //------------busqueda inteligente -----------------
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = pasteles;
  } else {
    result = pasteles.filter((datos) =>
      datos.pastel.toLowerCase().includes(search.toLowerCase())
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
      <div className="bodyPast">
        <div className="ContainerPast"></div>
        <div className="Pasteles">
          <br></br>
          <h2>Listado de Pasteles</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PASTEL-------------- */}
          <ModalPast
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo pastel"
          >
            <div className="containerNewPast">
              <form
                className="nuevoPastForm"
                id="FormularioPast"
                onSubmit={enviarPastel}
              >
                <div className="itemPast">
                  <label>Pastel: </label>
                  <input
                    {...register("pastel")}
                    type="text"
                    id="pastel"
                    placeholder="Pastel"
                  ></input>
                </div>

                <div className="itemPast">
                  <label>Precio: </label>
                  <input
                    {...register("precio")}
                    type="number"
                    id="precio"
                    placeholder="Precio"
                  ></input>
                </div>

                <div className="itemPast">
                  <label>Stock: </label>
                  <input
                    {...register("stock")}
                    type="number"
                    id="stock"
                    placeholder="Stock"
                  ></input>
                </div>

                <div className="itemPast">
                  <label>Tamaño del pastel: </label>
                  <select
                    className="selector"
                    {...register("tamanio_idpast")}
                    id="tamanio_idpast"
                  >
                    <option disabled selected>
                      Seleccione tamaño de pastel
                    </option>
                    {tamanios.map((tamanios, index) => (
                      <option
                        className="opciones"
                        key={index}
                        Value={tamanios.idtampast}
                      >
                        {tamanios.tamanio}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="itemPast">
                  <label>Decoracion del pastel: </label>
                  <select
                    className="selector"
                    {...register("dec_idpast")}
                    id="dec_idpast"
                    placeholder="Sedeccione decoracion"
                  >
                    <option disabled selected>
                      Seleccione decoracion
                    </option>
                    {decoracines.map((decoraciones, index) => (
                      <option
                        className="opciones"
                        key={index}
                        Value={decoraciones.idecpast}
                      >
                        {decoraciones.decoracion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="itemPast">
                  <label>Categoria del pastel: </label>
                  <select
                    className="selector"
                    {...register("cat_idpast")}
                    id="cat_idpast"
                    placeholder="Sedeccione decoracion"
                  >
                    <option disabled selected>
                      Seleccione categoria
                    </option>
                    {categorias.map((categorias, index) => (
                      <option
                        className="opciones"
                        key={index}
                        Value={categorias.idcatp}
                      >
                        {categorias.categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="itemPast">
                  <label>Tipo de pastel: </label>
                  <select
                    className="selector"
                    {...register("id_tipo")}
                    id="id_tipo"
                    placeholder="Sedeccione decoracion"
                  >
                    <option disabled selected>
                      Seleccione tipo
                    </option>
                    {tipos.map((tipos, index) => (
                      <option
                        className="opciones"
                        key={index}
                        Value={tipos.idtpastel}
                      >
                        {tipos.tipo_pastel}
                      </option>
                    ))}
                  </select>
                </div>

                <br />

                <div className="bonotesNewPast">
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
          </ModalPast>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PROVEEDOR ------------------ */}

          {/* ------------------- MODAL EDITAR  PROVEEDOR-------------- */}

          <ModalupPastel
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar pastel"}
            idEdit={idEdit}
            setProductos={setPasteles}
            productos={pasteles}
          ></ModalupPastel>
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
                    placeholder="Buscar pastel"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              {/* <PDFGenerator data={pasteles} /> */}

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="pastelMovil">
            {result.length === 0 ? (
              result.map((pasteles, index) => (
                <div className="ContenedorPasteles" key={index}>
                  <div className="imgPerfil">
                    <div className="pastelID">
                      <p>ID</p>
                      <span>{pasteles.stock}</span>
                    </div>
                    <img
                      src={avatar}
                      className="avatar"
                      onClick={() =>
                        cambiarEstadoModal2(!estadoModal2) &
                        setIdEdit(pasteles.idpastel)
                      }
                    />
                  </div>

                  <div
                    className="datoPastel"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(pasteles.idpastel)
                    }
                  >
                    <div>
                      <h3>{pasteles.pastel}</h3>
                    </div>
                    <div>
                      <h5>Precio: {pasteles.precio}</h5>
                    </div>
                    <div>
                      <p>Tamaño del pastel: {pasteles.tamanio}</p>
                    </div>
                  </div>
                  <div className="controlBtP">
                    <button className="btEditarU">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <br />
                    <button
                      className="btEliminarU"
                      onClick={() => mostrarAlerta(pasteles.idpastel)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay datos</p>
            )}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="pastelEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>Stock: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Pastel: </h3>
                </div>
                <div className="encD">
                  <h3>Precio: </h3>
                </div>
                <div className="encD">
                  <h3>Tamaño del pastel: </h3>
                </div>
                <div className="encD">
                  <h3>Decoracion del pastel: </h3>
                </div>
                <div className="encD">
                  <h3>Categoria del pastel: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>
            {result.map((pastel, index) => (
              <div className="ContenedorPasteles" key={index}>
                <div className="imgPerfil">
                  <div className="pastelID">
                    <p>ID</p>
                    <span>{pastel.stock}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoPastel"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{pastel.pastel}</h3>
                  </div>
                  <div>
                    <h5>{pastel.precio}</h5>
                  </div>
                  <div>
                    <p>{pastel.tamanio}</p>
                  </div>
                  <div>
                    <p>{pastel.decoracion}</p>
                  </div>
                  <div>
                    <p>{pastel.categoria}</p>
                  </div>
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(pastel.idpastel)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(pastel.idpastel)}
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

export default Pastel;
