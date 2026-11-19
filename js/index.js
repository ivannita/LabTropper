import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarProductos = () => {
  const contenedor = document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto) => {
        const tarjetaProducto = document.createElement("article");
        tarjetaProducto.classList.add("card", "text-dark");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        //Creo el título y agrego el contenido
        const tituloProducto = document.createElement("h3");
        tituloProducto.textContent = producto.nombre;

        //Creo el precio y agrego el contenido
        const precioProducto = document.createElement("p");
        precioProducto.textContent = `$${producto.precio}`;
        precioProducto.classList.add("precio-producto");

        //Creo la descripción y agrego el contenido
        const descripcionProducto = document.createElement("d");
        descripcionProducto.textContent = producto.descripcion;

        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-primary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        tarjetaProducto.appendChild(img);
        tarjetaProducto.appendChild(tituloProducto);
        tarjetaProducto.appendChild(precioProducto);
        tarjetaProducto.appendChild(descripcionProducto);
        tarjetaProducto.appendChild(boton);

        contenedor.appendChild(tarjetaProducto);
      });
    })
    .catch((error) => console.log(error));
};

document.addEventListener("DOMContentLoaded", () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);
  renderizarProductos();
});
