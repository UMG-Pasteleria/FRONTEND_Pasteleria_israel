import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";

const ModalupPastel = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setPasteles,
  pasteles,
}) => {
  const [pastel, setPastel] = useState({});
  const URL = import.meta.env.VITE_URL;
  const getDataUp = async (idpastel) => {
    try {
      const response = await fetch(URL + `pastel/${idpastel}`, {
        headers: { "content-Type": "application/json" },
      });
      const pastel = await response.json();
      setPastel(pastel);
      setPasteloUP({
        idpastel: pastel.idpastel,
        pastel: pastel.pastel,
        precio: pastel.precio,
        tamanio_idpast: pastel.tamanio_idpast,
        dec_idpast: pastel.dec_idpast,
        cat_idpast: pastel.cat_idpast,
      });
      console.log(pastel);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(pastel);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [pastelUP, setPasteloUP] = useState({
    idpastel: "",
    pastel: "",
    precio: "",
    tamanio_idpast: "",
    dec_idpast: "",
    cat_idpast: "",
  });

  const onChangeData = (e) => {
    setPasteloUP({ ...pastelUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(URL + `pastel/${pastelUP.idpastel}`, {
        method: "PUT",
        body: JSON.stringify(pastelUP),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      console.log(data);
      console.log(response);
      setPasteles(
        pasteles.map((pastel) =>
          pastel.idpastel === pastelUP.idpastel ? pastelUP : pastel
        )
      );
      cambiarEstado2(false);
      //Si el servidor devuelve codigo 200 de confirmación
      //lanza alerta de guardado correctamente
      if (response.status === 200) {
        swal.fire({
          title: "Pastel Actualizado!",
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
                    id="idpastel"
                    placeholder="ID"
                    value={pastelUP.idpastel}
                    name="idpastel"
                    onChange={(e) => onChangeData(e)}
                    disabled
                    selected
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Pastel: </label>
                  <input
                    // {...register("nombre")}
                    value={pastelUP.pastel}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="pastel"
                    name="pastel"
                    placeholder="Pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Precio: </label>
                  <input
                    // {...register("apellido")}
                    value={pastelUP.precio}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Precio"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Tamaño del Pastel: </label>
                  <input
                    // {...register("telefono")}
                    value={pastelUP.tamanio_idpast}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="tamanio_idpast"
                    name="tamanio_idpast"
                    placeholder="Tamaño del pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Decoracion del Pastel: </label>
                  <input
                    // {...register("email")}
                    value={pastelUP.dec_idpast}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="dec_idpast"
                    name="dec_idpast"
                    placeholder="Decoracion del pastel"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Categoria del pastel: </label>
                  <input
                    // {...register("contrasenia")}
                    value={pastelUP.cat_idpast}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="cat_idpast"
                    name="cat_idpast"
                    placeholder="Categoria del pastel"
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

export default ModalupPastel;

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
