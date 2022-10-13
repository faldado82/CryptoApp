import React from "react";
import "./formOp.css";
// import "../../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { agregarTransacciones } from '../../../features/transaccionesSlice.js';

const FormOp = () => {
    const urlBase = "https://crypto.develotion.com";
	const monedas = useSelector((state) => state.monedasStore.monedas);
	const [valorMoneda, setValorMoneda] = useState("---");
	const asignarValorMoneda = () => {
		const monedaid = selectMoneda.current.value;
		const indexMoneda = monedas.findIndex((m) => m.id == monedaid);
		const coti = monedas[indexMoneda].cotizacion;
		setValorMoneda(coti);
	};

    const dispatch = useDispatch();

	const selectMoneda = useRef(null);
	const inputValorMoneda = useRef(null);
	const formTrn = useRef(null);
	const funcionAltaTRN = (e) => {
		e.preventDefault();
		/* console.log(formTrn);
		console.log(formTrn.current[0].value); // tipo operacion 1 o 2
		console.log(formTrn.current[1].value); // id moneda
		console.log(formTrn.current[2].value); // valor de moneda
		console.log(formTrn.current[3].value); // unidades
 */
		const tipoOp = formTrn.current[0].value; // tipo operacion 1 o 2
		const idMon = formTrn.current[1].value; // id moneda
		const valorMon = formTrn.current[2].value; // valor de moneda
		const unidades = formTrn.current[3].value; // unidades
		if( tipoOp !== "Seleccione una operación..." && 
			idMon !== "Seleccione una moneda..." && 
			valorMon !== "---" && 
			unidades > 0){

		fetch(`${urlBase}/transacciones.php`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apiKey: localStorage.getItem("apiKey"),
			},
			body: JSON.stringify({
				idUsuario: localStorage.getItem("id"),
				tipoOperacion: tipoOp,
				moneda: idMon,
				cantidad: unidades,
				valorActual: valorMon,
			}),
		})
			.then((respuesta) => respuesta.json())
			.then((datos) => {
				switch (datos.codigo) {
					case 200:
						console.log(datos);
							/* console.log("NUEVA OPERACION");
							console.log(tipoOp);
							if(tipoOp == 1){
								tipoOp = 2;
							}else if(tipoOp ==2){
								tipoOp = 1;
							} */
							let nuevaTRN = {
								id: datos.idTransaccion,
								tipo_operacion: Number(tipoOp),
								moneda: idMon,
								valor_actual: valorMon,
								cantidad: unidades}
								console.log(nuevaTRN);
								
								dispatch(agregarTransacciones(nuevaTRN));
								formTrn.current[0].value = "Seleccione una operación..."; // tipo operacion 1 o 2
								formTrn.current[1].value = "Seleccione una moneda..."; // id moneda
								formTrn.current[2].value = ""; // valor de moneda
								formTrn.current[3].value = ""; // unidades
						break;
					case 409:
						alert("Verifique datos");
						break;
					case 401:
						alert("No tiene permisos");
						break;
					default:
						console.log(`Error por default ${datos.codigo}`);
				}
			});
		}
	};
	return (
		<section id='form' className='section-form-contenedor'>
			<h3>Realizar operacion</h3>
			<form id='divFormTRN' onSubmit={funcionAltaTRN} ref={formTrn}>
				<label>
					Operación
					<select
						id='selectTransaccionId'
						defaultValue='Seleccione una operación...'>
						<option disabled>Seleccione una operación...</option>
						<option value='1'>COMPRA</option>
						<option value='2'>VENTA</option>
					</select>
					<br />
				</label>
				<label>
					Moneda
					<select
						id='selectMonedaId'
						onChange={asignarValorMoneda}
						defaultValue='Seleccione una moneda...'
						ref={selectMoneda}>
						<option disabled>Seleccione una moneda...</option>
						{monedas.map((mon) => (
							<option key={mon.id} value={mon.id}>
								{mon.nombre}
							</option>
						))}
					</select>
					<br />
				</label>

				<label className='label-valorMoneda'>
					Valor moneda
					<input
						type='text'
						ref={inputValorMoneda}
						id='idValorMonedaForm'
						value={valorMoneda}
						readOnly
					/>{" "}
					<br /> <br />
				</label>
				<label>
					Unidades
					<input type='number' id='idUnidadesForm' /> <br />
				</label>
				<div className='div-btns-form'>
					<input
						type='submit'
						id='idBtnTransaccion'
						value='Aceptar'
						className='btn'
					/>
					{/* <input type="button" id="" value="Cancelar" className="btn" /> */}
				</div>
			</form>
		</section>
	);
};

export default FormOp;
