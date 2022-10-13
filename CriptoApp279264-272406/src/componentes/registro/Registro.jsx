import React from "react";
import "./registro.css";
import "../../index.css";
import { validarRegistro } from "./validar.js";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {
	let navigate = useNavigate();
	const urlBase = "https://crypto.develotion.com";
	const [deptos, setDeptos] = useState([]); // seteamos Array de departamentos vacia
	const [ciudades, setCiudades] = useState([]); // seteamos Array de ciudades

	/* const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
	const [idUsuario, setIdUsuario] = useState(localStorage.getItem("id")); */
	let apiKey = localStorage.getItem("apiKey");
	let idUsuario = localStorage.getItem("idUsuario");

	const verificarLogeado = () => {
		let userLogeado = false; // si es falso no hay nadie logeado
		if (apiKey != null && idUsuario != null) return true; // si es true ya hay alguien logeado
		return userLogeado;
	};

	const formRegistro = useRef(null);
	const funcionRegistro = (e) => {
		e.preventDefault();
		console.log(formRegistro);

		let valorInputUser = formRegistro.current[0].value;
		let valorInputPass = formRegistro.current[1].value;
		let valorInputPassConf = formRegistro.current[2].value;
		let valorInputDepto = formRegistro.current[3].value;
		let valorInputCiudad = formRegistro.current[4].value;
		if (
			validarRegistro(
				valorInputUser,
				valorInputPass,
				valorInputPassConf,
				valorInputDepto,
				valorInputCiudad
			)
		) {
			fetch(`${urlBase}/usuarios.php`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					usuario: valorInputUser,
					password: valorInputPass,
					idDepartamento: valorInputDepto, // obtenerDepartamento(idDepto);
					idCiudad: valorInputCiudad,
				}),
			})
				.then((respuesta) => respuesta.json())
				.then((datos) => {
					switch (datos.codigo) {
						case 200:
							console.log(datos);
							console.log(
								"Registro EXITOSO !!!"
							);
						  	navigate("/"); /* REDIRIGIMOS A LOGIN */
							break;
						case 409:
							console.log("Usuario existente!");
							console.log(datos.codigo);
							break;
						default:
							console.log(`Error por default ${datos.codigo}`);
					}
				});
		}

		/* ==== PASOS =====
		1) lo PRIMERO que tenemos que pedirle a la API son los DEPARATMENTOS
		2) Lo realizamos con un evento de onChange aplicado en select departamentos 
		vamos a ejecutar una funcion ejemplo traerCiudadesByDepto que
		va a pedirle a la api las CIUDADES que pertenecen a ese deperartamento.
		antes de este evento onChange, el input ciudades tiene que estar bloqueado,
		solo se va a desbloquear cuando la API devuelva las CIUDADES
		*/
	};

	useEffect(() => {
		if (verificarLogeado() === false) {
			/* FETCH DE DEPARTAMENTOS */
			fetch(`${urlBase}/departamentos.php`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((respuesta) => respuesta.json())
				.then((datos) => {
					switch (datos.codigo) {
						case 200:
							setDeptos(datos.departamentos);
							
							/*  .forEach(unDepartamento => {
						document.querySelector("#departamentos").innerHTML += `<option value=${unDepartamento.id}>${unDepartamento.nombre}</option>`;
					  });*/
							break;
						default:
							console.log(`Error por default ${datos.codigo}`);
					}
				});
		} else {
			/* si ya hay un user	 logeado, nunca lo dejamos entrar aca */
		}
	}, []);

	/* FUNCION PARA TRAER LOS DEPARTAMENTOS CUANDO SE EJECUTE EL ONCHANGE */
	const idDeptoSelect = useRef("Seleccione un Departamento"); // ref para el select de departamento
	const idCiudadSelect = useRef(null); // ref para el select de ciudad
	/* let idParaBuscarCiudades;
	const conseguirIDdpto = () => {
		idParaBuscarCiudades = idDeptoSelect.current.value;
		traerCiudadesByDepto();
		
	};
	 */
	const traerCiudadesByDepto = () => {
		let p = idDeptoSelect.current.value;
		fetch(`${urlBase}//ciudades.php?idDepartamento=${p}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((respuesta) => respuesta.json())
			.then((datos) => {
				switch (datos.codigo) {
					case 200:
						setCiudades(datos.ciudades);
						

						break;
					default:
						console.log(`Error por default ${datos.codigo}`);
				}
			});
	};

	return (
		<section>
			<div className='registro-container'>
			<h3>Registro</h3>
			<form onSubmit={funcionRegistro} ref={formRegistro}>
				<label>
					Usuario
					<input type='text' id='user' placeholder='Escriba su usuario' />
					<br />
					<small id='userError'></small>
				</label>
				<label>
					Password
					<input type='password' id='pass' placeholder='Escriba su password' />
					<br />
					<small id='passError'></small>
				</label>

				<label>
					Confirmar Password
					<input
						type='password'
						id='passConf'
						placeholder='Confirme su password'
						/>
					<br />
					<small id='passConfError'></small>
				</label>
				<label>
					Departamento
					{/* {posts.map(post => <option key={post.id} value={post.id}>{post.title}</option>)} */}
					<select
						onChange={traerCiudadesByDepto}
						name=''
						id='departamentos'
						defaultValue='Seleccione un Departamento'
						ref={idDeptoSelect}>
						<option disabled>Seleccione un Departamento</option>
						{deptos.map((dpto) => (
							<option key={dpto.id} value={dpto.id}>
								{dpto.nombre}
							</option>
						))}
					</select>
					<br />
					<small id='selDeptoError'></small>
				</label>

				<label>
					Ciudad
					<select
						name=''
						id='ciudad'
						defaultValue='Seleccione una ciudad'
						ref={idCiudadSelect}>
						<option disabled>Seleccione una ciudad</option>
						{ciudades.map((ciudad) => (
							<option key={ciudad.id} value={ciudad.id}>
								{ciudad.nombre}
							</option>
						))}
					</select>
					<br />
					<small id='selCiudadError'></small>
				</label>

				<div className='contenedor-botonP'>
					<button className='btn' type='submit'>
						Registrarse
					</button>
					<p>
						Ya tiene cuenta?
						<span>
							{/* <a href='./login.html' onClick={irARegistro}> Ingrese aqui</a> */}
							<Link to="/">Ingrese aqui</Link>
						</span>
					</p>
				</div>
			</form>
			</div>
		</section>
	);
};

export default Registro;
