/**
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


class Inventario{
    #productos = [];
    #claseDeProducto;

    constructor(claseDeProducto){
        if(
            typeof claseDeProducto !== 'function' || 
            !claseDeProducto.crearProductoDesdeJson
        ){
            throw new Error('Se requiere una clase con el método estático "crearDesdeJson"');  //después centralizo los mensajes de error
        }
        this.#claseDeProducto = claseDeProducto;

    }

  /**
   * 
   * @param {function} claseDeProducto clase del producto a inventariar
   * @param {Array<object>}datos Arreglo de objetos ya parseados, debe tener los atributos nombre, detalle, precio, stock y codigo
   */
    static cargarDesdeArray(claseDeProducto,datos){
     
        datos.forEach( productoJson => {
            const producto = claseDeProducto.;
        })

    }



}