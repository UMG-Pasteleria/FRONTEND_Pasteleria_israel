import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";

const ModalupTipoPastel = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setTPasteles,
  tpasteles,
}) => {
  const [tpastel, setTPastel] = useState([]);

  const getDataUp = async (idtpastel) => {
    try {
      const response = await fetch(
        `https://8086zfpm-3000.use.devtunnels.ms/tipo_cliente/${idtpastel}`,
        { headers: { "content-Type": "application/json" } }
      );
      const tpastel = await response.json();
      setTPastel(tpastel);
      setTPasteloUP({
        idtpastel: tpastel.idtpastel,
        tipo_pastel: tpastel.tipo_pastel,
      
      });
      console.log(tpastel);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(tpastel);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [tpastelUP, setTPasteloUP] = useState({
    idtpastel: "",
    tipo_pastel: "",
   
    
  });

  const onChangeData = (e) => {
    setTPasteloUP({ ...tpastelUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(
        `https://8086zfpm-3000.use.devtunnels.ms/tipo_cliente/${tpastelUP.idtpastel}`,
        {
          method: "PUT",
          body: JSON.stringify(tpastelUP),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      setTPasteles(
        tpasteles.map((tpastel) =>
          tpastel.idtpastel === tpastelUP.idtpastel ? tpastelUP : tpastel
        )
      );
      cambiarEstado2(false);
      //Si el servidor devuelve codigo 200 de confirmación
      //lanza alerta de guardado correctamente
      if (response.status === 200) {
        swal.fire({
          title: "Tipo De Pastel Actualizado!",
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

  // ------------------------ FIN ACTUALIZAR CLIENTE ---------------------------------

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
                    id="idtpastel"
                    placeholder="ID"
                    value={tpastelUP.idtpastel}
                    name="idtpastel"
                    onChange={(e) => onChangeData(e)}
                    disabled selected
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Tipo Pastel: </label>
                  <input
                    // {...register("nombre")}
                    value={tpastelUP.tipo_pastel}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="tipo_pastel"
                    name="tipo_pastel"
                    placeholder="Tipo de pastel"
                  ></input>
                </div>

                {/* <div className="itemUser">
                  <label>NIT: </label>
                  <input
                    // {...register("apellido")}
                    value={tclienteUP.nit_cl}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nit_cl"
                    name="nit_cl"
                    placeholder="NIT"
                  ></input>
                </div> */}

                {/* <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    // {...register("telefono")}
                    value={tclienteUP.telefono_cl}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="telefono_cl"
                    name="telefono_cl"
                    placeholder="Telefono"
                  ></input>
                </div> */}

                {/* <div className="itemUser">
                  <label>Direccion: </label>
                  <input
                    // {...register("email")}
                    value={tclienteUP.direccion_cl} 
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="direccion_cl"
                    name="direccion_cl"
                    placeholder="Direccion"
                  ></input>
                </div> */}

                {/* <div className="itemUser">
                  <label>Tipo cliente: </label>
                  <input
                    // {...register("contrasenia")}
                    value={tclienteUP.idtcl} //id tabla tipo_cliente
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="idtcl"
                    name="idtcl"
                    placeholder="Tipo cliente"
                  ></input>
                </div> */}

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

export default ModalupTipoPastel;

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
