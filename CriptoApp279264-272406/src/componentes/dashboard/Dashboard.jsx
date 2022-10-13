import React from 'react';
import './dashboard.css';
import Nav from './nav/Nav.jsx';
import Monedas from './monedas/Monedas.jsx';
import FormOp from './formOp/FormOp.jsx';
import Trn from './transactions/Trn.jsx';
import Estadisticas from './estadisticas/Estadisticas.jsx';
import { useDispatch, useSelector } from "react-redux";
import { guardarMonedas } from "../../features/monedasSlice";
import { guardarTransacciones } from "../../features/transaccionesSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const obtenerApiKey = localStorage.getItem('apiKey');
  const obtenerUserId = localStorage.getItem('id');
  const urlBase = "https://crypto.develotion.com";
  const monedas = useSelector(state => state.monedasStore.monedas);

  // VAMOS A TRAER TODAS LAS MONEDAS UNA UNICA VEZ
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch(`${urlBase}/monedas.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': obtenerApiKey
      }
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        switch (datos.codigo) {
          case 200:
          dispatch(guardarMonedas(datos.monedas));
            break;
          case 409:
            console.log("Verifique datos");
            break;
          case 401:
            console.log("No tiene permisos");
            break;
          default:
            console.log(`Error por default ${datos.codigo}`);
        }
      })

      
        /* FETCH DE TRANSACCIONES */
        fetch(`${urlBase}/transacciones.php?idUsuario=${obtenerUserId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apiKey': obtenerApiKey,
          }
        })
          .then(respuesta => respuesta.json())
          .then(datos => {
            switch (datos.codigo) {
              case 200:
                dispatch(guardarTransacciones(datos.transacciones));
                
                break
              case 409:
                console.log("Verifique datos");
                break;
              case 401:
                console.log("No tiene permisos");
                break;
              default:
                console.log(`Error por default ${datos.codigo}`);
            }
          })
},[]);
/* console.log("Length monedas", monedas.length) */


  return (
    <div className="contenedor-dashboard">
      <Nav />
      <Monedas />
      <FormOp />
      <Trn />
      <Estadisticas />
      
    </div>
  )
}
export default Dashboard