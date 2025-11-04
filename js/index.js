import { Producto } from "./Producto.js";
import { Inventario } from "./Inventario.js";


const arregloDeDatosJson = [
    { nombre: "helado Vainilla", descripcion: "Helado sabor vainilla", urlFoto: "./assets/images/prueba.webp", precio: 1500, stock: 20, codigo: "001" },
    { nombre: "helado Chocolate", descripcion: "Helado sabor chocolate", urlFoto: "./assets/images/prueba.webp", precio: 1700, stock: 15, codigo: "002" },
    { nombre: "helado Frutilla", descripcion: "Helado sabor frutilla", urlFoto: "./assets/images/prueba.webp", precio: 1600, stock: 10, codigo: "003" },
    { nombre: "helado Mango", descripcion: "Helado sabor mango", urlFoto: "./assets/images/prueba.webp", precio: 1800, stock: 5, codigo: "004" },
    { nombre: "helado Limón", descripcion: "Helado sabor limón", urlFoto: "./assets/images/prueba.webp", precio: 1400, stock: 8, codigo: "005" },
    { nombre: "helado Menta", descripcion: "Helado sabor menta", urlFoto: "./assets/images/prueba.webp", precio: 1550, stock: 12, codigo: "006" },
    { nombre: "helado Café", descripcion: "Helado sabor café", urlFoto: "./assets/images/prueba.webp", precio: 1750, stock: 7, codigo: "007" },
    { nombre: "helado granizado", descripcion: "Helado sabor crema americana con trozos de chocolate", urlFoto: "./assets/images/prueba.webp", precio: 1650, stock: 9, codigo: "008" },
    { nombre: "helado Dulce de leche", descripcion: "Helado sabor dulce de leche", urlFoto: "./assets/images/prueba.webp", precio: 1850, stock: 11, codigo: "009" },
    { nombre: "helado Pistacho", descripcion: "Helado sabor pistacho", urlFoto: "./assets/images/prueba.webp", precio: 1900, stock: 6, codigo: "010" }
];

const inventarioDeProductos = Inventario.crearInventarioDesdeArray(Producto, arregloDeDatosJson);

/** Nos aseguramos que el html esté cargado antes de comenzar
 * para evitar errores de referencias que puedan no estar 
 * creadas al momento de llamarlas.
 */
document.addEventListener('DOMContentLoaded', ()=>{

    const ofertaProductos = document.getElementById("venta");
    const tituloOferta = document.createElement("h2");
    tituloOferta.textContent = "Nuestros Helados"
    ofertaProductos.appendChild(tituloOferta);
    
    let contenedorProductos = document.createElement("div");
    contenedorProductos.classList.add("productos");
    
    inventarioDeProductos.listarProductos().forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("productos--tarjeta");
    
        const foto = document.createElement("img");
        foto.src = producto.urlFoto;
        foto.alt = producto.nombre;
    
        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;
    
        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;
    
        const precio = document.createElement("p");
        precio.textContent = `Precio: $${producto.precio}`;
    
        tarjeta.appendChild(foto);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        contenedorProductos.appendChild(tarjeta);
    });
    
    ofertaProductos.appendChild(contenedorProductos);
})