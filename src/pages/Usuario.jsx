import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/usuarios.css";
import Modal from "../components/modals/modalUsuario";
import { useForm } from "react-hook-form";

const Usuario = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [usuario, setUsuario] = useState([]);

  const URL = "http://localhost:3000/usuario";

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setUsuario(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO USUARIO------//
  const { handleSubmit, register } = useForm();
  const enviarUsuario = handleSubmit((data) => {
    console.log(data);
    fetch("http://localhost:3000/usuario", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  return (
    <>
      <Navbar />
      <body className="bodyUser">
        <div className="ContainerU"></div>
        <div className="Usuarios">
          <br></br>
          <h2>Usuarios</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO USUARIO-------------- */}
          <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}>
            <div className="containerNewUSer">
              <form className="nuevoUserForm" onSubmit={enviarUsuario}>
                <div className="itemUser">
                  <label>Nombre: </label>
                  <input
                    {...register("nombre")}
                    type="text"
                    id="nombreUser"
                    placeholder="Nombre"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Apellido: </label>
                  <input
                    {...register("apellido")}
                    type="text"
                    id="apellidoUser"
                    placeholder="Apellido"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono")}
                    type="number"
                    id="telefonoUser"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Correo: </label>
                  <input
                    {...register("email")}
                    type="text"
                    id="emailUser"
                    placeholder="Correo electronico"
                  ></input>
                </div>
                <br />

                <div className="bonotesNewUser">
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
          </Modal>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO USUARIO ------------------ */}
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
                  placeholder="Buscar usuario"
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
            <button>
              <span className="material-symbols-outlined">calendar_month</span>
            </button>
          </div>

          <hr></hr>
          <table className="tablaRes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Accion</th>
                {/* <th scope="col">Correo</th> */}
              </tr>
            </thead>
            <tbody className="fila">
              {usuario.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.iduser}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  {/* <td>{usuario.telefono}</td>
                <td>{usuario.email}</td> */}
                  <td>
                    <button className="btEditar">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="btEditar">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </>
  );
};

export default Usuario;
