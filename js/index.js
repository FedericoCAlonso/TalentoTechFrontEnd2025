import { Producto } from "./Producto.js";
import { Inventario } from "./Inventario.js";
import Carrito from "./cart.js";

const urlProductos = "./js/datos.json";


let carrito = null; // se inicializa cuando carguemos los datos

function renderizarInterfaz(inventario) {
    const ofertaProductos = document.getElementById("venta");
    
    // Limpiamos por si acaso se llama dos veces
    ofertaProductos.innerHTML = ""; 

    const tituloOferta = document.createElement("h2");
    tituloOferta.textContent = "Nuestros Helados";
    ofertaProductos.appendChild(tituloOferta);
    
    const contenedorProductos = document.createElement("div");
    contenedorProductos.classList.add("productos");
    
    inventario.listarProductos().forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("productos--tarjeta");
        // Añadimos botón "Agregar al carrito" y atributo data-codigo para identificar el producto
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

    // Delegación de eventos para los botones Agregar al carrito
    contenedorProductos.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add');
        if (!btn) return;
        const codigo = btn.dataset.codigo;
        const producto = inventario.listarProductos().find(p => p.codigo === codigo);
        if (!producto) return;
        carrito.agregarProducto(producto, 1);
        // actualizar contador en la barra de navegación
        const nav = document.querySelector('nav-bar');
        if (nav && typeof nav.updateCartCount === 'function') {
            nav.updateCartCount(carrito.cantidadTotal());
        }
    });
}

// No me siento cómodo usando fetch().then()
// por eso hice la función asíncrona
async function iniciarApp() {
    try {
        //Pedimos los datos y ESPERAMOS (await)
        const respuesta = await fetch(urlProductos);
        
        //Verificamos que la petición fue exitosa (status 200-299)
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }

        //Convertimos a JSON y ESPERAMOS (await)
        //
        const data = await respuesta.json();
        // Tuve un error con la interpretación del arcivo de datos
        // Yo interpreté que devolvía un array de objetos, y resulta
        // que devolvía un objeto con un array de objetos...
        // Entonces
        // Soportar dos formatos comunes del archivo JSON:
        // 1) un array en la raíz: [ { ... }, { ... } ]
        // 2) un objeto con la propiedad "arregloDeDatosJson": { "arregloDeDatosJson": [ ... ] }
        const arregloDeDatosJson = Array.isArray(data)
            ? data
            // data?.arregloDeDatosJson uso el operador ?. de encadenamiento condicional
            // por si el dato no tiene ese objeto, de modo que no se rompa la ejecución.
            : (Array.isArray(data?.arregloDeDatosJson) ? data.arregloDeDatosJson : []);
        if (!Array.isArray(arregloDeDatosJson)) {
            throw new Error('Formato de JSON inesperado: se esperaba un array de productos');
        }
        console.log(arregloDeDatosJson);

        // Generamos el inventario, ahora si, con el arreglo de datos
        const inventarioDeProductos = Inventario.crearInventarioDesdeArray(
            Producto, 
            arregloDeDatosJson
        );

        // Inicializar carrito (persistente)
        carrito = new Carrito(Producto);

        // actualizar contador en la navbar si existe
        const navInit = document.querySelector('nav-bar');
        if (navInit && typeof navInit.updateCartCount === 'function') {
            navInit.updateCartCount(carrito.cantidadTotal());
        }

        // renderizamos
        renderizarInterfaz(inventarioDeProductos);

    } catch (error) {
        console.error("Error grave iniciando la app:", error);
       
    }
}

// 3. Evento de carga
document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});