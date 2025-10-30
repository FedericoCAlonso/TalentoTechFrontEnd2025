/**
 * Archivo productos.js
 * Archivo de definición de la clase Productos
 * 
 */
const VALIDACION = {
        LONGITUD_MINIMA_NOMBRE: 2,
        LONGITUD_MAXIMA_NOMBRE: 30,
        LONGITUD_MINIMA_DESCRIPCION: 3,
        LONGITUD_MAXIMA_DESCRIPCION: 200,
        PRECIO_MINIMO: 1,
        STOCK_MINIMO: 0,
        STOCK_MAXIMO: 9999
};
const MENSAJES_ERROR = {
        ERROR_NOMBRE: `Error, el nombre debe tener entre ${VALIDACION.LONGITUD_MINIMA_NOMBRE} y ${VALIDACION.LONGITUD_MAXIMA_NOMBRE} caracteres.`,
        ERROR_PRECIO: `Error, el precio mínimo es de ${VALIDACION.PRECIO_MINIMO} pesos.`,
        ERROR_TIPO_NOMBRE: `Error, el nombre debe ser del tipo "string"`,
        ERROR_TIPO_PRECIO: `Error, el precio debe ser del tipo "number"`,
        ERROR_DESCRIPCION: `Error, es obligatorio el ingreso de la descripción.`,
        ERROR_TIPO_DESCRIPCION: `Error, la descripciòn debe ser del tipo "string"`,
        ERROR_STOCK: `Error, el stock debe estar entre ${VALIDACION.STOCK_MINIMO} y ${VALIDACION.STOCK_MAXIMO}`,
        ERROR_TIPO_STOCK:  `Error, el stock debe ser del tipo "number"`,
        ERROR_CODIGO: `Error, código null`,
        ERROR_CONSTRUCTOR: `Error, constructor de uso interno, no puede ser llamado de afuera de la clase`
};
/** hago que no se pueda modificar */
export const ConfigProducto = Object.freeze({
    VALIDACION,
    MENSAJES_ERROR
    
});

/* protejo al constructor para que no se pueda instanciar diréctamente con new. Solo por el factory */
const _token =  Symbol('claveDeConstructor');

export class Producto {

    #nombre;
    #descripcion;
    #precio;
    #stock;
    #codigo;
    constructor(
        nombre, 
        descripcion, 
        precio, 
        stock, 
        codigo,
        llave
    ) {
        if(llave !== _token){
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_CONSTRUCTOR);
        }
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.codigo = codigo;
    }
    /**
     * 
     * setters
     * 
     */
    set nombre(nuevoNombre) {
        if (typeof nuevoNombre !== 'string') {
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_TIPO_NOMBRE);
        };
        if (
            nuevoNombre.length < ConfigProducto.VALIDACION.LONGITUD_MINIMA_NOMBRE ||
            nuevoNombre.length > ConfigProducto.VALIDACION.LONGITUD_MAXIMA_NOMBRE
        ){
            throw new RangeError(ConfigProducto.MENSAJES_ERROR.ERROR_NOMBRE);
        };
        this.#nombre = nuevoNombre.trim();
    }
    set descripcion(nuevaDescripcion){
        if (typeof nuevaDescripcion !== 'string') {
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_TIPO_DESCRIPCION);
        };
        if (
            nuevaDescripcion.length < ConfigProducto.VALIDACION.LONGITUD_MINIMA_DESCRIPCION ||
            nuevaDescripcion.length > ConfigProducto.VALIDACION.LONGITUD_MAXIMA_DESCRIPCION
        ){
            throw new RangeError(ConfigProducto.MENSAJES_ERROR.ERROR_DESCRIPCION);
        };
        this.#descripcion = nuevaDescripcion.trim();
    }
    set precio(nuevoPrecio){
        if( typeof nuevoPrecio !== 'number') {
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_TIPO_PRECIO);
        };
        if( nuevoPrecio < ConfigProducto.VALIDACION.PRECIO_MINIMO) {
            throw new RangeError(ConfigProducto.MENSAJES_ERROR.ERROR_PRECIO);
        };
        this.#precio = nuevoPrecio;
 
    }
    set stock(nuevoStock){
        if( isNaN(nuevoStock)){
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_TIPO_STOCK);
        }
        if( 
            nuevoStock < ConfigProducto.VALIDACION.STOCK_MINIMO ||
            nuevoStock > ConfigProducto.VALIDACION.STOCK_MAXIMO
        ){
            throw new RangeError(ConfigProducto.MENSAJES_ERROR.ERROR_STOCK);
        }
        this.#stock = nuevoStock;
    }
    set codigo(nuevoCodigo){
        if( !nuevoCodigo){
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_CODIGO);
        }
        this.#codigo = nuevoCodigo;
    }

    /** Getters    */

    get nombre(){
        return this.#nombre;
    }
    get descripcion(){
        return this.#descripcion;
    }
    get precio(){
        return this.#precio;
    }
    get stock(){
        return this.#stock;
    }
    get codigo(){
        return this.#codigo;
    }
    /**
     *  Funcionalidades
     */
    toJson(){
        return JSON.stringify({
            nombre: this.#nombre,
            descripcion: this.#descripcion,
            precio: this.#precio,
            stock: this.#stock,
            codigo: this.#codigo
        });
    }
    toString(){
        return this.toJson();
    }
/**
 * 
 * para darle más flexibilidad, si suma con otro número, suma el precio, si hay operaciones entre strings, devuelve el json en string
 */
    [Symbol.toPrimitive](hint){
        switch(hint){
            case 'number':
                return this.#precio;
            case 'string':
                return this.toString();
            case 'default':
                return this.#precio;
            default:
                break;
        }
    }

/**
 * 
 * @param {object} datosJson : es un string de JS con los atributos nombre, descripción, precio, stock, código
 * @returns 
 */

    static crearProductoDesdeJson(datosJson) {
        const { nombre, descripcion, precio, stock, codigo, } = JSON.parse(datosJson);
         /* habilito el uso del constructor */
        return new Producto(nombre, descripcion, parseFloat(precio), parseInt(stock), codigo, _token );

    }
    
}

