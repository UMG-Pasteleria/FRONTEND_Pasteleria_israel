import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/Chocolate.jpeg";
import ModalupTamPastel from "../components/modals/ModalUpdateTamañoPastel";
import ModalTamañoPast from "../components/modals/modalTamañoPastel";
import Navbar from "../components/navbar";
//import SidebarCompras from "../components/sidebarCompras";
import SidebarInventario from "../components/sidebarInventario";
import PDFGenerator from "../generarPDF/g.Cliente";
import "../styles/tamañoPasteles.css";

function DecPastel() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  const [decpasteles, setTamPasteles] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/";

  const getData = async () => {
    try {
      const response = await fetch(URL + "decoracion");
      const json = await response.json();
      setTamPasteles(json);
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
  const enviarTamPastel = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Tamaño de pastel Agregado!",
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

  const handleDelete = async (idtampast) => {
    const res = await fetch(URL + `decoracion/${idtampast}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setTamPasteles(
      decpasteles.filter((tampastel) => tampastel.idtampast !== idtampast)
    );
  };

  //------------------------------------FIN ELIMINA CLIENTE -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idtampast) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del tamaño de pastel",
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
          handleDelete(idtampast);
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
    result = decpasteles;
  } else {
    result = decpasteles.filter((datos) =>
      datos.tamanio.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <Navbar />
      <SidebarInventario />
      <div className="bodyTamPast">
        <div className="ContainerTamPast"></div>
        <div className="TamPasteles">
          <br></br>
          <h2>Listado Del Tamaño De Pasteles</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO CLIENTE-------------- */}
          <ModalTamañoPast
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo Tamaño de Pastel"
          >
            <div className="containerNewTamPast">
              <form
                className="nuevoTamPastForm"
                id="FormularioTamP"
                onSubmit={enviarTamPastel}
              >
                <div className="itemTamPast">
                  <label>Tamaño de pastel: </label>
                  <input
                    {...register("tamanio")}
                    type="text"
                    id="tamanio"
                    placeholder="Tamaño de pastel"
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

                <div className="bonotesNewTamPast">
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
          </ModalTamañoPast>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO CLIENTE ------------------ */}

          {/* ------------------- MODAL EDITAR  CLIENTE-------------- */}

          <ModalupTamPastel
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar tamaño de pastel"}
            idEdit={idEdit}
            setTamPasteles={setTamPasteles}
            tampasteles={decpasteles}
          ></ModalupTamPastel>
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
                    placeholder="Buscar tamaño de pasteles"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={decpasteles} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="tampastelMovil">
            {result.map((tampastel, index) => (
              <div className="ContenedorTamPasteles" key={index}>
                <div className="imgPerfil">
                  <div className="tampastelID">
                    <p>ID</p>
                    <span>{tampastel.idtampast}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(tampastel.idtampast)
                    }
                  />
                </div>

                <div
                  className="datoTamPastel"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(tampastel.idtampast)
                  }
                >
                  <div>
                    <h3>{tampastel.tamanio}</h3>
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
                    onClick={() => mostrarAlerta(tampastel.idtampast)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="tampastelEscritorio">
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

            {result.map((tampastel, index) => (
              <div className="ContenedorTamPasteles" key={index}>
                <div className="imgPerfil">
                  <div className="tampastelID">
                    <p>ID</p>
                    <span>{tampastel.idtampast}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoTamPastel"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{tampastel.tamanio}</h3>
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
        </div>
      </div>
    </>
  );
}

export default DecPastel;
