import { useState } from "react";
import styled from "styled-components";

function ModalEditUser({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idUserEdit,
}) {
  // Estados
  const [modale, setModal] = useState(false);

  // Traemos el token para las peticion

  const toggle = () => setModal(!modale);

  const [usuario, setUsuario] = useState([]);

  const getDataUp = async (iduser) => {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${iduser}`, {
        headers: { "content-Type": "application/json" },
      });
      const json = await response.json();
      setUsuario(json);
      setUserUP({
        iduser: json.iduser,
        nombre: json.nombre,
        apellido: json.apellido,
        telefono: json.telefono,
        email: json.email,
        contrasenia: json.contrasenia,
      });
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(idUserEdit);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [userUP, setUserUP] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    contrasenia: "",
  });

  const onChangeData = (e) => {
    setUserUP({ ...userUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario
  const onSubmitForm = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(`http://localhost:3000/usuario/${iduser}`, {
        method: "PUT",
        body: JSON.stringify(userUP),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      console.log(response);
    } catch (error) {
      console.log(error.massage);
    }
  };

  return (
    <>
      <button
        className="btEditarU"
        onClick={() => {
          toggle();
          getDataUp(idUserEdit);
        }}
      >
        <span className="material-symbols-outlined">edit</span>
      </button>
      {modale && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>Actializar usaurio</h3>
            </EncabezadoModal>
            <BotonCerrar onClick={() => toggle()}>
              <span className="material-symbols-outlined">close</span>
            </BotonCerrar>
            <div className="ContenedorEditarUsuario">
              <form onSubmit={(e) => onSubmitForm(e)} className="nuevoUserForm">
                <div className="itemUser">
                  <label>id: </label>
                  <input
                    // {...register("iduser")}
                    type="text"
                    id="idUser"
                    placeholder="ID"
                    name="iduser"
                    value={userUP.iduser}
                    onChange={(e) => onChangeData(e)}
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Nombre: </label>
                  <input
                    // {...register("nombre")}
                    value={userUP.nombre}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="nombre"
                    placeholder="Nombre"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Apellido: </label>
                  <input
                    // {...register("apellido")}
                    value={userUP.apellido}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="apellido"
                    placeholder="Apellido"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    // {...register("telefono")}
                    value={userUP.telefono}
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
                    value={userUP.email}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="email"
                    placeholder="Correo electronico"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Contraeña: </label>
                  <input
                    // {...register("contrasenia")}
                    value={userUP.contrasenia}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="passwordUser"
                    name="contrasenia"
                    placeholder="Contraseña"
                  ></input>
                </div>

                <br />

                <div className="bonotesNewUser">
                  <div>
                    <button
                      type="button"
                      onClick={() => toggle()}
                      className="btcancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btGuardar"
                      onClick={() => toggle()}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
}

export default ModalEditUser;

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
