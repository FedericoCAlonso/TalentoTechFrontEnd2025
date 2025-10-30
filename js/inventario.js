/**
 * Archivo: inventario.js
 * La idea de esta clase inventario es que quede separada de la definción de la clase producto.
 * En este caso, lo hago solo para practicar la inyección de dependencias en JS, cosa que 
 * es necesario hacer cuando uno programa profesionalmente. 
 * Por lo que estuve viendo, en JS no hay herramientas para definir interfaces. Creo que 
 * la estrategia acá es hacer comprobación de errores. 
 * 
 * Para usar esta calse, el producto debe tener implementada una fábrica:
 *  static crearProductoDesdeJson(datosJson) 
 * 
 */


class Inventario {
    #productos = [];
    #claseDeProducto;

    constructor(claseDeProducto) {
        if (
            typeof claseDeProducto !== 'function' ||
            !claseDeProducto.crearProductoDesdeJson
        ) {
            throw new Error('Se requiere una clase con el método estático "crearProductoDesdeJson"');  //después centralizo los mensajes de error
        }
        this.#claseDeProducto = claseDeProducto;

    }

    agregarProducto(nuevoProducto) {
        if (!(nuevoProducto instanceof this.#claseDeProducto)) {
            throw new TypeError('Error. incompatibilidad de clase cargada');
        }
        this.#productos.push(nuevoProducto);
    }

    buscarPorCodigo(codigo) {
        return this.#productos.find(p => p.codigo === codigo) || null;
    }

    listarProductos() {
        return [...this.#productos];
    }

    eliminarProducto(codigo) {
        this.#productos = this.#productos.filter(p => p.codigo !== codigo);
    }

    toJson() {
        return JSON.stringify(this.#productos.map(p => JSON.parse(p.toJson())));
    }

    /**
     *  Función factory
     * @param {function} claseDeProducto clase del producto a inventariar
     * @param {Array<object>}datos Arreglo de strings JSon, debe tener los atributos nombre, detalle, precio, stock y codigo
     */
    static cargarDesdeArray(claseDeProducto, datos) {

        const listado = new Inventario(claseDeProducto)

        datos.forEach(productoJson => {
            const producto = listado.#claseDeProducto.crearProductoDesdeJson(productoJson);
            listado.agregarProducto(producto);

        })
        return listado;

    }

}