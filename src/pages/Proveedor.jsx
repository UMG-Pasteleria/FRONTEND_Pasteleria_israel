import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
import ModalupProiveedor from "../components/modals/ModalUpdateProveedor";
import ModalP from "../components/modals/modalProveedor";
import Navbar from "../components/navbar";
import SidebarCompras from "../components/sidebarCompras";
import PDFGenerator from "../generarPDF/gProveedores";
import "../styles/proveedores.css";

const Proveedor = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  const [proveedor, setProveedor] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/proveedores";

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setProveedor(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO PROVEEDOR------//
  const { handleSubmit, register } = useForm();
  const enviarProveedor = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Proveedor Agregado!",
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
    (document.getElementById("correo_pr").value = null),
      (document.getElementById("nit_pr").value = null),
      (document.getElementById("nombre_pr").value = null),
      (document.getElementById("telefono_pr").value = null),
      (document.getElementById("direccion_pr").value = null);
  });

  //-----------------ELIMINAR PORVEEDOR---------------------------------

  const handleDelete = async (idprov) => {
    const res = await fetch(`http://localhost:3000/proveedores/${idprov}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setProveedor(proveedor.filter((proveedor) => proveedor.idprov !== idprov));
  };

  //------------------------------------FIN ELIMINA PROVEEDOR -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idprov) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del Proveedor",
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
          handleDelete(idprov);

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



  return (
    <>
      <Navbar />
      <SidebarCompras />
      <div className="bodyProv">
        <div className="ContainerP"></div>
        <div className="Proveedores">
          <br></br>
          <h2>Listado de Proveedores</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PROVEEDOR-------------- */}
          <ModalP
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo proveedor"
          >
            <div className="containerNewProv">
              <form
                className="nuevoProvForm"
                id="FormularioP"
                onSubmit={enviarProveedor}
              >
                <div className="itemProv">
                  <label>NIT: </label>
                  <input
                    {...register("nit_pr")}
                    type="number"
                    id="nit_pr"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Proveedor: </label>
                  <input
                    {...register("nombre_pr")}
                    type="text"
                    id="nombre_pr"
                    placeholder="Proveedor"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_pr")}
                    type="number"
                    id="telefono_pr"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Correo: </label>
                  <input
                    {...register("correo_pr")}
                    type="text"
                    id="correo_pr"
                    placeholder="Correo electronico"
                  ></input>

                  <div className="itemProv">
                    <label>Direccion: </label>
                    <input
                      {...register("direccion_pr")}
                      type="text"
                      id="direccion_pr"
                      placeholder="direccion"
                    ></input>
                  </div>
                </div>
                <br />

                <div className="bonotesNewProv">
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
                      // onClick={validar}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalP>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PROVEEDOR ------------------ */}

          {/* ------------------- MODAL EDITAR  PROVEEDOR-------------- */}

          <ModalupProiveedor
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar proveedor"}
            idEdit={idEdit}
          ></ModalupProiveedor>
          {/* --------------------------- FIN MODAL EDITAR PROVEEDOR ------------------ */}

          {/* //----------------------------------ELIMINAR PROVEEDOR ----------------------------------*/}

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
                    placeholder="Buscar proveedor"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

           
              <PDFGenerator data={proveedor}/>

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>

          <hr></hr>
          <br></br>
          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="proveedorMovil">
            {proveedor.map((proveedor, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{proveedor.idprov}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(proveedor.idprov)
                    }
                  />
                </div>

                <div
                  className="datoProveedor"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(proveedor.idprov)
                  }
                >
                  <div>
                    <h3>{proveedor.nombre_pr}</h3>
                  </div>
                  <div>
                    <h5>NIT: {proveedor.nit_pr}</h5>
                  </div>
                  <div>
                    <p>Telefono: {proveedor.telefono_pr}</p>
                  </div>
                </div>
                <div className="controlBtP">
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
          <div className="proveedorEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>ID: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Proveedor: </h3>
                </div>
                <div className="encD">
                  <h3>NIT: </h3>
                </div>
                <div className="encD">
                  <h3>Telefono: </h3>
                </div>
                <div className="encD">
                  <h3>Correo: </h3>
                </div>
                <div className="encD">
                  <h3>Direccion: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {proveedor.map((proveedor, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{proveedor.idprov}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoProveedor"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{proveedor.nombre_pr}</h3>
                  </div>
                  <div>
                    <h5>{proveedor.nit_pr}</h5>
                  </div>
                  <div>
                    <p>{proveedor.telefono_pr}</p>
                  </div>
                  <div>
                    <p>{proveedor.correo_pr}</p>
                  </div>
                  <div>
                    <p>{proveedor.direccion_pr}</p>
                  </div>
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(proveedor.idprov)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(proveedor.idprov)}
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

export default Proveedor;
