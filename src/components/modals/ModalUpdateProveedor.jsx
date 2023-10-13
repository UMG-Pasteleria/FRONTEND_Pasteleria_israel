import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalupProiveedor = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
}) => {
  const [proveedor, setProveedor] = useState([]);

  const getDataUp = async (idprov) => {
    try {
      const response = await fetch(
        `http://localhost:3000/proveedores/${idprov}`,
        { headers: { "content-Type": "application/json" } }
      );
      const proveedor = await response.json();
      setProveedor(proveedor);
      setProveedroUP({
        idprov: proveedor.idprov,
        proveedor: proveedor.proveedor,
        nit: proveedor.nit,
        telefono: proveedor.telefono,
        email: proveedor.email,
        direccion: proveedor.direccion,
      });
      console.log(proveedor);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(proveedor);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [proveedorUP, setProveedroUP] = useState({
    idprov: "",
    proveedor: "",
    nit: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const onChangeData = (e) => {
    setProveedroUP({ ...proveedorUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(
        `http://localhost:3000/proveedores/${idprov}`,
        {
          method: "PUT",
          body: JSON.stringify(proveedorUP),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      //Si el servidor devuelve codigo 204 de confirmación
      //lanza alerta de guardado correctamente
      //   if (response.status === 204) {
      //     saveSweetalert();
      //   }
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
              <form className="nuevoUserForm" onSubmit={handleSubmit}>
                <div className="itemUser">
                  <label>id: </label>
                  <input
                    // {...register("iduser")}
                    type="text"
                    id="idUser"
                    placeholder="ID"
                    value={proveedorUP.idprov}
                    name="idprov"
                    onChange={(e) => onChangeData(e)}
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Proveedor: </label>
                  <input
                    // {...register("nombre")}
                    value={proveedorUP.proveedor}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="proveedor"
                    placeholder="Nombre"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>NIT: </label>
                  <input
                    // {...register("apellido")}
                    value={proveedorUP.nit}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="nit"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    // {...register("telefono")}
                    value={proveedorUP.telefono}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="telefonoUser"
                    name="telefono"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Correo: </label>
                  <input
                    // {...register("email")}
                    value={proveedorUP.email}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="email"
                    placeholder="Correo electronico"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>direccion: </label>
                  <input
                    // {...register("contrasenia")}
                    value={proveedorUP.direccion}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="passwordUser"
                    name="direccion"
                    placeholder="Contraseña"
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
                      onClick={() => cambiarEstado2(false)}
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

export default ModalupProiveedor;

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
