
import {cargarCarrito, guardarCarrito} from "./storage.js";
import {actualizarContadorCarrito, agregarAlCarrito} from "./utils.js";

const urlProductos = "./js/datos.json";


function renderizarInterfaz(inventario, carrito) {
    const ofertaProductos = document.getElementById("venta");
    ofertaProductos.innerHTML = "";
    const tituloOferta = document.createElement("h2");
    tituloOferta.textContent = "Nuestros Helados";
    ofertaProductos.appendChild(tituloOferta);
    const contenedorProductos = document.createElement("div");
    contenedorProductos.classList.add("productos");
    inventario.forEach(producto => {
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
        const producto = inventario.find(p => p.codigo === codigo);
        if (!producto) return;
        agregarAlCarrito(carrito, producto);
        guardarCarrito(carrito);
        // Actualizar contador directamente
        actualizarContadorCarrito(carrito);
    });
}

async function iniciarApp() {
    try {
        let carrito = [];
        const respuesta = await fetch(urlProductos);
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        const data = await respuesta.json();
        const inventarioDeProductos = Array.isArray(data)
            ? data
            : (Array.isArray(data?.arregloDeDatosJson) ? data.arregloDeDatosJson : []);
        if (!Array.isArray(inventarioDeProductos)) {
            throw new Error('Formato de JSON inesperado: se esperaba un array de productos');
        }
        
        
        carrito = cargarCarrito();
        // Actualizar contador directamente
        
        renderizarInterfaz(inventarioDeProductos,carrito);
        actualizarContadorCarrito(carrito);
    } catch (error) {
        console.error("Error grave iniciando la app:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});


