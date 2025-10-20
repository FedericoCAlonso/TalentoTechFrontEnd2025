import { agregarProducto } from "./carrito.js";

const carrito = [{nombre: "papa", precio: 123}];

const programa = () => {
    console.log("1. Agregar producto");

    let opcion = prompt("Elige una opcion:")

    if (opcion === "1"){
        let nombre = prompt("Nombre del producto:");
        let precio = parseInt(prompt("Precio del producto"));
        
        /* se pueden definir objetos sueltos, se puede hacer
        como dice en el código, o bien, explicitar:
        const producto = {nombreProducto: nombre, precioProducto: precio*/
        const producto = {nombre, precio}; 

        agregarProducto(producto, carrito);
    }
};

programa();