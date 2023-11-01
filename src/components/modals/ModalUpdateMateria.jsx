// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useForm } from "react-hook-form";
// import swal from "sweetalert2";

// const ModalupMateria = ({
//   children,
//   estado2,
//   cambiarEstado2,
//   titulo2,
//   idEdit,
//   setMaterias,
//   materias,
// }) => {
//   const [materias, setMateria] = useState({});

//   const getDataUp = async (id_mateprima) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/materias/${id_mateprima}`,
//         { headers: { "content-Type": "application/json" } }
//       );
//       const mate_prima = await response.json();
//       setMateria(mate_prima);
//       setMateriaUP({
//         id_mateprima: mate_prima.id_mateprima,
//         producto: mate_prima.producto,
//         cantidad: mate_prima.cantidad,
//         marca: mate_prima.marca,
//         precio: mate_prima.precio,
//         fechavencimiento: mate_prima.fechavencimiento,
//         observacion: mate_prima.observacion,
//         categoria: mate_prima.categoria,

//       });
//       console.log(mate_prima);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   console.log(mate_prima);
//   useEffect(() => {
//     if (idEdit) {
//       getDataUp(idEdit);
//     }
//   }, [idEdit]);

//   //-------------capurar datos de actualizadcoin de usuario-------------------

//   const [materiaUP, setMateriaUP] = useState({
//     id_mateprima: "",
//     producto: "",
//     cantidad: "",
//     marca: "",
//     precio: "",
//     fechavencimiento: "",
//     observacion: "",
//     categoria:"",

//   });

//   const onChangeData = (e) => {
//     setMateriaUP({ ...materiaUP, [e.target.name]: e.target.value });
//     console.log(e.target.name, e.target.value);
//   };

//   //----------------------Evento de envio del formulario

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //console.log(dataProduct);

//     try {
//       const response = await fetch(
//         `http://localhost:3000/materias/${materiaUP.id_mateprima}`,
//         {
//           method: "PUT",
//           body: JSON.stringify(materiaUP),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = response.json();
//       console.log(data);
//       console.log(response);
//       setMaterias(
//         materias.map((mate_prima) =>
//           mate_prima.id_mateprima === materiaUP.id_mateprima ? materiaUP : mate_prima
//         )
//       );
//       cambiarEstado2(false);
//       //Si el servidor devuelve codigo 200 de confirmación
//       //lanza alerta de guardado correctamente
//       if (response.status === 200) {
//         swal.fire({
//           title: "Producto Actualizado!",
//           icon: "success",
//           showConfirmButton: false,
//           timer: 1200,
//           customClass: {
//             confirmButton: "btEliminar",
//             cancelButton: "btCancelar",
//             popup: "popus-eliminado",
//             title: "titulo-pop",
//             container: "contenedor-alert",
//           },
//         });
//       } else {
//         swal.fire({
//           title: "Error al Actualizar!",
//           icon: "error",
//           showConfirmButton: false,
//           timer: 1200,
//           customClass: {
//             confirmButton: "btEliminar",
//             cancelButton: "btCancelar",
//             popup: "popus-eliminado",
//             title: "titulo-pop",
//             container: "contenedor-alert",
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error.massage);
//     }
//   };

//   //----------------------------------

//   // ------------------------ FIN ACTUALIZAR USUARIO ---------------------------------

//   return (
//     <>
//       {estado2 && (
//         <Overlay>
//           <ContenedorModal>
//             <EncabezadoModal>
//               <h3>{titulo2}</h3>
//             </EncabezadoModal>
//             <BotonCerrar onClick={() => cambiarEstado2(false)}>
//               <span className="material-symbols-outlined">close</span>
//             </BotonCerrar>
//             <div className="ContenedorEditarUsuario">
//               <form className="nuevoUserForm">
//                 <div className="itemUser">
//                   <label>id: </label>
//                   <input
//                     // {...register("iduser")}
//                     type="text"
//                     id="idUser"
//                     placeholder="ID"
//                     value={materiaUP.id_mateprima}
//                     name="id_mateprima"
//                     onChange={(e) => onChangeData(e)}
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Producto: </label>
//                   <input
//                     // {...register("nombre")}
//                     value={materiaUP.producto}
//                     onChange={(e) => onChangeData(e)}
//                     type="text"
//                     id="nombreUser"
//                     name="producto"
//                     placeholder="Nombre"
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Cantidad: </label>
//                   <input
//                     // {...register("apellido")}
//                     value={materiaUP.cantidad}
//                     onChange={(e) => onChangeData(e)}
//                     type="text"
//                     id="apellidoUser"
//                     name="cantidad"
//                     placeholder="NIT"
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Marca: </label>
//                   <input
//                     // {...register("telefono")}
//                     value={materiaUP.marca}
//                     onChange={(e) => onChangeData(e)}
//                     type="number"
//                     id="telefonoUser"
//                     name="marca"
//                     placeholder="marca"
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Precio: </label>
//                   <input
//                     // {...register("email")}
//                     value={materiaUP.precio}
//                     onChange={(e) => onChangeData(e)}
//                     type="text"
//                     id="emailUser"
//                     name="precio"
//                     placeholder="precio"
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Vencimiento: </label>
//                   <input
//                     // {...register("contrasenia")}
//                     value={materiaUP.fechavencimiento}
//                     onChange={(e) => onChangeData(e)}
//                     type="text"
//                     id="passwordUser"
//                     name="fechavencimiento"
//                     placeholder="Contraseña"
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Observacion: </label>
//                   <input
//                     // {...register("contrasenia")}
//                     value={materiaUP.observacion}
//                     onChange={(e) => onChangeData(e)}
//                     type="text"
//                     id="passwordUser"
//                     name="observacion"
//                     placeholder="Contraseña"
//                   ></input>
//                 </div>

//                 <div className="itemUser">
//                   <label>Categoria: </label>
//                   <input
//                     // {...register("contrasenia")}
//                     value={materiaUP.categoria}
//                     onChange={(e) => onChangeData(e)}
//                     type="text"
//                     id="passwordUser"
//                     name="categoria"
//                     placeholder="Contraseña"
//                   ></input>
//                 </div>

//                 <br />

//                 <div className="bonotesNewUser">
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() => cambiarEstado2(false)}
//                       className="btcancelar"
//                     >
//                       Cancelar
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       type="submit"
//                       className="btGuardar"
//                       onClick={handleSubmit}
//                     >
//                       Guardar
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//             {children}
//           </ContenedorModal>
//         </Overlay>
//       )}
//     </>
//   );
// };

// export default ModalupMateria;

// const Overlay = styled.div`
//   width: 100vw;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background: rgba(0, 0, 0, 0.5);
//   padding: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 98;
// `;

// const ContenedorModal = styled.div`
//   width: 400px;
//   min-height: 100px;
//   background: #fff;
//   position: relative;
//   border-radius: 15px;
//   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//   padding: 20px;
//   z-index: 99;
// `;

// const EncabezadoModal = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 20px;
//   padding-bottom: 20px;
//   border-bottom: 1px solid #e8e8e8;
// `;
// const BotonCerrar = styled.button`
//   position: absolute;
//   top: 15px;
//   right: 20px;
//   align-items: center;
//   width: 30px;
//   height: 30px;
//   border: none;
//   background: none;
//   cursor: pointer;
//   transition: 0.3s ease all;
//   border-radius: 5px;
//   color: #e8e8e8;

//   &:hover {
//     background: #ff8a00;
//     transition: 0.3s;
//   }

//   span {
//     width: 100%;
//     height: 100%;
//   }
// `;
