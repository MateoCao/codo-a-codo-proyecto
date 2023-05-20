// API

const API_URL = "https://fakestoreapi.com";

// Seleccionando secciones para cada categoría en un objeto

const productCategories = {
  "women's clothing" : document.querySelector("#products__women-clothing-container"),
  "men's clothing" : document.querySelector("#products-men-clothing-container"),
  "electronics" : document.querySelector("#products-electronics-container"),
  "jewelery" : document.querySelector("#products-jewelery-container")

};

const renderDOM = (product, categoryContainer) => {
    const productPriceContainer = document.createElement("div");
    const productItemContainer = document.createElement("a");
    const productItem = document.createElement("div");
    const productNameContainer = document.createElement("div");
    const productRatingContainer = document.createElement("div");
    const productImgContainer = document.createElement("div");
    const productImgTotalContainer = document.createElement("div");
    const productName = document.createElement("h3");
    const productPrice = document.createElement("h4");
    const productRating = document.createElement("h4")
    const productImg = document.createElement("img");
    const productsContainer = document.createElement("div");

    productName.appendChild(
      document.createTextNode(product.title)
    );

    productPrice.appendChild(
      document.createTextNode(`Precio: $${product.price}`)
    );

    productRating.appendChild(
      document.createTextNode(`Rating: ${product.rating.rate}`)
    );

    // Dando clases y atributos

    productItemContainer.setAttribute("href", `product-pages/${product.title}.html`);
    productItemContainer.classList.add("main__product-item-container");
    productItem.classList.add("product");
    productNameContainer.classList.add("productNameContainer");
    productPriceContainer.classList.add("productPriceContainer");
    productRatingContainer.classList.add("productRatingContainer");
    productImgTotalContainer.classList.add("productImgTotalContainer");
    productImg.classList.add("img-product");
    productsContainer.classList.add("products-container");

    productImg.setAttribute("src", `${product.image}`);

      // Asignando hijos

    productNameContainer.appendChild(productName);
    productPriceContainer.appendChild(productPrice);
    productRatingContainer.appendChild(productRating);
    productImgContainer.appendChild(productImg);
    productImgTotalContainer.appendChild(productImgContainer);
    productItem.appendChild(productImgTotalContainer);
    productItem.appendChild(productNameContainer);
    productItem.appendChild(productPriceContainer);
    productItem.appendChild(productRatingContainer);
    productItemContainer.appendChild(productItem);
    categoryContainer.appendChild(productItemContainer);
};


// FETCH

fetch(`${API_URL}/products`)
.then((res) => res.json())
.then((products) => {

  products.forEach((product) => {
    const categoryContainer = productCategories[product.category];
    if(categoryContainer) {
      renderDOM(product, categoryContainer);
    };
  });
})
.catch((error) => {
  console.log("Error:", error);
});

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

//Categorias productos hamburguesa

const navProductsMenu = document.querySelector("#products-categories");
const productsButton = document.querySelector("#products-button");

productsButton.addEventListener("mouseover", () => {
  navProductsMenu.classList.add("visible");
});

navProductsMenu.addEventListener("mouseleave", () => {
  navProductsMenu.classList.remove("visible");
});

//POSITION FIXED

const navTopBarContainer = document.querySelector('.header__nav-top-bar-container');
const navTopBarContainerPosition = navTopBarContainer.offsetTop;
const navLowBarContainer = document.querySelector('.header__nav-low-bar-container');

const handleScroll = () => {
  if (window.pageYOffset > navTopBarContainerPosition) {
    navLowBarContainer.classList.add("fixed");
  } else {
    navLowBarContainer.classList.remove("fixed");
  };
};

window.addEventListener('scroll', handleScroll);

window.addEventListener("scroll", () => {
  let products = document.getElementsByClassName("main__product-item-container");
  let windowHeight = window.innerHeight;
  for (let i = 0; i < products.length; i++) {
    const productPosition = products[i].getBoundingClientRect().top;
    if (productPosition < windowHeight*0.85) {
      products[i].classList.add("product-animated");
    };
  };
});


// Formulario registro

const body = document.getElementById("body");
const registerTrigger = document.getElementById("register-trigger");
const registerDisplay = document.getElementById("register-display");
const closeRegister = document.getElementById("close-register");
const formRegister= document.getElementById("form-register");

registerTrigger.addEventListener("click", () => {
  formLogin.querySelector(".correo-no-registrado__contenedor").classList.remove("correo-no-registrado__contenedor-visible");
  formLogin.reset(); 
  login.classList.remove("visible");
  registerDisplay.classList.remove("invisible");
  registerDisplay.classList.add("visible");
  body.classList.add("hidden");
});

closeRegister.addEventListener("click", () => {
  registerDisplay.classList.add("invisible");

  if(document.documentElement.clientWidth <= 767) {
    setTimeout(() => {
      registerDisplay.classList.remove("visible");
      body.classList.remove("hidden");
    }, 480)
  } else {
    registerDisplay.classList.remove("visible");
    body.classList.remove("hidden");
  }
  
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


// Mobile nav display

const menuMobileTrigger = document.getElementById("menu__mobile-trigger");
const menuMobile = document.getElementById("menu__mobile")
const menuMobileClose = document.getElementById("menu__mobile-close");
const mobileCategories = document.querySelectorAll(".menu__mobile-category-list li");
const mobilePages = document.querySelectorAll(".menu__mobile-options-list li");

mobileCategories.forEach((category) => {
  category.addEventListener("click", () => {
    menuMobile.classList.remove("visible");
    body.classList.remove("hidden");
  })
});

mobilePages.forEach((page) => {
  page.addEventListener("click", () => {
    menuMobile.classList.remove("visible");
    body.classList.remove("hidden");
  })
});

menuMobileClose.addEventListener("click", () => {
  menuMobile.classList.add("invisible");
  setTimeout(() => {
    menuMobile.classList.remove("visible");
    body.classList.remove("hidden");
  }, 480)
});

menuMobileTrigger.addEventListener("click", () => {
  menuMobile.classList.remove("invisible");
  menuMobile.classList.add("visible");
  body.classList.add("hidden");
});