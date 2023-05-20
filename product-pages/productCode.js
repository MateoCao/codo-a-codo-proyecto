// Login display

const myAccount = document.querySelector("#my-account");
const login = document.querySelector("#login-display");
const closeLogin = document.querySelector("#close-login");

myAccount.addEventListener("click", () => {
  login.classList.add("visible");
});

closeLogin.addEventListener("click", () => {
  login.classList.remove("visible");
  formLogin.reset(); 
});

//Login form

const formLogin = document.getElementById("formulario-login");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  formLogin.querySelector(".correo-no-registrado__contenedor").classList.add("correo-no-registrado__contenedor-visible");
});

// Formulario registro

const registerTrigger = document.getElementById("register-trigger");
const registerDisplay = document.getElementById("register-display");
const closeRegister = document.getElementById("close-register");
const formRegister= document.getElementById("form-register");

registerTrigger.addEventListener("click", () => {
  formLogin.querySelector(".correo-no-registrado__contenedor").classList.remove("correo-no-registrado__contenedor-visible");
  formLogin.reset(); 
  login.classList.remove("visible");
  registerDisplay.classList.add("visible");
});

closeRegister.addEventListener("click", () => {
  registerDisplay.classList.remove("visible");
  document.querySelectorAll(".formulario__grupo-input i").forEach((icon) => {
    icon.classList.remove("fa-circle-check", "fa-circle-xmark");
  });
  document.querySelectorAll(".formulario__grupo").forEach((div) => {
    div.classList.remove("formulario__incorrecto");
  });
  document.querySelectorAll(".form__input-error").forEach((div) => {
    div.classList.remove("form__input-error-visible");
  });
  document.getElementById("form__mensaje").classList.remove("form__mensaje-incorrecto", "form__mensaje-exito");
  formRegister.reset();
});

// Sección comentarios

const writeField = document.querySelector("#write-comment");
const sendCommentBtn = document.querySelector("#send-comment");
const commentsContainer = document.querySelector("#comments-container");
const commentForm = document.querySelector("#publish-comment");
const noCommentsText = document.querySelector("#comments-container .comments__no-comments");

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  let dateValue = `Publicado el ${day} de ${monthNames[month]} de ${year} a las ${hours}:${minutes} hs.`;

  const newComment = writeField.value.trim();
  if (newComment !== "") {
    noCommentsText.classList.add("invisible");
    createComment(newComment, dateValue);
    writeField.value = ""; 
  }
});

const createComment = (comment, dateValue) => {
  
  // Creando componentes

  const commentContainer = document.createElement("div");
  const dateContainer = document.createElement("div");
  const dateText = document.createElement("span");
  const textContainer = document.createElement("div");
  const text = document.createElement("p");
  dateText.textContent = dateValue;
  text.textContent = comment;

  // Dando clases
  commentContainer.classList.add("comment");
  dateContainer.classList.add("comment__date-container");
  dateText.classList.add("comment");
  textContainer.classList.add("comment__text-container");
  text.classList.add("comment__text");

  // Asignando hijos

  dateContainer.appendChild(dateText);
  textContainer.appendChild(text);
  commentContainer.appendChild(dateContainer);
  commentContainer.appendChild(textContainer);

  commentsContainer.appendChild(commentContainer);
};