import { Producto } from "./Producto.js";
import { Inventario } from "./Inventario.js";
import Carrito from "./cart.js";

const urlProductos = "./js/datos.json";

let carrito = null; // se inicializa cuando carguemos los datos

function renderizarInterfaz(inventario) {
    const ofertaProductos = document.getElementById("venta");
    ofertaProductos.innerHTML = "";
    const tituloOferta = document.createElement("h2");
    tituloOferta.textContent = "Nuestros Helados";
    ofertaProductos.appendChild(tituloOferta);
    const contenedorProductos = document.createElement("div");
    contenedorProductos.classList.add("productos");
    inventario.listarProductos().forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("productos--tarjeta");
        tarjeta.innerHTML = `
            <img src="${producto.urlFoto}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="btn-add" data-codigo="${producto.codigo}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
    ofertaProductos.appendChild(contenedorProductos);
    contenedorProductos.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add');
        if (!btn) return;
        const codigo = btn.dataset.codigo;
        const producto = inventario.listarProductos().find(p => p.codigo === codigo);
        if (!producto) return;
        carrito.agregarProducto(producto, 1);
        // Actualizar contador directamente
        const cartCountEl = document.querySelector('.cart-count');
        if (cartCountEl) cartCountEl.textContent = carrito.cantidadTotal();
    });
}

async function iniciarApp() {
    try {
        const respuesta = await fetch(urlProductos);
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        const data = await respuesta.json();
        const arregloDeDatosJson = Array.isArray(data)
            ? data
            : (Array.isArray(data?.arregloDeDatosJson) ? data.arregloDeDatosJson : []);
        if (!Array.isArray(arregloDeDatosJson)) {
            throw new Error('Formato de JSON inesperado: se esperaba un array de productos');
        }
        console.log(arregloDeDatosJson);
        const inventarioDeProductos = Inventario.crearInventarioDesdeArray(
            Producto,
            arregloDeDatosJson
        );
        carrito = new Carrito(Producto);
        // Actualizar contador directamente
        const cartCountEl = document.querySelector('.cart-count');
        if (cartCountEl) cartCountEl.textContent = carrito.cantidadTotal();
        renderizarInterfaz(inventarioDeProductos);
    } catch (error) {
        console.error("Error grave iniciando la app:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});