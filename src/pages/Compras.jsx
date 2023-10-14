import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalP from "../components/modals/modalProveedor";
import ModalupProiveedor from "../components/modals/ModalUpdateProveedor";
import Navbar from "../components/navbar";
import SidebarCompras from "../components/sidebarCompras";
import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/compras.css";

function Compras() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  const [compra, setProveedor] = useState([]);

  const URL = "http://localhost:3000/compras";

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
  });

  //-----------------ELIMINAR PORVEEDOR---------------------------------

  const handleDelete = async (idcompras) => {
    const res = await fetch(`http://localhost:3000/compras/${idcompras}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setProveedor(
      compra.filter((proveedor) => proveedor.idcompras !== idcompras)
    );
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
  const navigate = useNavigate();
  const params = useParams();
  //--------------------------------- EDITAR PROVEEDOR ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR PROVEEDOR ----------------------------------//

  useEffect(() => {
    console.log(params);
  }, []);

  function validar() {
    FormularioP.reset();
  }

  return (
    <>
      <Navbar />
      <SidebarCompras />
      <div className="bodyProv">
        <div className="ContainerP"></div>
        <div className="Proveedores">
          <br></br>
          <h2>Listado de Compras</h2>
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
                      onClick={validar}
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

              <button>
                <span className="material-symbols-outlined">print</span>
              </button>
              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="proveedorMovil">
            {compra.map((compra, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{compra.idprov}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(compra.idprov)
                    }
                  />
                </div>

                <div
                  className="datoProveedor"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(compra.idprov)
                  }
                >
                  <div>
                    <h3>{compra.nombre_pr}</h3>
                  </div>
                  <div>
                    <h5>NIT: {compra.nit_pr}</h5>
                  </div>
                  <div>
                    <p>Telefono: {compra.telefono_pr}</p>
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
                  <h3>Responsable: </h3>
                </div>
                <div className="encD">
                  <h3>Producto: </h3>
                </div>
                <div className="encD">
                  <h3>Cantida: </h3>
                </div>
                <div className="encD">
                  <h3>Metodo de pago: </h3>
                </div>
                <div className="encD">
                  <h3>Emision: </h3>
                </div>
                <div className="encD">
                  <h3>Entrega: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {compra.map((compra, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="compraID">
                    <p>ID</p>
                    <span>{compra.idcompras}</span>
                  </div>
                  {/* <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  /> */}
                </div>

                <form
                  className="datoProveedor"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{compra.responsable}</h3>
                  </div>
                  <div>
                    <h5>{compra.nombre_producto}</h5>
                  </div>
                  <div>
                    <p>{compra.cantidad}</p>
                  </div>
                  <div>
                    <p>{compra.metd_pago}</p>
                  </div>
                  <div>
                    <p>{compra.emision}</p>
                  </div>
                  <div>
                    <p>{compra.entrega}</p>
                  </div>
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(compra.idprov)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(compra.idprov)}
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

export default Compras;
