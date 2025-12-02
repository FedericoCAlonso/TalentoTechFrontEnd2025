import { actualizarContadorCarrito, actualizarCantidadProductoCarrito,cantidadTotalCarrito, limpiarCarrito } from "./utils.js";
import { cargarCarrito, guardarCarrito } from "./storage.js";


/**
 * La variable carrito es un array de objetos con esta forma:
 * 
 *    { 
 *          nombre: "nombre del producto", ,
 *          descripcion: "descripcion del producto",
 *          urlFoto: "ruta/de/la/foto.jpg",
 *          precio: precioUnitario,
 *          stock: cantidadEnStock,
 *          codigo: "codigoUnico",
 *    },
 *  Puede haber múltiples entradas con el mismo producto, en cuyo caso
 *  la cantidad de ese producto es la suma de las cantidades de cada entrada.
 * */



const container = document.getElementById('cart-container');
const totalEl = document.getElementById('cart-total');
const clearBtn = document.getElementById('cart-clear');
const carrito = cargarCarrito();
actualizarContadorCarrito(carrito);

function render() {
    ;
    if (!carrito.length) {
        container.innerHTML = '<p>El carrito está vacío.</p>';
        totalEl.textContent = '0';
        actualizarContadorCarrito(carrito);
        return;
    }

    const rows = carrito.map(it => {
        console.log(it);

        return `
                <tr data-codigo="${it.producto.codigo}">
                    <td><img class="cart-thumb" src="../${it.producto.urlFoto}" alt="${it.producto.nombre}"></td>
                    <td>${it.producto.nombre}</td>
                    <td>$${it.producto.precio}</td>
                    <td>
                        <button class="qty-decrease">-</button>
                        <input class="qty-input" type="number" min="1" value="${it.cantidad}"> 
                        <button class="qty-increase">+</button>
                    </td>
                    <td class="subtotal">$${parseFloat(it.producto.precio) * it.cantidad}</td>
                    <td><button class="remove-item">Eliminar</button></td>
                </tr>
            `;
    }).join('');

    container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;

    totalEl.textContent = cantidadTotalCarrito(carrito).toString();
    actualizarContadorCarrito(carrito);
}

// Delegación de eventos para botones dentro del contenedor
container.addEventListener('click', (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const codigo = tr.dataset.codigo;
    if (e.target.matches('.remove-item')) {
        actualizarCantidadProductoCarrito(carrito, codigo, 0);
        guardarCarrito(carrito);
        
        render();
        return;
    }
    if (e.target.matches('.qty-decrease')) {
        const input = tr.querySelector('.qty-input');
        const nueva = Math.max(1, Number(input.value) - 1);
        actualizarCantidadProductoCarrito(carrito,codigo, nueva);
        guardarCarrito(carrito);
        
        render();
        return;
    }
    if (e.target.matches('.qty-increase')) {
        const input = tr.querySelector('.qty-input');
        const nueva = Number(input.value) + 1;
        actualizarCantidadProductoCarrito(carrito, codigo, nueva);
        guardarCarrito(carrito);
        
        render();
        return;
    }
});

// Escuchar cambios directos en inputs
container.addEventListener('change', (e) => {
    if (e.target.matches('.qty-input')) {
        const tr = e.target.closest('tr');
        const codigo = tr.dataset.codigo;
        let nueva = Number(e.target.value);
        if (isNaN(nueva) || nueva < 1) nueva = 1;
        actualizarCantidadProductoCarrito(carrito,codigo, nueva);
        guardarCarrito(carrito);
        render();
    }
});

clearBtn?.addEventListener('click', () => {
    if (!confirm('¿Vaciar el carrito?')) return;
    limpiarCarrito(carrito);
    guardarCarrito(carrito);
    render();
});


document.addEventListener('DOMContentLoaded', render);

