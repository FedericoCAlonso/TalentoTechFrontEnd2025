/**
 * Como no puedo hacer clases porque "es muy avanzado", tengo que hacer estos engendros.
 * Acá, carrito es un array de objetos "productos"
 * 
 * 
 */

export function actualizarContadorCarrito(carrito) {
    const cartCountEl = document.querySelector('.cart-count');
    const cantidad = (Array.isArray(carrito) ?carrito :[]).reduce((acc, item) => acc + item.cantidad, 0);
    if (cartCountEl) cartCountEl.textContent = cantidad;

}
export function cantidadTotalCarrito(carrito) {
    return (Array.isArray(carrito) ?carrito :[]).reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
}   

/**
 * Agrega un producto al carrito
 * Si el producto ya existe, suma la cantidad
 * Si no existe, lo agrega como nuevo item
 *
 */
export function agregarAlCarrito(carrito, producto, cantidad = 1) {
    // Buscar si el producto ya existe en el carrito
    const itemExistente = carrito.find(item => item.producto.codigo === producto.codigo);
    
    if (itemExistente) {
        // Si existe, sumar la cantidad
        itemExistente.cantidad += cantidad;
    } else {
        // Si no existe, agregarlo como nuevo item
        carrito.push({
            producto: producto,
            cantidad: cantidad
        });
    }    
    return carrito;
}

export function actualizarCantidadProductoCarrito(carrito, codigo, nuevaCantidad) {
    const item = carrito.find(item => item.producto.codigo === codigo);   

    if (item) {
        if (nuevaCantidad <= 0) {
            // Eliminar el producto si la cantidad es 0 o menor
            const index = carrito.indexOf(item);
            if (index !== -1) {
                carrito.splice(index, 1);
            }
        } else {
            item.cantidad = nuevaCantidad;
        }   
    }
    return carrito;
}


export function limpiarCarrito(carrito) {
    carrito.length = 0;
}