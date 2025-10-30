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


/**
 * El constructor recibe la clase del producto a inventariar.
 * El inventario solo aceptará instancias de esa clase. 
 * Hago esto para que el inventario sea independiente de la clase producto. Respeta el principio
 * de inversión de dependencias (DIP) de SOLID. En JS no hay interfaces, así que hago comprobaciones en tiempo de ejecución.
 */
export class Inventario {
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
    /** Las siguientes son las operaciones del inventario:
     * agregarProducto
     * buscarPorCodigo
     * listarProductos
     * eliminarProducto
     * toJson
     * toString
     * cargarDesdeArray
     * Para cumplir con la funcionalidad básica de un inventario.
     */

    /**
     * Agrega un nuevo producto al inventario.
     * @param {Object} nuevoProducto - El producto a agregar.
     * @throws {TypeError} Si el producto no es una instancia de la clase esperada.
     */

    agregarProducto(nuevoProducto) {
        if (!(nuevoProducto instanceof this.#claseDeProducto)) {
            throw new TypeError('Error. incompatibilidad de clase cargada');
        }
        this.#productos.push(nuevoProducto);
    }
      

    /**
     * Busca un producto por su código.
     * @param {*} codigo - El código del producto a buscar.
     * @returns {Object|null} El producto encontrado o null si no existe.
     */
    buscarPorCodigo(codigo) {
        return this.#productos.find(p => p.codigo === codigo) || null;
    }
    
    /**
     * Lista todos los productos en el inventario.
     * @returns {Array} Arreglo de productos.
     */ 
    listarProductos() {
        /** esta notación ... es una "spread syntax" (equivalente a "*" de python) que permite crear una copia superficial del arreglo.
         * Esto es para evitar que el código externo modifique el arreglo interno del inventario directamente.
         * Se recomienda usar esta técnica siempre que se necesite exponer una colección interna.
         * Sin embargo, es importante tener en cuenta que esto no protege contra modificaciones en los objetos dentro del arreglo.
         * Ya que los objetos son referencias, si se modifica un objeto obtenido del arreglo copiado, se modificará el objeto original en el inventario.
        */ 
        return [...this.#productos];
    }

    /**
     * Elimina un producto por su código.
     * @param {*} codigo - El código del producto a eliminar.
     * ¿no existe un método nativo de arreglos para borrar un elemento?
     * Si, el método splice() permite eliminar elementos de un arreglo.
     * Entonces, por qué uso filter() en lugar de splice()?
     * Porque splice() requiere conocer el índice del elemento a eliminar, lo que implica buscarlo primero.
     * En cambio, filter() crea un nuevo arreglo excluyendo el elemento con el código dado, lo que es más directo en este caso.
     */

    eliminarProducto(codigo) {
        this.#productos = this.#productos.filter(p => p.codigo !== codigo);
    }

    /**
     * Convierte el inventario a una representación JSON.
     * @returns {string} Representación JSON del inventario.
     */

    toJson() {
        return JSON.stringify(this.#productos.map(p => JSON.parse(p.toJson())));
    }
    /**
     * Agrega una lista de productos desde un arreglo JSON.
     * No confundir con cargarDesdeArray que recibe un array de strings JSON. Que crea una instancia de inventario.
     * 
     * @param {*} jsonArray 
     */
    agregarListadoDesdeJson(jsonArray) {
        const datos = JSON.parse(jsonArray);    
        datos.forEach(item => {
            const producto = this.#claseDeProducto.crearProductoDesdeJson(item);
            this.agregarProducto(producto);
        });
    }

    /**
     * Proporciona una representación en string del inventario.
     * @returns {string} Representación en string del inventario.
     */
    toString() {
        return this.#productos.map(p => p.toString()).join('\n');
    }


    /**
     * Carga un inventario desde un arreglo de representaciones JSON de productos.
     * @param {Function} claseDeProducto - La clase del producto a inventariar.
     * @param {Array} datos - Arreglo de representaciones JSON de productos.
     * @returns {Inventario} Instancia de Inventario con los productos cargados.
     */
    static crearInventarioDesdeArray(claseDeProducto, datos) {

        const listado = new Inventario(claseDeProducto)

        datos.forEach(productoJson => {
            const producto = listado.#claseDeProducto.crearProductoDesdeJson(productoJson);
            listado.agregarProducto(producto);

        })
        return listado;
    }


}