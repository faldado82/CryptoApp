import React from "react";
import Login from './componentes/login/Login.jsx';
import Registro from './componentes/registro/Registro.jsx';
import Dashboard from "./componentes/dashboard/Dashboard.jsx";
import Footer from './componentes/footer/Footer.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () => {
	return (
		<Provider store={store} className="contenedor-app">

			<BrowserRouter>
				<Routes>
					<Route path="/index.html" element={<Login />}></Route>
					<Route path="/" element={<Login />}></Route>
					<Route path="/register" element={<Registro />}></Route>
					<Route path="/dashboard" element={<Dashboard />}></Route>
				</Routes>
			</BrowserRouter>
			<Footer />

		</Provider>
	);
}
