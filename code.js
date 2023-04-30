// API

const API_URL = "https://fakestoreapi.com";

// Creando nodos DOM

const mostRatedContainer = document.querySelector("#products__most-rated-container");

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
});

// Login display

const myAccount = document.querySelector("#my-account");
const login = document.querySelector("#login-display");
const closeLogin = document.querySelector("#close-login");

myAccount.addEventListener("click", () => {
  login.classList.add("visible")
});

closeLogin.addEventListener("click", () => {
  login.classList.remove("visible")
});

//Categorias productos hamburguesa

const navProductsMenu = document.querySelector("#products-categories");
const productsButton = document.querySelector("#products-button");

productsButton.addEventListener("mouseover", () => {
  navProductsMenu.classList.add("visible")
});

navProductsMenu.addEventListener("mouseleave", () => {
  navProductsMenu.classList.remove("visible")
});

//POSITION FIXED

const navTopBarContainer = document.querySelector('.header__nav-top-bar-container');
const navTopBarContainerPosition = navTopBarContainer.offsetTop;
const navLowBarContainer = document.querySelector('.header__nav-low-bar-container');

const handleScroll = () => {
  if (window.pageYOffset > navTopBarContainerPosition) {
    navLowBarContainer.style.position = 'fixed';
    navLowBarContainer.style.top = '0';
    navLowBarContainer.style.border = "1px solid #6e6e6e";
    navLowBarContainer.style.borderTop = "none";
  } else {
    navLowBarContainer.style.position = 'static';
    navLowBarContainer.style.border = "none";
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