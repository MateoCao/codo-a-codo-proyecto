// MAPA

const select = document.getElementById("locations-selector");
let map;
let marker;

select.addEventListener("change", () => {
    let newLocation;
    if(select.selectedIndex === 0) {
        newLocation = new google.maps.LatLng(40.3807649, -3.6488823);
    } else if (select.selectedIndex === 1) {
        newLocation = new google.maps.LatLng(40.3863894, -3.6694257);
    } else if (select.selectedIndex === 2) {
        newLocation = new google.maps.LatLng(40.431356, -3.627063);
    } else {
        console.log("ERROR");
    };

    map.panTo(newLocation);
    marker.setPosition(newLocation);
});

function iniciarMap() {
    let coord = {lat: 40.3807649 ,lng: -3.6488823};
    map = new google.maps.Map(document.getElementById("map"),{
        zoom: 15,
        center: coord   
    });
    marker = new google.maps.Marker({
        position: coord,
        map: map
    });
};

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