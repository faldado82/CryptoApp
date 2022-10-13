import React from "react";
import "./monedas.css";
import {useSelector} from 'react-redux';
// import "../../../index.css";


const UnaMoneda = ( props ) => {
	const transacciones = useSelector(state => state.transaccionesStore.transacciones);
	const monedas = useSelector(state => state.monedasStore.monedas);
	let objNuevo;
	let arrSugerirTransaccion = [];
	let sugerenciaIA;
	/* console.log("monedas ===== UNAMONEDA ");
	console.log(monedas); */
	
	transacciones.forEach(transaccionActual => {
		sugerenciaIA = { sugerencia: "---" };
		if (arrSugerirTransaccion.find(objEnSugerir => objEnSugerir.moneda == transaccionActual.moneda)) {

		  let indexBuscado = arrSugerirTransaccion.findIndex(objEnSugerirX => objEnSugerirX.moneda == transaccionActual.moneda);


		  if (transaccionActual.tipo_operacion == 1) {//compra
			let indexMonedaBuscada = monedas.findIndex(moneda => moneda.id == transaccionActual.moneda)
			if (transaccionActual.valor_actual < monedas[indexMonedaBuscada].cotizacion) {
			  sugerenciaIA.sugerencia = "VENDER";
			}
		  } else if (transaccionActual.tipo_operacion == 2) {//venta
			let indexMonedaBuscada = monedas.findIndex(moneda => moneda.id == transaccionActual.moneda)
			if (transaccionActual.valor_actual > monedas[indexMonedaBuscada].cotizacion) {
			  sugerenciaIA.sugerencia = "COMPRAR";
			}
		  }

		  objNuevo = { ...transaccionActual, ...sugerenciaIA };//agregamos sugerencia para remplazar y cuando se hace push
		  arrSugerirTransaccion[indexBuscado] = objNuevo;

		} else {
		  if (transaccionActual.tipo_operacion == 1) {//compra
			let indexMonedaBuscada = monedas.findIndex(moneda => moneda.id == transaccionActual.moneda)
			if (transaccionActual.valor_actual < monedas[indexMonedaBuscada].cotizacion) {
			  sugerenciaIA.sugerencia = "VENDER";
			}
		  } else if (transaccionActual.tipo_operacion == 2) {//venta
			let indexMonedaBuscada = monedas.findIndex(moneda => moneda.id == transaccionActual.moneda)
			if (transaccionActual.valor_actual > monedas[indexMonedaBuscada].cotizacion) {
			  sugerenciaIA.sugerencia = "COMPRAR";
			}
		  }
		  objNuevo = { ...transaccionActual, ...sugerenciaIA };//agregamos sugerencia para remplazar y cuando se hace push
		  arrSugerirTransaccion.push(objNuevo);
		}
	  });

	  
	  let sugiriendo = "---";
    if (arrSugerirTransaccion.find(x => x.moneda == props.id)) {
      let indexTransConSugerencia = arrSugerirTransaccion.findIndex(t => t.moneda == props.id);

      sugiriendo = arrSugerirTransaccion[indexTransConSugerencia].sugerencia;
    }

	return (

		
		<div className='card-moneda'>
			<div className='card-info'>
				<img
					src={`https://crypto.develotion.com/imgs/${props.imagen}`}
					alt={`Logo de moneda ${props.nombre}`}
				/>
				<p>{props.nombre}</p>
			</div>
			<div className='card-valores-precio'>
				<p>
					Cotizacion:&nbsp; $<span>{props.cotizacion}</span>
				</p>
				<p className='pSugerencia'>
					Sugerencia:&nbsp;<span>{sugiriendo}</span>
				</p>
			</div>
			<div className=''>
			<a href="#form" className='btn'>Comerciar</a>
				{/* <button className='btn'>Comerciar</button> */}
			</div>
		</div>
	);
};

export default UnaMoneda;
