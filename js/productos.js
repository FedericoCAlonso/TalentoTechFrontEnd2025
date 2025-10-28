/**
 * Archivo de definición de la clase Productos
 * 
 */
const VALIDACION = {
        LONGITUD_MINIMA_NOMBRE: 3,
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
        ERROR_TIPO_STOCK:  `Error, el stock debe ser del tipo "number"`
};

const ConfigProducto = Object.freeze({
    VALIDACION,
    MENSAJES_ERROR
    
});

export class Producto {
    constructor(
        nombre, 
        descripcion, 
        precio, 
        stock, 
        codigo
    ) {
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._precio = precio;
        this._stock = stock;
        this._codigo = codigo;
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
        this._nombre = nuevoNombre;
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
        this._nombre = nuevaDescripcion;
    }
    set precio(nuevoPrecio){
        if( typeof nuevoPrecio !== 'number') {
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_TIPO_PRECIO);
        };
        if( nuevoPrecio < ConfigProducto.VALIDACION.PRECIO_MINIMO) {
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_PRECIO);
        };
        this._precio = nuevoPrecio;
 
    }
    set stock(nuevoStock){
        if( typeof nuevoStock !== 'number'){
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_TIPO_STOCK);
        }
        if( 
            nuevoStock < ConfigProducto.VALIDACION.STOCK_MINIMO ||
            nuevoStock > ConfigProducto.VALIDACION.STOCK_MAXIMO
        ){
            throw new TypeError(ConfigProducto.ERROR_STOCK)
        }
    }
    set codigo

    static crearProductoDesdeJson(datosJson) {
        const { nombre, descripcion, precio, stock, codigo } = JSON.parse(datosJson);
        

    }
}

