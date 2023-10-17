import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalupClient = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
}) => {
  const [cliente, setCliente] = useState([]);

  const getDataUp = async (idclient) => {
    try {
      const response = await fetch(
        `http://localhost:3000/clientes/${idclient}`,
        { headers: { "content-Type": "application/json" } }
      );
      const cliente = await response.json();
      setCliente(cliente);
      setClienteoUP({
        idclient: cliente.idclient,
        nombre_client: cliente.nombre_client,
        nit_client: cliente.nit_client,
        telefono_client: cliente.telefono_client,
        correo_client: cliente.correo_client,
        direccion_client: cliente.direccion_client,
      });
      console.log(cliente);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(cliente);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [clienteUP, setClienteoUP] = useState({
    idclient: "",
    nombre_client: "",
    nit_client: "",
    telefono_client: "",
    correo_client: "",
    direccion_client: "",
  });

  const onChangeData = (e) => {
    setClienteoUP({ ...clienteUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(
        `http://localhost:3000/clientes/${idclient}`,
        {
          method: "PUT",
          body: JSON.stringify(clienteUP),
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
                    value={clienteUP.idclient}
                    name="idclient"
                    onChange={(e) => onChangeData(e)}
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Cliente: </label>
                  <input
                    // {...register("nombre")}
                    value={clienteUP.nombre_client}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="nombre_client"
                    placeholder="Nombre"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>NIT: </label>
                  <input
                    // {...register("apellido")}
                    value={clienteUP.nit_client}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="nit_client"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    // {...register("telefono")}
                    value={clienteUP.telefono_client}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="telefonoUser"
                    name="telefono_client"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Correo: </label>
                  <input
                    // {...register("email")}
                    value={clienteUP.correo_client}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="correo_client"
                    placeholder="Correo electronico"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>direccion: </label>
                  <input
                    // {...register("contrasenia")}
                    value={clienteUP.direccion_pr}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="passwordUser"
                    name="direccion_client"
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

export default ModalupClient;

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
