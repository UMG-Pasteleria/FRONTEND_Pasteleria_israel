import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/Chocolate.jpeg";
import ModalupTPastel from "../components/modals/ModalUpdateTipoPastel";
import ModalTipoPast from "../components/modals/modalTipoPastel";
import Navbar from "../components/navbar";
//import SidebarCompras from "../components/sidebarCompras";
import SidebarInventario from "../components/sidebarInventario";
import PDFGenerator from "../generarPDF/g.Cliente";
import "../styles/tipoPasteles.css";

function TPastel() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  const [tpasteles, setTPasteles] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/tipo_cliente";

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setTPasteles(json);
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
  const enviarTPastel = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Tipo de pastel Agregado!",
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

  const handleDelete = async (idtpastel) => {
    const res = await fetch(
      `https://8086zfpm-3000.use.devtunnels.ms/tipo_cliente/${idtpastel}`,
      {
        method: "DELETE",
      }
    );
    // const data = await res.json();
    console.log(res);
    setTPasteles(
      tpasteles.filter((tpastel) => tpastel.idtpastel !== idtpastel)
    );
  };

  //------------------------------------FIN ELIMINA CLIENTE -----------------------------------

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
    result = tpasteles;
  } else {
    result = tpasteles.filter((datos) =>
      datos.tipo_pastel.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <Navbar />
      <SidebarInventario />
      <div className="bodyTPast">
        <div className="ContainerTPast"></div>
        <div className="TPasteles">
          <br></br>
          <h2>Listado Del Tipo Pasteles</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO CLIENTE-------------- */}
          <ModalTipoPast
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo Tipo de Pastel"
          >
            <div className="containerNewTPast">
              <form
                className="nuevoTPastForm"
                id="FormularioTP"
                onSubmit={enviarTPastel}
              >
                <div className="itemTPast">
                  <label>Tipo pastel: </label>
                  <input
                    {...register("tipo_pastel")}
                    type="text"
                    id="tipo_pastel"
                    placeholder="Tipo pastel"
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

                <div className="bonotesNewTPast">
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
          </ModalTipoPast>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO CLIENTE ------------------ */}

          {/* ------------------- MODAL EDITAR  CLIENTE-------------- */}

          <ModalupTPastel
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar tipo pastel"}
            idEdit={idEdit}
            setTPasteles={setTPasteles}
            tpasteles={tpasteles}
          ></ModalupTPastel>
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
                    placeholder="Buscar tipo de pasteles"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={tpasteles} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="tpastelMovil">
            {result.map((tpastel, index) => (
              <div className="ContenedorTPasteles" key={index}>
                <div className="imgPerfil">
                  <div className="tpastelID">
                    <p>ID</p>
                    <span>{tpastel.idtpastel}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(tpastel.idtpastel)
                    }
                  />
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
                    onClick={() => mostrarAlerta(tpastel.idtpastel)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="tpastelEscritorio">
            <div className="contenedorTipoPastel">
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

              {result.map((tpastel, index) => (
                <div className="ContenedorTPasteles" key={index}>
                  <div className="imgPerfil">
                    <div className="tpastelID">
                      <p>ID</p>
                      <span>{tpastel.idtpastel}</span>
                    </div>
                    <img
                      src={avatar}
                      className="avatar"
                      // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                    />
                  </div>

                  <form
                    className="datoTPastel"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  >
                    <div>
                      <h3>{tpastel.tipo_pastel}</h3>
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
            <div className="contenedorTmanioPastel">
              <h1>tamanio pasteles</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TPastel;
