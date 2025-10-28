/**
 * Archivo de definición de la clase Productos
 * 
 */
const ConfigProducto = Object.freeze({
    VALIDACION: {
        LONGITUD_MINIMA_NOMBRE: 3,
        LONGITUD_MAXIMA_NOMBRE: 30,
        PRECIO_MINIMO: 1,
        STOCK_MINIMO: 0,
        STOCK_MAXIMO: 9999
    },
    MENSAJES_ERROR: {
        ERROR_NOMBRE: `Error, el nombre debe tener entre ${ConfigProducto.VALIDACION.LONGITUD_MINIMA_NOMBRE} y ${ConfigProducto.VALIDACION.LONGITUD_MAXIMA_NOMBRE} caracteres.`,
        ERROR_PRECIO: `Error, el precio mínimo es de ${ConfigProducto.VALIDACION.PRECIO_MINIMO} pesos.`,
        ERROR_TIPO_NOMBRE: `Error, el nombre debe ser del tipo "string"`
    }
})

export class Producto {
    constructor(nombre, descripcion, precio, stock, codigo) {
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
        }
        if (
            nuevoNombre.length < ConfigProducto.VALIDACION.LONGITUD_MINIMA_NOMBRE ||
            nuevoNombre.length > ConfigProducto.VALIDACION.LONGITUD_MINIMA_NOMBRE
        ){
            throw new TypeError(ConfigProducto.MENSAJES_ERROR.ERROR_NOMBRE)
        }
    }

    static crearProductoDesdeJson(datosJson) {
        const { nombre, descripcion, precio, stock, codigo } = JSON.parse(datosJson);

    }
}

