import "../styles/login.css";
import logo from "../assets/04.jpg";
import { Link, useNavigate } from "react-router-dom";
//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";
function Login() {
  const { handleSubmit, register } = useForm();
  const enviarLogin = handleSubmit((data) => {
    console.log(data);
  });

  const navegate = useNavigate();

  return (
    <>
      <div className="bodyLogin">
        <div className="login-box">
          <img src={logo} className="logoLogin" />
          <h1>Iniciar sesion</h1>
          <br></br>
          <form onSubmit={enviarLogin}>
            <label htmlFor="username"></label>
            <input
              {...register("usuario")}
              type="text"
              id="nombre"
              placeholder="Usuario"
              className="input1"
            />

            <label htmlFor="password"></label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="contraseña"
              className="input1"
            />

            <div className="botones">
              <button
                type="submit"
                className="BTenviar"
                onClick={() => navegate("/Inicio")}
              >
                Iniciar sesión
              </button>
              <br></br>
              <button type="button" className="registrar">
                Registrarse
              </button>
            </div>
            <br></br>
            <a href="#">¿has olvidado la Contraseña?</a>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
