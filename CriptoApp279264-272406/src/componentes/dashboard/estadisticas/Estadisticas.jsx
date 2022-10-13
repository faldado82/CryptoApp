import React from "react";
import './estadisticas.css';
import Grafica from "./graficas/Grafica";
import GraficaPorMoneda from "./graficas/GraficaPorMoneda";



const Estadisticas = () => {
	return (
		<section id='graph' className="contenedor-section-estadisticas"> 
      		<h3>Estadisticas</h3>
			<div className="div-container-grafica">
					<Grafica operacion={1}/>
					<Grafica operacion={2}/>
			</div>
					
					<GraficaPorMoneda />	
		</section>
	);
};

export default Estadisticas;
