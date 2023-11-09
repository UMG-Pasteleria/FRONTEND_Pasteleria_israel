import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";

const ModalCli = ({
  estado,
  cambiarEstado,
  titulo,
  setClientes,
  clientes,
  URL,
}) => {
  const { handleSubmit, register } = useForm();

  const [tclientes, setTClientes] = useState([]);
  //--------------- OBTENER DATOS DE CLIENTES -----------------//

  const getData = async () => {
    try {
      const response = await fetch(URL + "tipo_cliente");
      const tipoData = await response.json();
      setTClientes(tipoData);
      console.log(tipoData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const enviarCliente = handleSubmit(async (data) => {
    try {
      const response = await fetch(URL + "cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        swal.fire({
          title: "Cliente Agregado!",
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

        // Optionally update your clients state or perform other actions
        setClientes([...clientes, data]);
      } else {
        swal.fire({
          title: "Error al Agregar",
          icon: "error",
          text: `${response.status}`,
          showConfirmButton: false,
          timer: 1500,
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
      console.error("Error:", error);
    }
    getData();
    cambiarEstado(false);
  });

  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>{titulo}</h3>
            </EncabezadoModal>
            <BotonCerrar onClick={() => cambiarEstado(false)}>
              <span className="material-symbols-outlined">close</span>
            </BotonCerrar>

            <div className="containerNewClient">
              <form
                className="nuevoClientForm"
                id="FormularioC"
                onSubmit={enviarCliente}
              >
                <div className="itemClient">
                  <label>NIT: </label>
                  <input
                    {...register("nit_cl")}
                    type="number"
                    id="nit_cl"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemClient">
                  <label>Cliente: </label>
                  <input
                    {...register("nombre_cl")}
                    type="text"
                    id="nombre_cl"
                    placeholder="Cliente"
                  ></input>
                </div>

                <div className="itemClient">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_cl")}
                    type="number"
                    id="telefono_cl"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemClient">
                  <label>Direccion: </label>
                  <input
                    {...register("direccion_cl")}
                    type="text"
                    id="direccion_cl"
                    placeholder="Direccion"
                  ></input>

                  <div className="itemClient">
                    <label>Tipo Cliente: </label>

                    <select
                      className="selector"
                      {...register("tipo_idtclient")}
                      id="tipo_idtclient"
                    >
                      <option disabled selected>
                        Seleccione tipo de cliente
                      </option>
                      {tclientes.map((tipoData, index) => (
                        <option
                          className="opciones"
                          key={index}
                          Value={tipoData.idtcl}
                        >
                          {tipoData.tipo_cl}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <br />

                <div className="bonotesNewClient">
                  <div>
                    <button
                      type="button"
                      onClick={() => cambiarEstado(false)}
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
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalCli;

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
  z-index: 105;
`;

const ContenedorModal = styled.div`
  width: 400px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  z-index: 106;
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
