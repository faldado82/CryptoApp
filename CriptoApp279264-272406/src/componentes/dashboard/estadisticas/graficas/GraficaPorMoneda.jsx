import React from 'react'
import { useRef } from 'react';
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

const GraficaPorMoneda = () => {
    const monedas = useSelector(state => state.monedasStore.monedas);
    /* console.log(monedas); */
    const transacciones = useSelector(state => state.transaccionesStore.transacciones);
    const [datosGrafica, setDatosGrafica] = useState([]);
    
    let selectMoneda = useRef([]);
   /*  let selectMoneda = useRef('Seleccione una Moneda'); */
    
    /* console.log(selectMoneda.current.value); */

    // let idMonedaSeleccionado = selectMoneda.current.value;
    /* idMonedaSeleccionado = selectMoneda.current[0].value; */
    console.log(selectMoneda.current.value);
    const cargarArrayGrafica = () =>{
        if(selectMoneda.current.value !== "Seleccione una Moneda"){
            const arrAuxiliar = transacciones.filter(TRN => TRN.moneda == Number(selectMoneda.current.value)) 
            setDatosGrafica(arrAuxiliar);
        }
    }

  return (
    <div className="div-container-graficaPorMoneda">
       
            <Bar  className="bar-graf"
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Grafica por Moneda",
                        color: "rgba(255,255,255,0.9)",
                    },
                },
            }}
            data={{
                // labels: trnAuxiliar.map((tra) => tra.idMoneda),
                labels: datosGrafica.map((DG, i) => i + 1),
                datasets: [
                    {
                        label: "Compra y Venta" ,
                        data: datosGrafica.map((DG) => DG.valor_actual),
                        backgroundColor: "rgba(235, 115, 63, 0.796)",  
                    }
                    
                ],
                
            }}
            />
             <label>
            {/* Estadisticas por Moneda */}
            <select
                onChange={cargarArrayGrafica}
                ref={selectMoneda}>
                <option>Seleccione una Moneda</option>
                {monedas.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.nombre}
                    </option>
                ))}
            </select>
            <br />
           
        </label>
    </div>
    
  )
}

export default GraficaPorMoneda