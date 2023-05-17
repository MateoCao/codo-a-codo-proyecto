// VALIDACION FORMULARIO

//Selecciono al formulario e inputs

const formulario = document.getElementById('form-register');
const inputs = document.querySelectorAll('#form-register input');

//Expresiones regulares

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letras, numeros, guion y guion_bajo.
	nombre: /^[a-zA-ZÀ-ÿ\s]{8,30}$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, // Una mayúscula, una minúscula, un número y un símbolo. Mínimo 8 carácteres.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // Formato email.
};

//Indico valores en false para que no se envíe el formulario si el usuario llena mal algun campo.

const campos = {
	usuario: false,
	nombre: false,
	email: false,
	password: false,
	password2: false
};

//Con validarFormulario accedo al atributo "name" de cada input y luego con switch evaluo esa expresión y la comparo con distintas instancias "case"

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "user":
			validarInput(expresiones.usuario, e.target, "usuario");
		break;

		case "name":
			validarInput(expresiones.nombre, e.target, "nombre");
		break;

		case "email":
			validarInput(expresiones.email, e.target, "email");
		break;

		case "password":
			validarInput(expresiones.password, e.target, "password");
			validarPassword2();
		break;

		case "password2":
			validarInput(expresiones.password, e.target, "password2");
			validarPassword2();
		break;
	}
};

//validarInput Valida cada input con su correcta expresión regular mediante los parámetros que le paso a la función. Además, modifico clases para la aparición o no de mensajes en la página.

const validarInput = (expresion, input, campo ) => {
	
	if(expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__incorrecto");
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-xmark");
		document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove("form__input-error-visible");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-check");
		campos[campo] = true;
	} else {
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-check");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-xmark");
		document.getElementById(`grupo__${campo}`).classList.add("formulario__incorrecto");
		document.querySelector(`#grupo__${campo} .form__input-error`).classList.add("form__input-error-visible");
		campos[campo] = false;
	};
};

//Password = Password2

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById("password");
	console.log(inputPassword1.value)
	const inputPassword2 = document.getElementById("password2");

	if(inputPassword1.value !== inputPassword2.value) {
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-circle-check");
		document.getElementById("grupo__password2").classList.add("formulario__incorrecto");
		document.querySelector(`#grupo__password2 i`).classList.add("fa-circle-xmark");
		document.querySelector(`#grupo__password2 .form__input-error`).classList.add("form__input-error-visible");
		campos["password2"] = false;
	} else {
		document.getElementById("grupo__password2").classList.remove("formulario__incorrecto");
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-circle-xmark");
		document.querySelector(`#grupo__password2 .form__input-error`).classList.remove("form__input-error-visible");
		campos["password2"] = true;
	};
};

// validarFormulario se ejecuta cuando levanto una tecla o cuando dejo de seleccionar un input.

inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});

//SUBMIT

formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	const formMensaje = document.getElementById("form__mensaje");
	const inputNombre = document.getElementById("name"); 
	const inputEmail = document.getElementById("email"); 
	const inputUser = document.getElementById("user"); 

	//Parámetros para mandar el correo. 

	let params = {
		userName : inputNombre.value,
		userEmail: inputEmail.value,
		userUser : inputUser.value,
		myName: "ShopSmart",
		myEmail: "mateocaoprueba@gmail.com",
		message: "Te has registrado exitosamente"
	};

	//Si todas las propiedades del objeto "campos" son verdaderas se "enviará" el formulario y el correo de confirmación. Además se modifican clases. 

	if(campos.usuario && campos.nombre && campos.email && campos.password && campos.password2) {
		formulario.reset();
		formMensaje.classList.remove("form__mensaje-incorrecto");
		formMensaje.classList.add("form__mensaje-exito");
		formMensaje.querySelector(".registro-mensaje").textContent = "Te has registrado exitosamente. En breve te llegará un correo electrónico confirmando tu registro."
		setTimeout(() => {
			formMensaje.classList.remove("form__mensaje-exito");
			document.querySelectorAll(".formulario__grupo-input i").forEach((icon) => {
				icon.classList.remove("fa-circle-check");
			}); 
		}, 5000);
		emailjs.send("service_r0586et", "template_iqsldso", params).then()
	} else {
		formMensaje.classList.add("form__mensaje-incorrecto");
		formMensaje.querySelector(".registro-mensaje").textContent = "Por favor, ingresa los datos correctamente."
	}
});