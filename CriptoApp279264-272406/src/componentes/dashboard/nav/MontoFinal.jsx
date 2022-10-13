import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const MontoFinal = () => {
const transacciones = useSelector(state => state.transaccionesStore.transacciones);
    let montoCompra = 0;
          let montoVenta = 0;
          let montoTotal = 0;
          transacciones.forEach(transaccionActual => {
            transaccionActual.tipo_operacion === 1 ?
              montoCompra += ((transaccionActual.cantidad) * (transaccionActual.valor_actual))
              :
              montoVenta += ((transaccionActual.cantidad) * (transaccionActual.valor_actual));
          });

          montoTotal = montoCompra - montoVenta;

useEffect(() => {
 
}, [transacciones])
  return (
    <span>Total Invertido: $ {montoTotal}</span>
  )
}

export default MontoFinal