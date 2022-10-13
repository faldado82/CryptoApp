
// VALIDAR LOGIN NO IMPLEMENTADO =======================
// export const validarLogin = (username, password) => {
// 	let valido = false;
// 	if (checkUsername(username) && checkPassword(password)){
// 		valido = true;
// 	}
// 	return valido;
// };


export const validarRegistro = (username, password, confirmPass,idDpto,idCiudad) => {
	let valido = false;
	if (
		checkUsername(username) &&
		checkPassword(password) &&
		checkPasswordConfirmation(password, confirmPass) &&
        checkDpto(idDpto) &&
        checkCity(idCiudad)
	){valido = true;}
		
	return valido;
};

function checkUsername(username) {
    let valido = false;
	if (username.length >= 4) {
		document.getElementById("user").classList.add("success");
		document.getElementById("user").classList.replace("error", "success");
		document.getElementById("userError").innerHTML = "";
        valido = true;
	} else {
		document.getElementById("user").classList.add("error");
		document.getElementById("userError").innerHTML =
			"El usuario debe tener 4 o más carácteres";
	}
    return valido;
}

function checkPassword(password) {
    let valido = false;
	if (password.length >= 4) {
		document.getElementById("pass").classList.add("success");
		document.getElementById("pass").classList.replace("error", "success");
		document.getElementById("passError").innerHTML = "";
        valido = true;
	} else {
		document.getElementById("pass").classList.add("error");
		document.getElementById("passError").innerHTML =
			"El password debe tener 4 o más carácteres";
	}
    return valido;
}

function checkPasswordConfirmation(password, confirmPass) {
    let valido = false;
	if (password === confirmPass && confirmPass !== "") {
		document.getElementById("passConf").classList.add("success");
		document.getElementById("passConf").classList.replace("error", "success");
		document.getElementById("passConfError").innerHTML = "";
        valido = true;
	} else {
		document.getElementById("passConf").classList.add("error");
		document.getElementById("passConfError").innerHTML =
			"El password ingresado debe ser igual al anterior";
	}
    return valido;
}

function checkDpto(dpto){
    let valido = false;
    if (!isNaN(dpto)) {
		document.getElementById("departamentos").classList.add("success");
		document.getElementById("departamentos").classList.replace("error", "success");
		document.getElementById("selDeptoError").innerHTML = "";
        valido = true;
	} else {
		document.getElementById("departamentos").classList.add("error");
		document.getElementById("selDeptoError").innerHTML =
			"Seleccione un departamento";
	}
    return valido;
}

function checkCity(city){
    let valido = false;
	if (!isNaN(city)) {
		document.getElementById("ciudad").classList.add("success");
		document.getElementById("ciudad").classList.replace("error", "success");
		document.getElementById("selCiudadError").innerHTML = "";
        valido = true;
	} else {
		document.getElementById("ciudad").classList.add("error");
		document.getElementById("selCiudadError").innerHTML =
			"Seleccione una ciudad";
	}
    return valido;
}

