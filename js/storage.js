cosnt KEY = "carrito";

export const guardarCarrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito));
}

export const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem(KEY)) || []; //falsy devuelve array vacío
}

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY);
}