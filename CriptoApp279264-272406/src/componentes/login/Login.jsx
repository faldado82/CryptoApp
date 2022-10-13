import React from "react";
import "./login.css";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
// import { validarLogin } from '../registro/validar.js';

/* import { mostrarRegistro } from '../../App.js'; */
import { useState, useRef } from "react";

const Login = () => {
	let navigate = useNavigate();
	const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey")); 
	const [idUsuario, setIdUsuario] = useState(localStorage.getItem("id"));
	const verificarLogeado = () => {
		let userLogeado = false; // si es falso no hay nadie logeado
		if (apiKey != null && idUsuario != null) return true; // si es true ya hay alguien logeado
		return userLogeado;
	};
	let formLog = useRef(null);
	// =================== TOMAR TEXTO
	const tomarTextoYLogear = e => {
		e.preventDefault();

		if (verificarLogeado() === false) {
			let valorInputUser = formLog.current[0].value;
			let valorInputPass = formLog.current[1].value;

			fetch(`https://crypto.develotion.com/login.php`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					usuario: valorInputUser,
					password: valorInputPass,
				}),
			})
				.then(respuesta => respuesta.json())
				.then(datos => {
					switch (datos.codigo) {
						case 200:
							if (!localStorage.getItem("apiKey")) {
								setApiKey(
									localStorage.setItem("apiKey", datos.apiKey)
								);
								setIdUsuario(
									localStorage.setItem("id", datos.id)
								);
								navigate("/dashboard");
							}
							console.log(datos);
							break;
						case 409:
							console.log("Verifique datos");
							break;
						default:
							console.log(`Error por default ${datos.codigo}`);
					}
				});
		} else {
			alert("YA HAY UN USUARIO LOGUEADO");
		}
	};

	return (
		<section >
			<div className='contenedor-login'>
			<h3> Iniciar Sesión</h3>

			<form onSubmit={tomarTextoYLogear} ref={formLog}>
				<label>
					Usuario
					<input
						type='text'
						id='user'
						placeholder='Ingrese su usuario'
						// value="fran2"
						// value="guille27"
						/>
					<br />
				</label>
				<small id='userError'></small>
				<label>
					Contraseña
					<input
						type='password'
						id='pass'
						placeholder='Ingrese su password'
						// value="1234"
						/>
					<br />
				</label>
				<small id='passError'></small>
				{/* onClick={validarLogin}  */}

				<div className='contbutonp'>
					<input type='submit'  className='btn' value='Ingresar' />
					<p>
						No tiene usuario aún? <Link to="/register">Registrarse</Link>
					</p>
				</div>
			</form>
			</div>
		</section>
	);
};

export default Login;
