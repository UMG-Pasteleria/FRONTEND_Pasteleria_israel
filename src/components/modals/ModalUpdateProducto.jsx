import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";

const ModalupProduct = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setPasteles: setProductos,
  pasteles: productos,
}) => {
  const [producto, setProducto] = useState({});
  const URL = import.meta.env.VITE_URL;
  const getDataUp = async (idprod) => {
    try {
      const response = await fetch(URL + `producto/${idprod}`, {
        headers: { "content-Type": "application/json" },
      });
      const producto = await response.json();
      setProducto(producto);
      setProductoUP({
        idprod: producto.idprod,
        producto: producto.producto,
        descripcion: producto.descripcion,
        stock: producto.stock,
        fecha_vencimiento: producto.fecha_vencimiento,
        tipo: producto.tipo,
        nombre_proveedor: producto.nombre_proveedor,
      });
      console.log(producto);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(producto);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [productoUP, setProductoUP] = useState({
    idprod: "",
    producto: "",
    descripcion: "",
    stock: "",
    fecha_vencimiento: "",
    tipo: "",
    nombre_proveedor: "",
  });

  const onChangeData = (e) => {
    setProductoUP({ ...productoUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(
        `https://8086zfpm-3000.use.devtunnels.ms/producto/${productoUP.idprod}`,
        {
          method: "PUT",
          body: JSON.stringify(productoUP),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.json();
      console.log(data);
      console.log(response);
      setProductos(
        productos.map((producto) =>
          producto.idprod === productoUP.idprod ? productoUP : producto
        )
      );
      cambiarEstado2(false);
      //Si el servidor devuelve codigo 200 de confirmación
      //lanza alerta de guardado correctamente
      if (response.status === 200) {
        swal.fire({
          title: "Producto Actualizado!",
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
      } else {
        swal.fire({
          title: "Error al Actualizar!",
          icon: "error",
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
    } catch (error) {
      console.log(error.massage);
    }
  };

  //----------------------------------

  // ------------------------ FIN ACTUALIZAR PROVEEDOR ---------------------------------

  return (
    <>
      {estado2 && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>{titulo2}</h3>
            </EncabezadoModal>
            <BotonCerrar onClick={() => cambiarEstado2(false)}>
              <span className="material-symbols-outlined">close</span>
            </BotonCerrar>
            <div className="ContenedorEditarUsuario">
              <form className="nuevoUserForm">
                <div className="itemUser">
                  <label>id: </label>
                  <input
                    // {...register("iduser")}
                    type="text"
                    id="idprod"
                    placeholder="ID"
                    value={productoUP.idprod}
                    name="idprod"
                    onChange={(e) => onChangeData(e)}
                    disabled
                    selected
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Producto: </label>
                  <input
                    // {...register("nombre")}
                    value={productoUP.producto}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="producto"
                    name="producto"
                    placeholder="Producto"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Descripcion: </label>
                  <input
                    // {...register("apellido")}
                    value={productoUP.descripcion}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Stock: </label>
                  <input
                    // {...register("telefono")}
                    value={productoUP.stock}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Stock"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Fecha Vencimiento: </label>
                  <input
                    // {...register("email")}
                    value={productoUP.fecha_vencimiento}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="fecha_vencimiento"
                    name="fecha_vencimiento"
                    placeholder="Fecha Vencimiento"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Tipo: </label>
                  <input
                    // {...register("contrasenia")}
                    value={productoUP.tipo}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="tipo"
                    name="tipo"
                    placeholder="Tipo"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Proveedor: </label>
                  <input
                    // {...register("contrasenia")}
                    value={productoUP.nombre_proveedor}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombre_proveedor"
                    name="nombre_proveedor"
                    placeholder="Nombre Proveedor"
                  ></input>
                </div>

                <br />

                <div className="bonotesNewUser">
                  <div>
                    <button
                      type="button"
                      onClick={() => cambiarEstado2(false)}
                      className="btcancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btGuardar"
                      onClick={handleSubmit}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {children}
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalupProduct;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 98;
`;

const ContenedorModal = styled.div`
  width: 400px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  z-index: 99;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;
const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #e8e8e8;

  &:hover {
    background: #ff8a00;
    transition: 0.3s;
  }

  span {
    width: 100%;
    height: 100%;
  }
`;
