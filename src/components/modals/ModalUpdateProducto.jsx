import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";

const ModalupProducto = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setProductos,
  productos,
}) => {
  const [producto, setProducto] = useState({});

  const getDataUp = async (id_producto) => {
    try {
      const response = await fetch(
        `https://8086zfpm-3000.use.devtunnels.ms/producto/${id_producto}`,
        { headers: { "content-Type": "application/json" } }
      );
      const producto = await response.json();
      setProducto(producto);
      setProductoUP({
        id_producto: producto.id_producto,
        cod_prod: producto.cod_prod,
        cantidad: producto.cantidad,
        nombre_prod: producto.nombre_prod,
        peso_prod: producto.peso_prod,
        fechavencimiento: producto.fechavencimiento,
        descripcion_prod: producto.descripcion_prod
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
    id_producto: "",
    cod_prod:"",
    cantidad:"",
    nombre_prod: "",
    peso_prod: "",
    fechavencimiento: "",
    descripcion_prod: "",
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
        `https://8086zfpm-3000.use.devtunnels.ms/producto/${productoUP.id_producto}`,
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
          producto.id_producto === productoUP.id_producto ? productoUP : producto
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

  // ------------------------ FIN ACTUALIZAR USUARIO ---------------------------------

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
                  <label>Id: </label>
                  <input
                    // {...register("iduser")}
                    type="number"
                    id="id_producto"
                    placeholder="ID"
                    value={productoUP.id_producto}
                    name="id_producto"
                    onChange={(e) => onChangeData(e)}
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Codigo: </label>
                  <input
                    // {...register("nombre")}
                    value={productoUP.cod_prod}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="cod_prod"
                    placeholder="Codigo"
                  ></input>
                </div>


                <div className="itemUser">
                  <label>Cantidad: </label>
                  <input
                    // {...register("nombre")}
                    value={productoUP.cantidad}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="nombreUser"
                    name="cantidad"
                    placeholder="Cantidad"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Producto: </label>
                  <input
                    // {...register("nombre")}
                    value={productoUP.nombre_prod}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="nombre_prod"
                    placeholder="Producto"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Peso: </label>
                  <input
                    // {...register("telefono")}
                    value={productoUP.peso_prod}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="telefonoUser"
                    name="peso_prod"
                    placeholder="Peso_producto"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Vencimiento: </label>
                  <input
                    // {...register("email")}
                    value={productoUP.fechavencimiento}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="fechavencimiento"
                    placeholder="Vencimiento"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Descripcion: </label>
                  <input
                    // {...register("apellido")}
                    value={productoUP.descripcion_prod}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="cantidad"
                    placeholder="Descripcion"
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

export default ModalupProducto;

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
