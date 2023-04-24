// API

const API_URL = "https://fakestoreapi.com";

// Creando nodos DOM

const body = document.querySelector("#root");
const main = document.querySelector("#probando123");
const HTMLresponse = document.querySelector("#products-total-container");
const productsContainer = document.createElement("div");
const productsTitleContainer = document.querySelector("#products-title");
let productsTitle = "Productos destacados";

// Selección de categoría

const productsWomenClothing = document.querySelector("#women-clothing");
const productsMenClothing = document.querySelector("#men-clothing");
const productsJewelery = document.querySelector("#jewelery");
const productsElectronics = document.querySelector("#electronics");
const productMostRated = document.querySelector("#most-rated");
let productValue = "most rated";

//Mostrando y eligiendo categoria

mostrarProductosCategorias();

productsWomenClothing.addEventListener("click", () => {
  borrarContenido();
  productsTitle = "Indumentaria mujer";
  productValue = "women's clothing";
  mostrarProductosCategorias();
})

productsMenClothing.addEventListener("click", () => {
  borrarContenido();
  productsTitle = "Indumentaria hombre";
  productValue = "men's clothing";
  mostrarProductosCategorias();
})

productsJewelery.addEventListener("click", () => {
  borrarContenido();
  productsTitle = "Accesorios";
  productValue = "jewelery";
  mostrarProductosCategorias();
})

productsElectronics.addEventListener("click", () => {
  borrarContenido();
  productsTitle = "Tecnología";
  productValue = "electronics";
  mostrarProductosCategorias();
})

productMostRated.addEventListener("click", () => {
  borrarContenido();
  productsTitle = "Productos destacados";
  productValue = "most rated";
  mostrarProductosCategorias();
})

// // Limpiar contenido página

const borrarContenido = () => {
  productsContainer.innerHTML = "";
  productsTitleContainer.innerHTML = "";
  footer.innerHTML = "";
}

//FOOTER

const footer = document.createElement("footer");
footer.classList.add("footer-container");



// Consumo de 

function mostrarProductosCategorias() {
  fetch(`${API_URL}/products`)
  .then((res) => res.json())
  .then((products) => {

    let filteredProducts;

    if(productValue == "most rated") {
      filteredProducts = products.filter(product => product.rating.rate >= 4.2);
    } else {
      filteredProducts = products.filter(product => product.category === productValue);
    }
    
    filteredProducts.forEach((product)=> {

      // Creando nodos DOM

      let productPriceContainer = document.createElement("div");
      let productItemContainer = document.createElement("a");
      let productItem = document.createElement("div");
      let productNameContainer = document.createElement("div");
      let productRatingContainer = document.createElement("div");
      let productImgContainer = document.createElement("div");
      let productImgTotalContainer = document.createElement("div");
      let productName = document.createElement("h3");
      let productPrice = document.createElement("h4");
      let productRating = document.createElement("h4")
      let productImg = document.createElement("img");

      productName.appendChild(
        document.createTextNode(product.title)
      );

      productPrice.appendChild(
        document.createTextNode(`Precio: $${product.price}`)
      );

      productRating.appendChild(
        document.createTextNode(`Rating: ${product.rating.rate}`)
      )

      // Dando clases y atributos

      productItemContainer.setAttribute("href", `product-pages/${product.title}.html`);
      productItemContainer.classList.add("main__product-item-container")
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
      productImgTotalContainer.appendChild(productImgContainer)
      productItem.appendChild(productImgTotalContainer);
      productItem.appendChild(productNameContainer);
      productItem.appendChild(productPriceContainer);
      productItem.appendChild(productRatingContainer);
      productItemContainer.appendChild(productItem);
      productsContainer.appendChild(productItemContainer);

        
        
    });

    productsTitleContainer.appendChild(
      document.createTextNode(productsTitle)
    );

    HTMLresponse.appendChild(productsTitleContainer);
    HTMLresponse.appendChild(productsContainer);
    main.appendChild(HTMLresponse);
    body.style.height = `${productsContainer.offsetHeight}px`
    body.appendChild(main);
    body.appendChild(footer);
    console.log(products);
});
};



// Login display

const myAccount = document.querySelector("#my-account");
const login = document.querySelector("#login-display");
const closeLogin = document.querySelector("#close-login");

myAccount.addEventListener("click", () => {
  login.classList.add("visible")
})

closeLogin.addEventListener("click", () => {
  login.classList.remove("visible")
})

//Categorias productos hamburguesa

const navProductsMenu = document.querySelector("#products-categories");
const productsButton = document.querySelector("#products-button");

productsButton.addEventListener("mouseover", () => {
  navProductsMenu.classList.add("visible")
})

navProductsMenu.addEventListener("mouseleave", () => {
  navProductsMenu.classList.remove("visible")
})

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
    navLowBarContainer.style.border = "none"
  }
}

window.addEventListener('scroll', handleScroll);