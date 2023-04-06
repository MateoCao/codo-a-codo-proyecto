// Lo verde son comentarios, como en HTML, pero en js se hacen con las barritas //

// Declaro la constante API_URL y la igualo a la URL de la API. Basicamente API_URL "se convierte en al URL de la página de la API. Así se me hace más práctico trabajar con al URL de la API sin tener que copiarla"

const API_URL = "https://fakestoreapi.com";

// Selecciono la etiqueta main en el index.html mediante la id

const HTMLresponse = document.querySelector("#products-container");

// Creo una etiqueta/elemento div "padre" 

const div = document.createElement("div");

// Uso la API con fetch, especificamente los productos

fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((products) => {  
      
      /* 
        El "forEach()" es un método, lo que hace básicamente es crear un bucle que recorre los elementos de un array (un array es un tipo de dato que permite almacenar otros datos de una 
        manera ordenada. Si quieren fijense en la consola del navegador, ahí les va a salir todos los productos en forma de array). Por cada elemento que existe en el array (en este caso son 20),
        va a crear 3 etiquetas html (div, img, a. Esto lo hice así para hacer las cosas más fáciles y rápidas y no ir creando las etiquetas html necesarias manualmente, una por una. Igualmente creeo
        que es "buena práctica" hacerlo así)
      
      */
      products.forEach((product)=> {

        //Creo los elementos div, img y a y los igualo a variables 

          let elem = document.createElement("div");
          let img = document.createElement("img");
          let productLink = document.createElement("a");

        /* Creo un nodo de texto para la etiqueta <a>. Un nodo de texto en este caso es el texto que uno escribe dentro de la etiqueta.
        Es como si estuviera escribiendo en el html <a href="URL del producto"> Click acá </a> 
        */

          productLink.appendChild(
            document.createTextNode(`Click acá`)
          )

        // Le doy una clase a los divs que creé anteriormente. Esto escrito en el html sería así <div class="hola"> Nombre del producto, Precio del producto </div>
          elem.classList.add("hola");

        /* Acá tmb creo un nodo de texto. Cuando escribo ${product.title}, ${product.price}, toy seleccionando el titulo y precio de cada producto en cada recorrida del array. Entonces de esta
        manera cada div creado tiene su correspondiente nombre y precio (igual esto despues vemos si lo cambiamos, lo puse para ver si andaba y si me acordaba como hacerlo)
        */
          
          elem.appendChild(
          document.createTextNode(`${product.title}, ${product.price}`)
          );

        // Acá le doy una clase a las etiquetas <img>. Lo de las clases lo hice para darle estilos con CSS.

          img.classList.add("img-product");

        /* con .setAtrribute() se puede cambiar los parámetros de las etiquetas html, pide 2 datos a completar. Primero el parámetro (en este caso src) y después el valor. En este caso es la URL
        de la imagen de cada producto. Esto se lo hice a la etiqueta <img>
        */

          img.setAttribute("src", `${product.image}`);

        /* 
            Acá hago lo mismo que antes, pero con la etiqueta <a> </a>. Cambio el valor de href por la URL de cada producto. (Hay algunas que no andan porque no creé los archivos HTML. 
            Esas páginas no tienen hoja de estilos, pero solamente para esas crearíamos un archivo css para todas, total son todas iguales. Si le agregamos 1 página para cada producto obvio que
            tendríamos mucho más que las 4 que nos piden pero supongo que contarían como una jajaja. )
        */

          productLink.setAttribute("href", `product-pages/${product.title}.html`);

        /* 
          con .appendChild() lo que se hace es insertar un nodo (la etiqueta), como hijo de otra etiqueta. En el primer caso la variable img que es la etiqueta <img> queda como hijo de elem
           que sería la etiqueta <div>. Esto todo lo había declarado antes, al principio del bucle. 
        */

          elem.appendChild(img);
          elem.appendChild(productLink);

          // La variable div es la etiqueta <div>  padre que había creado fuera de la variable, antes del fetch. Hago lo mismo que arriba.

          div.appendChild(elem);

          // Acá le doy una clase a la etiqueta div padre

          div.classList.add("products-total-container");
      });

      /* 
        Y acá por último defino como hija a la etiqueta div padre con respecto a la etiqueta main ya creada en el documento html y de esta forma inserto todo este quilombo de arriba en el
        documento HTML
      */

      HTMLresponse.appendChild(div);

      // El console.log() sirve para mostrar algo en consola. En este caso le pasé "products", que sería todo el array con todos los productos. No modifica nada de la página.

      console.log(products);
});

/* 
  Dejo el código completo sin los comentarios:

const API_URL = "https://fakestoreapi.com";

const HTMLresponse = document.querySelector("#products-container");
const div = document.createElement("div");


fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((products) => {         
      products.forEach((product)=> {

          let elem = document.createElement("li");
          let img = document.createElement("img");
          let productLink = document.createElement("a");

          productLink.appendChild(
            document.createTextNode(`Click acá`)
          )
          elem.classList.add("hola")
          elem.appendChild(
          document.createTextNode(`${product.title}, ${product.price}`)
          );
          img.classList.add("img-product");
          img.setAttribute("src", `${product.image}`);
          productLink.setAttribute("href", `product-pages/${product.title}.html`)
          elem.appendChild(img);
          elem.appendChild(productLink);
          div.appendChild(elem);
          div.classList.add("products-total-container");
      });

      HTMLresponse.appendChild(div);
      console.log(products)
});
*/