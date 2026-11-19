import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  //sin productos
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "Tu carrito está vacío";

    contenedor.appendChild(mensaje);

    return;
  }

  //si hay productos
  carrito.forEach((producto, index) => {
    const tarjetaProducto = document.createElement("article");
    tarjetaProducto.classList.add("card");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
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

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "bg-primary", "text-btn");
    btnEliminar.classList.add("btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    tarjetaProducto.appendChild(img);
    tarjetaProducto.appendChild(tituloProducto);
    tarjetaProducto.appendChild(precioProducto);
    tarjetaProducto.appendChild(descripcionProducto);
    tarjetaProducto.appendChild(btnEliminar);

    contenedor.appendChild(tarjetaProducto);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.classList.add("btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
