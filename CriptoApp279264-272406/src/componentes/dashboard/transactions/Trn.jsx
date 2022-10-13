import React from 'react'
import './trn.css';
import "../../../index.css";
import UnaTrn from './unaTrn.jsx';
import { useSelector } from 'react-redux';


const Trn = () => {
  const transacciones = useSelector(state => state.transaccionesStore.transacciones);
  const monedas = useSelector(state => state.monedasStore.monedas);
  /* console.log("monedas ===== TRN ");
  console.log(monedas); */
  return (
    <section id='trn' className="section-contenedor-trn">
      <h3>Historial de transacciones</h3>
        <table className="" id="tblTRN" cellSpacing="0" cellPadding="5">
        <thead className="thTRN">
            <tr>
                <th>Operacion</th> {/* <!-- mostrar con funcion, icono correspondiente segun operacion --> */}
                <th>Logo moneda</th>
                <th>Nombre moneda</th>
                <th>Valor unidad</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody id="tbodyTRN">
         {transacciones.map(unaTr =><UnaTrn key={unaTr.id}{...unaTr} />)}
        </tbody>
    </table>
    </section>
  )
}

export default Trn