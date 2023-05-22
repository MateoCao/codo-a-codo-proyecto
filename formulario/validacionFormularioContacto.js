// VALIDACION FORMULARIO

//Selecciono al formulario, inputs y textarea

const contactForm = document.getElementById('contact-form');
const inputsContactForm = document.querySelectorAll('#contact-form input');
const messageContactForm = document.getElementById("contact-message");

//Expresiones regulares

const expresionesContactForm = {
	name: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, // Letras, numeros, guion y guion_bajo.
	surname: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, // Letras y espacios, pueden llevar acentos.
    phone: /^\d{8,14}$/, // 7 a 14 números. 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato email.
    subject: /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
    message: /^[a-zA-ZÀ-ÿ0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{30,300}$/ // Letras y espacios, pueden llevar acentos.
};

//Indico valores en false para que no se envíe el formulario si el usuario llena mal algun campo.

const camposContactForm = {
	name: false,
	surname: false,
    phone: false,
	email: false,
    subject: false,
    message: false
};

//Con validarFormulario accedo al atributo "name" de cada input y luego con switch evaluo esa expresión y la comparo con distintas instancias "case"

const validarFormularioContacto = (e) => {
	switch (e.target.name) {
		case "contact-name":
			validarInputContacto(expresionesContactForm.name, e.target, "name");
		break;

		case "contact-surname":
			validarInputContacto(expresionesContactForm.surname, e.target, "surname");
		break;

        case "contact-phone":
            validarInputContacto(expresionesContactForm.phone, e.target, "phone");
        break;

		case "contact-email":
			validarInputContacto(expresionesContactForm.email, e.target, "email");
		break;

        case "contact-subject":
			validarInputContacto(expresionesContactForm.subject, e.target, "subject");
		break;

	}
};

//validarInput Valida cada input con su correcta expresión regular mediante los parámetros que le paso a la función. Además, modifico clases para la aparición o no de mensajes en la página.

const validarInputContacto = (expresion, input, campo ) => {
	
	if(expresion.test(input.value)) {
		document.getElementById(`contact-group__${campo}`).classList.remove("form__error");
		document.querySelector(`#contact-group__${campo} i`).classList.remove("fa-circle-xmark");
		document.querySelector(`#contact-group__${campo} .form-contact__input-error`).classList.remove("visible");
        document.getElementById(`contact-group__${campo}`).classList.add("form__success");
		document.querySelector(`#contact-group__${campo} i`).classList.add("fa-circle-check");
		camposContactForm[campo] = true;
	} else {
        document.getElementById(`contact-group__${campo}`).classList.remove("form__success");
		document.querySelector(`#contact-group__${campo} i`).classList.remove("fa-circle-check");
		document.querySelector(`#contact-group__${campo} i`).classList.add("fa-circle-xmark");
		document.getElementById(`contact-group__${campo}`).classList.add("form__error");
		document.querySelector(`#contact-group__${campo} .form-contact__input-error`).classList.add("visible");
		camposContactForm[campo] = false;
	};
};

// Textarea validación

const validarTextArea = (e) => {
    if(expresionesContactForm.message.test(e.target.value)) {
        document.getElementById(`contact-group__message`).classList.remove("form__error");
        document.querySelector(`#contact-group__message .form-contact__textarea-error`).classList.remove("visible");
        document.getElementById(`contact-group__message`).classList.add("form__success");
        camposContactForm["message"] = true;
    } else {
        document.getElementById(`contact-group__message`).classList.remove("form__success");
        document.getElementById(`contact-group__message`).classList.add("form__error");
        document.querySelector(`#contact-group__message .form-contact__textarea-error`).classList.add("visible");
        camposContactForm["message"] = false;
    }
};


// validarFormulario se ejecuta cuando levanto una tecla o cuando dejo de seleccionar un input.

inputsContactForm.forEach((contactInput) => {
	contactInput.addEventListener("keyup", validarFormularioContacto);
	contactInput.addEventListener("blur", validarFormularioContacto);
});
messageContactForm.addEventListener("keyup", validarTextArea);
messageContactForm.addEventListener("blur", validarTextArea);

//SUBMIT

async function handleSubmit(e) {
	e.preventDefault();

	const formMensajeContact = document.getElementById("form-contact__message");
	const inputNameContact = document.getElementById("contact-name"); 
	const inputEmailContact = document.getElementById("contact-email"); 

	//Parámetros para mandar el correo. 

	let paramsContact = {
		clientName : inputNameContact.value,
		clientEmail: inputEmailContact.value,
		myName: "ShopSmart",
		myEmail: "mateocaoprueba@gmail.com",
		message: "Recibimos tu consulta, recibirás una respuesta dentro de 2 a 5 meses."
	};

	//Si todas las propiedades del objeto "campos" son verdaderas se "enviará" el formulario y el correo de confirmación. Además se modifican clases. 

	if(camposContactForm.name && camposContactForm.surname && camposContactForm.email && camposContactForm.phone && camposContactForm.subject && camposContactForm.message) {
		const $contactForm = new FormData(this);
		const res = await fetch(this.action, {
			method: this.method,
			body: $contactForm,
			headers: {
				"Accept" : "application/json"
			}
		});
		if(res.ok) {
			contactForm.reset();
			formMensajeContact.classList.remove("error");
			formMensajeContact.classList.add("success");
			formMensajeContact.querySelector(".form-contact__message-text").textContent = "Tu consulta fue enviada. Recibirás un mail con más información y con un tiempo aproximado en cuanto a la respuesta."
			setTimeout(() => {
           		formMensajeContact.querySelector(".form-contact__message-text").textContent = "";
				formMensajeContact.classList.remove("success");
				document.querySelectorAll(".form-contact__group-input i").forEach((icon) => {
				icon.classList.remove("fa-circle-check");
				});
           		 contactForm.querySelectorAll(".form-contact__group").forEach((group) => {
                group.classList.remove("form__success");
            	}); 
			}, 5000);
			emailjs.send("service_r0586et", "template_tboiwbe", paramsContact).then();
		} else {
			contactForm.reset();
			formMensajeContact.classList.remove("success");
			document.querySelectorAll(".form-contact__group-input i").forEach((icon) => {
			icon.classList.remove("fa-circle-check");
			});
				contactForm.querySelectorAll(".form-contact__group").forEach((group) => {
			group.classList.remove("form__success");
			});
			formMensajeContact.classList.add("error");
			formMensajeContact.querySelector(".form-contact__message-text").textContent = "Hubo un problema con el envío de tu consulta, por favor, intentalo más tarde."
		};		
	} else {
		formMensajeContact.classList.add("error");
		formMensajeContact.querySelector(".form-contact__message-text").textContent = "Por favor, completa todos los campos correctamente."
	};
};

contactForm.addEventListener("submit", handleSubmit);