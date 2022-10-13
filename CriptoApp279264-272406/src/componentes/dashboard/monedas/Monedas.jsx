import React from 'react'
import './monedas.css';
/* import UnaMoneda from './UnaMoneda'; */
import { useDispatch, useSelector } from "react-redux";
import UnaMoneda from './UnaMoneda';
import { useEffect } from 'react';


const Monedas = () => {
  const monedas = useSelector(state => state.monedasStore.monedas);
  /* console.log(monedas); */
  return (
    <section id="sectionIDMonedas">
      <div className="section-contenedor-monedas">
        <h3>Cotizacion de monedas</h3>
        <div className="section-monedas">
            {monedas.map(unaM => <UnaMoneda key={unaM.id} {...unaM} />)}
        </div>
      </div>
    </section>
  )
}

export default Monedas