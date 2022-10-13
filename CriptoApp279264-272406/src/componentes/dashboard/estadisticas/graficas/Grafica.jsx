import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Grafica = (props) => {
	const transacciones = useSelector(state => state.transaccionesStore.transacciones);
	const monedas = useSelector(state => state.monedasStore.monedas);
	/* ESTE ARRAY VA ACUMULAR LOS TOTALES DE TRN POR ID DE MONEDA, VA A GUARDAR  {{{UN OBJ NUEVO}}} */
	
		const [datosGrafica, setDatosGrafica] = useState([]);
		let tipoOperacionNombre = "Compras";
		if(props.operacion == 2) tipoOperacionNombre = "Ventas";
		const nombreFindIdMoneda = (idMoneda) => {
			let indexBuscado = monedas.findIndex(m => m.id == idMoneda);
			return monedas[indexBuscado].nombre;
		};
		
	useEffect(() => {
		let trnAuxiliar = [];
		transacciones.forEach(TRN => {
			if(TRN.tipo_operacion == props.operacion){

			if (trnAuxiliar.find(objTrnAuxActual => objTrnAuxActual.idMoneda == TRN.moneda)) {
				/* si hay algo en auxiliar con esa condicion, sumo al total de esa moneda */
				let indexBuscado = trnAuxiliar.findIndex(objTrnAuxActual => objTrnAuxActual.idMoneda == TRN.moneda);
				trnAuxiliar[indexBuscado].montoTotalDeEstaMoneda += TRN.valor_actual * TRN.cantidad;
				
			} else {
				/* console.log(TRN.moneda); */
				/* si no existe en auxiliar lo creamos y pusheamos */
				let objTrnAux = {
					idMoneda: TRN.moneda,
					operacion: TRN.tipo_operacion,
					montoTotalDeEstaMoneda: TRN.valor_actual * TRN.cantidad,
					nombreMoneda: nombreFindIdMoneda(TRN.moneda)
				}
				trnAuxiliar.push(objTrnAux);
			}

		}
		
	});
	setDatosGrafica(trnAuxiliar);	
}, [transacciones]);

	// console.log(datosGrafica);
	return (
		<div className="divGrafica">
			<Bar className="bar-graf"
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: "top",
							labels: {
								// This more specific font property overrides the global property
								font: {
									size: 14,
									
								}
							}
						},
						title: {
							display: true,
							text: "Grafica de " + tipoOperacionNombre ,
							color: "rgba(255,255,255,0.9)",
							
						},
					},
				}}
				data={{
					// labels: trnAuxiliar.map((tra) => tra.idMoneda),
					labels: datosGrafica.map( DG => DG.nombreMoneda),
					datasets: [
						{
							label: tipoOperacionNombre,
							data: datosGrafica.map((DG) => DG.montoTotalDeEstaMoneda),
							backgroundColor: "rgba(235, 115, 63, 0.796)",
						},
					],
				}}
				
			/>
		</div>
	);
};

export default Grafica;






// const transacciones = useSelector(state => state.transaccionesStore.transacciones);

// 	/* ESTE ARRAY VA ACUMULAR LOS TOTALES DE TRN POR ID DE MONEDA, VA A GUARDAR  {{{UN OBJ NUEVO}}} */
	
// 		const [datosGrafica, setDatosGrafica] = useState([]);
// 		let trnAuxiliar = [];
// 	useEffect(() => {
// 		transacciones.forEach(TRN => {
// 			if(TRN.tipo_operacion == 1){

// 			if (trnAuxiliar.find(objTrnAuxActual => objTrnAuxActual.idMoneda == TRN.moneda)) {
// 				/* si hay algo en auxiliar con esa condicion, sumo al total de esa moneda */
// 				let indexBuscado = trnAuxiliar.findIndex(objTrnAuxActual => objTrnAuxActual.idMoneda == TRN.moneda);
// 				trnAuxiliar[indexBuscado].montoTotalDeEstaMoneda += TRN.valor_actual * TRN.cantidad;
				
// 			} else {
// 				/* console.log(TRN.moneda); */
// 				/* si no existe en auxiliar lo creamos y pusheamos */
// 				let objTrnAux = {
// 					idMoneda: TRN.moneda,
// 					operacion: TRN.tipo_operacion,
// 					montoTotalDeEstaMoneda: TRN.valor_actual * TRN.cantidad
// 				}
// 				trnAuxiliar.push(objTrnAux);
// 			}

// 		}
		
// 	});
// 	setDatosGrafica(trnAuxiliar);

// }, [transacciones]);
// 	/* console.log(datosGrafica); */