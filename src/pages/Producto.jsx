import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ModalProd from "../components/modals/modalProducto";
import ModalupProducto from "../components/modals/ModalUpdateProducto";
import Navbar from "../components/navbar";
import SidebarCompras from "../components/sidebarCompras";
import swal from "sweetalert2";
import avatar from "../assets/avatar.jpg";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/proveedores.css";
import "../styles/productos.css";

const Producto = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  const [productos, setProductos] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/producto";

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setProductos(json);
      console.log(json);
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
      (document.getElementById("cod_prod").value = null),
      (document.getElementById("cantidad").value = null),
      (document.getElementById("nombre_prod").value = null),
      (document.getElementById("peso_prod").value = null),
      (document.getElementById("fechavencimiento").value = null),
      (document.getElementById("descripcion_prod").value = null);
  });

  //-----------------ELIMINAR PRODUCTO---------------------------------

  const handleDelete = async (id_producto) => {
    const res = await fetch(`https://8086zfpm-3000.use.devtunnels.ms/producto/${id_producto}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setProductos(
      productos.filter((producto) => producto.id_producto !== id_producto)
    );
  };

  //------------------------------------FIN ELIMINA PROVEEDOR -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (id_producto) => {
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
          handleDelete(id_producto);

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
  //--------------------------------- EDITAR PRODUCTO ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR PRODUCTO ----------------------------------//

  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <>
      <Navbar />
      <SidebarCompras />
      <div className="bodyProd">
        <div className="ContainerProd"></div>
        <div className="Productos">
          <br></br>
          <h2>Listado de Productos</h2>
          <br></br>
          {
          
          
          /* ------------------- MODAL AGREGAR NUEVO PRODUCTO-------------- */}
          
          
          <ModalProd
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
                  <label>Codigo: </label>
                  <input
                    {...register("cod_prod")}
                    type="text"
                    id="cod_prod"
                    placeholder="Codigo"
                  ></input>
                </div>               


                <div className="itemProd">
                  <label>Cantidad: </label>
                  <input
                    {...register("cantidad")}
                    type="text"
                    id="cantidad"
                    placeholder="Cantidad"
                  ></input>
                </div>

                <div className="itemProd">
                  <label>Nombre: </label>
                  <input
                    {...register("nombre_prod")}
                    type="text"
                    id="nombre_prod"
                    placeholder="Nombre"
                  ></input>
                </div>


                <div className="itemProd">
                  <label>Peso: </label>
                  <input
                    {...register("peso_prod")}
                    type="text"
                    id="peso_prod"
                    placeholder="Peso"
                  ></input>
                </div>

                <div className="itemProd">
                  <label>Vencimiento: </label>
                  <input
                    {...register("fechavencimiento")}
                    type="text"
                    id="fechavencimiento"
                    placeholder="Vencimeinto"
                  ></input>
                </div>
                  
                <div className="itemProd">
                  <label>Descripcion: </label>
                  <input
                    {...register("descripcion_prod")}
                    type="text"
                    id="descripcion_prod"
                    placeholder="Descripcion"
                  ></input>
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
          </ModalProd>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PRODUCTO ------------------ */}

          {/* ------------------- MODAL EDITAR  PRODUCTO-------------- */}

          <ModalupProducto
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar producto"}
            idEdit={idEdit}
            setProductos={setProductos}
            productos={productos}
          ></ModalupProducto>



          {/* --------------------------- FIN MODAL EDITAR PROVEEDOR ------------------ */}

          {/* //----------------------------------ELIMINAR PROVEEDOR ----------------------------------*/}

          <div className="centrarControles">
            <div className="controlesUsuario">
              <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                <span className="material-symbols-outlined">person_add</span>
              </button>

              <div className="busqueda">
                <form
                 
                  method="get"
                  className="cuadroBusqueda"
                >
                  <input
                    type="text"
                    placeholder="Buscar producto"
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
          <div className="productoMovil">
            {productos.map((producto, index) => (
              <div className="ContenedorProductos" key={index}>
                <div className="imgPerfil">
                  <div className="productopID">
                    <p>ID</p>
                    <span>{producto.id_producto}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(producto.id_producto)
                    }
                  />
                </div>

                <div
                  className="datoProducto"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(producto.id_producto)
                  }
                >
                  <div>
                    <h3>{producto.cod_prod}</h3>
                  </div>
                  <div>
                    <h3>{producto.cantidad}</h3>
                  </div>
                  <div>
                    <h3>{producto.nombre_prod}</h3>
                  </div>
                  <div>
                    <h5>{producto.peso_prod}</h5>
                  </div>
                  <div>
                    <h5>{producto.fechavencimiento}</h5>
                  </div>
                  <div>
                    <p>Telefono: {producto.descripcion_prod}</p>
                  </div>
                </div>
                <div className="controlBtP">
                  <button className="btEditarU" onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(producto.id_producto)
                    }>
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
          <div className="productoEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>ID: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Codigo: </h3>
                </div>
                <div className="encD">
                  <h3>Cantidad: </h3>
                </div>
                <div className="encD">
                  <h3>Producto: </h3>
                </div>
                <div className="encD">
                  <h3>Peso: </h3>
                </div>
                <div className="encD">
                  <h3>Vencimiento: </h3>
                </div>
                <div className="encD">
                  <h3>Decripcion: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {productos.map((producto, index) => (
              <div className="ContenedorProductos" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{producto.id_producto}</span>
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
                    <h3>{producto.id_producto}</h3>
                  </div>
                  <div>
                    <p>{producto.cod_prod}</p>
                  </div>
                  <div>
                    <p>{producto.cantidad}</p>
                  </div>
                  <div>
                    <h5>{producto.nombre_prod}</h5>
                  </div>
                  <div>
                    <p>{producto.peso_prod}</p>
                  </div>
                  <div>
                    <p>{producto.fechavencimiento}</p>
                  </div>
                  <div>
                    <p>{producto.descripcion_prod}</p>
                  </div>
                  
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(producto.id_producto)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(producto.id_producto)}
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

export default Producto;
