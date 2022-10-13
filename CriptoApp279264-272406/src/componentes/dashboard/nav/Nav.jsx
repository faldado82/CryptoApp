import React from 'react'
import './nav.css';
import {AiOutlineHome} from 'react-icons/ai';
import { GoGraph } from 'react-icons/go';
import { FaPowerOff, FaRegHandshake } from 'react-icons/fa';
import { CgPlayListCheck } from 'react-icons/cg';
import { useState } from 'react';
import MontoFinal from './MontoFinal.jsx';
import { Outlet, NavLink } from "react-router-dom";
import { vaciarMonedas } from "../../../features/monedasSlice.js";
import { vaciarTransacciones } from "../../../features/transaccionesSlice.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  let navegarLogin = useNavigate();
    const [activeNav, setActiveNav] = useState('#home')
    const deslogueo = () =>{
     /*  dispatch(vaciarMonedas());
      dispatch(vaciarTransacciones()); */
      localStorage.clear();
      navegarLogin("/");
      


    } 


    
  return (
    <section id='navSection'>
      <div className="divNav">
      <nav>
        <div>
          <a href='#navSection' onClick={() => setActiveNav('#navSection')} className={activeNav === '#navSection' ? 'active' : ''}><AiOutlineHome className='nav-icon'/></a>
          
          <a href='#form' onClick={() => setActiveNav('#form')} className={activeNav === '#form' ? 'active' : ''}><CgPlayListCheck className='nav-icon' /></a>
          
          <a href='#trn' onClick={() => setActiveNav('#trn')} className={activeNav === '#trn' ? 'active' : ''}><FaRegHandshake className='nav-icon' /></a>
          
          <a href='#graph' onClick={() => setActiveNav('#graph')} className={activeNav === '#graph' ? 'active' : ''}><GoGraph className='nav-icon' /></a>
          
          <MontoFinal />
        </div>

        {/* <a href='#services' onClick={() => setActiveNav('#services')} className={activeNav === '#services' ? 'active' : ''}><RiServiceLine/></a> */}
        
       
          
        <NavLink onClick={deslogueo} to="/"><FaPowerOff/></NavLink>
          
      </nav>
      </div>
      
      <Outlet />
    </section>
  )
}

export default Nav