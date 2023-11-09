import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import avatar from "../assets/Chocolate.jpeg";
import ModalupProduct from "../components/modals/ModalUpdateProducto";
import ModalProduct from "../components/modals/modalProducto";
import Navbar from "../components/navbar";
import SidebarInventario from "../components/sidebarInventario";
import PDFGenerator from "../generarPDF/gProveedores";
import "../styles/producto.css";

const Pastel = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");

  const [productos, setProductos] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/";

  const getData = async () => {
    try {
      const response = await fetch(URL + "producto");
      const datos = await response.json();
      setProductos(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO PRODUCTO------//
  const { handleSubmit, register } = useForm();
  const enviarProducto = handleSubmit((data) => {
    console.log(data);
    fetch(URL, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    getData();
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Producto Agregado!",
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

  //-----------------ELIMINAR PRODUCTO---------------------------------

  const handleDelete = async (idprod) => {
    const res = await fetch(URL + `producto/${idprod}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setProductos(productos.filter((producto) => producto.idprod !== idprod));
  };

  //------------------------------------FIN ELIMINA PRODUCTO -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idprod) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del Producto",
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
          handleDelete(idprod);

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

  //--------------------------------- EDITAR PRODUCTO ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR PRODUCTO ----------------------------------//

  //------------busqueda inteligente -----------------
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = productos;
  } else {
    result = productos.filter((datos) =>
      datos.producto.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <Navbar />
      <SidebarInventario />
      <div className="bodyProd">
        <div className="ContainerProd"></div>
        <div className="Productos">
          <br></br>
          <h2>Listado de Productos</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PRODUCTO-------------- */}
          <ModalProduct
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo producto"
          >
            <div className="containerNewProd">
              <form
                className="nuevoProdForm"
                id="FormularioProd"
                onSubmit={enviarProducto}
              >
                <div className="itemProd">
                  <label>Producto: </label>
                  <input
                    {...register("producto")}
                    type="text"
                    id="producto"
                    placeholder="Producto"
                  ></input>
                </div>

                <div className="itemProd">
                  <label>Descripcion: </label>
                  <input
                    {...register("descripcion")}
                    type="text"
                    id="descripcion"
                    placeholder="Descripcion"
                  ></input>
                </div>

                <div className="itemProd">
                  <label>Stock: </label>
                  <input
                    {...register("stock")}
                    type="number"
                    id="stock"
                    placeholder="Stock"
                  ></input>
                </div>

                <div className="itemProd">
                  <label>Fecha vencimiento: </label>
                  <input
                    {...register("fecha_vencimiento")}
                    type="date"
                    id="fecha_vencimiento"
                    placeholder="Fecha vencimiento"
                  ></input>

                  <div className="itemProd">
                    <label>Tipo: </label>
                    <input
                      {...register("tipo")}
                      type="text"
                      id="tipo"
                      placeholder="Tipo"
                    ></input>
                  </div>

                  <div className="itemProd">
                    <label>Proveedor: </label>
                    <input
                      {...register("nombre_proveedor")}
                      type="text"
                      id="nombre_proveedor"
                      placeholder="Nombre proveedor"
                    ></input>
                  </div>

                </div>
                <br />

                <div className="bonotesNewProd">
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
          </ModalProduct>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PRODUCTO ------------------ */}

          {/* ------------------- MODAL EDITAR  PRODUCTO-------------- */}

          <ModalupProduct
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar producto"}
            idEdit={idEdit}
            setProductos={setProductos}
            productos={productos}
          ></ModalupProduct>
          {/* --------------------------- FIN MODAL EDITAR PRODUCTO ------------------ */}

          {/* //----------------------------------ELIMINAR PRODUCTO ----------------------------------*/}

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
                    placeholder="Buscar producto"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <PDFGenerator data={productos} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="productoMovil">
            {result.map((productos, index) => (
              <div className="ContenedorProductos" key={index}>
                <div className="imgPerfil">
                  <div className="productoID">
                    <p>Stock</p>
                    <span>{productos.stock}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(productos.idprod)
                    }
                  />
                </div>

                <div
                  className="datoProd"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(productos.idprod)
                  }
                >
                  <div>
                    <h3>{productos.producto}</h3>
                  </div>
                  <div>
                    <h5>Descripcion: {productos.descripcion}</h5>
                  </div>
                  <div>
                    <p>ID: {productos.idprod}</p>
                  </div>
                </div>
                <div className="controlBtP">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(productos.idprod)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="productoEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>STOCK: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Producto: </h3>
                </div>
                <div className="encD">
                  <h3>Descripcion: </h3>
                </div>
                <div className="encD">
                  <h3>ID: </h3>
                </div>
                <div className="encD">
                  <h3>Fecha vencimiento: </h3>
                </div>
                <div className="encD">
                  <h3>Tipo: </h3>
                </div>
                <div className="encD">
                  <h3>Proveedor: </h3>
                </div>

              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {result.map((producto, index) => (
              <div className="ContenedorProductos" key={index}>
                <div className="imgPerfil">
                  <div className="productoID">
                    <p>STOCK</p>
                    <span>{producto.stock}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoProducto"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{producto.producto}</h3>
                  </div>
                  <div>
                    <h5>{producto.descripcion}</h5>
                  </div>
                  <div>
                    <p>{producto.idprod}</p>
                  </div>
                  <div>
                    <p>{producto.fecha_vencimiento}</p>
                  </div>
                  <div>
                    <p>{producto.tipo}</p>
                  </div>
                  <div>
                    <p>{producto.nombre_proveedor}</p>
                  </div>
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(producto.idprod)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(producto.idprod)}
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
