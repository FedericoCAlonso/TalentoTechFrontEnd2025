import Carrito from './cart.js';
import { Producto } from './Producto.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = new Carrito(Producto);
    const container = document.getElementById('cart-container');
    const totalEl = document.getElementById('cart-total');
    const clearBtn = document.getElementById('cart-clear');

    function updateNavCount() {
        const nav = document.querySelector('nav-bar');
        if (nav && typeof nav.updateCartCount === 'function') {
            nav.updateCartCount(cart.cantidadTotal());
        }
    }

    function render() {
        const items = cart.listarItems();
        if (!items.length) {
            container.innerHTML = '<p>El carrito está vacío.</p>';
            totalEl.textContent = '0';
            updateNavCount();
            return;
        }

        const rows = items.map(it => {
            return `
                <tr data-codigo="${it.producto.codigo}">
                    <td><img class="cart-thumb" src="${it.producto.urlFoto}" alt="${it.producto.nombre}"></td>
                    <td>${it.producto.nombre}</td>
                    <td>$${it.producto.precio}</td>
                    <td>
                        <button class="qty-decrease">-</button>
                        <input class="qty-input" type="number" min="1" value="${it.cantidad}"> 
                        <button class="qty-increase">+</button>
                    </td>
                    <td class="subtotal">$${it.producto.precio * it.cantidad}</td>
                    <td><button class="remove-item">Eliminar</button></td>
                </tr>
            `;
        }).join('');

        container.innerHTML = `
            <table>
                <thead>
                    <tr><th></th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;

        totalEl.textContent = cart.total();
        updateNavCount();
    }

    // Delegación de eventos para botones dentro del contenedor
    container.addEventListener('click', (e) => {
        const tr = e.target.closest('tr');
        if (!tr) return;
        const codigo = tr.dataset.codigo;
        if (e.target.matches('.remove-item')) {
            cart.eliminarProducto(codigo);
            render();
            return;
        }
        if (e.target.matches('.qty-decrease')) {
            const input = tr.querySelector('.qty-input');
            const nueva = Math.max(1, Number(input.value) - 1);
            cart.actualizarCantidad(codigo, nueva);
            render();
            return;
        }
        if (e.target.matches('.qty-increase')) {
            const input = tr.querySelector('.qty-input');
            const nueva = Number(input.value) + 1;
            cart.actualizarCantidad(codigo, nueva);
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
            cart.actualizarCantidad(codigo, nueva);
            render();
        }
    });

    clearBtn?.addEventListener('click', () => {
        if (!confirm('¿Vaciar el carrito?')) return;
        cart.limpiar();
        render();
    });

    // Render inicial
    render();
});

