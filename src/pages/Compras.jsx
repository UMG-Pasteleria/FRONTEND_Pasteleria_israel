import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
import ModalupProiveedor from "../components/modals/ModalUpdateProveedor";
import ModalP from "../components/modals/modalProveedor";
import Navbar from "../components/navbar";
import SidebarCompras from "../components/sidebarCompras";
import PDFGenerator from "../generarPDF/g.Compras";
import "../styles/compras.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Compras() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [compras, setCompras] = useState([]);
  const [proveedoresC, setProveedoresC] = useState([]);
  const [search, setSaerch] = useState("");
  //-------URLS DE API-----------------//

  const URL = "http://localhost:3000/compras";

  //-----CAPTURAR DATOS DE COMPRAS------//

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const datos = await response.json();
      setCompras(datos);
      console.log(datos);
      return datos;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //-----CAPTURAR DATOS DE NUEVA COMPRA------//
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

  //-----------------ELIMINAR COMPRAS---------------------------------

  const handleDelete = async (idcompras) => {
    const res = await fetch(`http://localhost:3000/compras/${idcompras}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setCompras(
      compras.filter((proveedor) => proveedor.idcompras !== idcompras)
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

  //--------------------------------- EDITAR PROVEEDOR ----------------------------------//

  //--------------------------------- FIN EDITAR PROVEEDOR ----------------------------------//

  //------------busqueda inteligente -----------------
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = compras;
  } else {
    result = compras.filter((datos) =>
      datos.responsable.toLowerCase().includes(search.toLowerCase())
    );
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
          {/* ------------------- MODAL AGREGAR NUEVA COMPRA-------------- */}
          <ModalP
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nueva compra"
          >
            <div className="containerNewProv">
              <form
                className="nuevoProvForm"
                id="FormularioP"
                onSubmit={enviarProveedor}
              >
                <div className="itemProv">
                  <label>Responsable: </label>
                  <input
                    {...register("responsable")}
                    type="number"
                    id="responsable"
                    placeholder="Responsable"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Proveedor: </label>
                  <input
                    {...register("nombre_producto")}
                    type="text"
                    id="nombre_pr"
                    placeholder="Producto"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Telefono: </label>
                  <input
                    {...register("cantidad")}
                    type="number"
                    id="telefono_pr"
                    placeholder="Cantidad"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Correo: </label>
                  <input
                    {...register("metd_pago")}
                    type="text"
                    id="correo_pr"
                    placeholder="Metodo de pago"
                  ></input>

                  <div className="itemProv">
                    <label>Direccion: </label>
                    <input
                      {...register("emision")}
                      type="text"
                      id="direccion_pr"
                      placeholder="Fecha de emision"
                    ></input>
                  </div>
                </div>
                <br />

                <div className="itemProv">
                  <label>Direccion: </label>
                  <input
                    {...register("entrega")}
                    type="text"
                    id="direccion_pr"
                    placeholder="Fecha de entrega"
                  ></input>
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
                    <button type="submit" className="btGuardar">
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalP>
          {/* --------------------------- FIN MODAL INGRESAR NUEVA COMPRA ------------------ */}

          {/* ------------------- MODAL EDITAR  COMPRA-------------- */}

          <ModalupProiveedor
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar proveedor"}
            idEdit={idEdit}
          ></ModalupProiveedor>
          {/* --------------------------- FIN MODAL EDITAR COMPRA ------------------ */}

          {/* //----------------------------------ELIMINAR COMPRA ----------------------------------*/}

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
                    onChange={searcher}
                    placeholder="Buscar proveedor"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={compras} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="proveedorMovil">
            {result.map((compra, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{compra.idcompras}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(compra.idcompras)
                    }
                  />
                </div>

                <div
                  className="datoProveedor"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(compra.idcompras)
                  }
                >
                  <div>
                    <h3>{compra.responsable}</h3>
                  </div>
                  <div>
                    <h5>Producto: {compra.nombre_producto}</h5>
                  </div>
                  <div>
                    <p>Entrega: {compra.entrega}</p>
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

          {/* //--------------------------- VERSION ESCRITORIO ---------------------------- */}
          <div className="proveedorEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>Codigo: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Fecha compra: </h3>
                </div>
                <div className="encD">
                  <h3>Proveedor: </h3>
                </div>
                <div className="encD">
                  <h3>NIT: </h3>
                </div>
                <div className="encD">
                  <h3>producto: </h3>
                </div>
                <div className="encD">
                  <h3>Cantidad: </h3>
                </div>
                <div className="encD">
                  <h3>Precio unitario: </h3>
                </div>
                <div className="encD">
                  <h3>Stock: </h3>
                </div>
                <div className="encD">
                  <h3>Descripcion: </h3>
                </div>
                <div className="encD">
                  <h3>Vencimiento: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {result.map((compra, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="compraID">
                    <span>COMP{compra.idcompra}</span>
                  </div>
                </div>

                <form
                  className="datoProveedor"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{compra.fecha_compra}</h3>
                  </div>
                  <div>
                    <h5>{compra.nombre_proveedor}</h5>
                  </div>
                  <div>
                    <p>{compra.nit}</p>
                  </div>
                  <div>
                    <p>{compra.producto}</p>
                  </div>
                  <div>
                    <p>{compra.cantidad}</p>
                  </div>
                  <div>
                    <p>Q. {compra.costo_unitario}</p>
                  </div>
                  <div>
                    <p>{compra.stock}</p>
                  </div>
                  <div>
                    <p>{compra.descripcion}</p>
                  </div>
                  <div>
                    <p>{compra.fecha_vencimiento}</p>
                  </div>
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(compra.idcompras)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(compra.idcompras)}
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
