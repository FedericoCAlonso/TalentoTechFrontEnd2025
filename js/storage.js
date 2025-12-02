const key = "carrito";

export function cargarCarrito() {
    return JSON.parse(localStorage.getItem(key)) || [];
}
export function guardarCarrito(carrito) {
    localStorage.setItem(key, JSON.stringify(carrito));
}
