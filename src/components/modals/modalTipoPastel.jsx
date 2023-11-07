import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import swal from "sweetalert2";
  
  const ModalTipoPast = ({
    estado,
    cambiarEstado,
    titulo,
    setTPasteles,
    tpasteles,
    URL,
  }) => {
    const { handleSubmit, register } = useForm();


  
    const enviarTPasteles = handleSubmit(async (data) => {
      try {
        const response = await fetch(URL + "tipo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        if (response.status === 200) {
          swal.fire({
            title: "Tipo Pastel Agregado!",
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
          setTPasteles([...tpasteles, data]);
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
            <div className="containerNewTPast">
              <form
                className="nuevoTPastForm"
                id="FormularioTP"
                onSubmit={enviarTPasteles}
              >
                <div className="itemTPast">
                  <label>Tipo pastel: </label>
                  <input
                    {...register("tipo_pastel")}
                    type="text"
                    id="tipo_pastel"
                    placeholder="Tipo pastel"
                  ></input>
                </div>

                <br />

                <div className="bonotesNewTPast">
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
                    {/* <button
                      type="submit"
                      className="btGuardar"
                      
                    > */}

                    <button type="submit" className="btGuardar"
                    onClick={() => cambiarEstado(false)}>
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

export default ModalTipoPast;

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
  z-index: 95;
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
