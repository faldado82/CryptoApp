import React from 'react'
import { useSelector } from "react-redux";
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';

const UnaTrn = (props) => {
    const monedas = useSelector(state => state.monedasStore.monedas);
    
  /*   console.log("monedas ======= en UNA TRN");
    console.log(monedas);  */
            let indexMonedaBuscada = monedas.findIndex(buscada => buscada.id == props.moneda);
            // console.log("INDEX BUADO  -------");
            // console.log(indexMonedaBuscada);
            // console.log("ID DE ERROR  -------");
            // console.log(props.moneda);
            let monedita =  monedas[indexMonedaBuscada];
        return ( 
        <tr>
            <td className="tdUnaTrn">{props.tipo_operacion == 1 ?<span><GiPayMoney className='comprar'/>Compra</span>:<span className='spanVender'><GiReceiveMoney className='vender'/>Venta</span>}</td>
            {/* <td>{<img src={`https://crypto.develotion.com/imgs/${monedita.imagen}`} alt={monedita.nombre}/>}</td>  */}
            <td>{<img src={`https://crypto.develotion.com/imgs/${monedita.imagen}`} alt={monedita.nombre}/>}</td> 
            <td>{monedita.nombre}</td> 
            <td>${props.valor_actual}</td>
            <td>{props.cantidad}</td>
        </tr>
        )
}
export default UnaTrn;
