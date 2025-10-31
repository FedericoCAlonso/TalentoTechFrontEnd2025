import { describe, it, expect } from 'vitest';
import { Producto } from '../js/Producto.js';
import { Inventario } from '../js/Inventario.js';

describe('Clase Inventario e integración con Producto', () => {
    it('constructor lanza si no recibe clase con crearProductoDesdeJson', () => {
        expect(() => new Inventario({})).toThrow(Error);
    });

    it('agregarProducto valida instancia y listar/buscar/eliminar funcionan', () => {
        const pJson = JSON.stringify({ nombre: 'Queso', descripcion: 'Queso tipo', precio: 150, stock: 3, codigo: 'Q01' });
        const p = Producto.crearProductoDesdeJson(pJson);

        const inv = new Inventario(Producto);
        // agregar producto válido
        inv.agregarProducto(p);
        const listado = inv.listarProductos();
        expect(listado.length).toBe(1);
        expect(listado[0].codigo).toBe('Q01');

        // buscar por codigo
        const encontrado = inv.buscarPorCodigo('Q01');
        expect(encontrado).not.toBeNull();
        expect(encontrado.codigo).toBe('Q01');

        // eliminar
        inv.eliminarProducto('Q01');
        expect(inv.buscarPorCodigo('Q01')).toBeNull();
        expect(inv.listarProductos().length).toBe(0);
    });

    it('agregarProducto lanza TypeError si la clase no coincide', () => {
        // crear una clase distinta con la misma API pero distinta identidad
        class OtroProducto {
            constructor(nombre, descripcion, precio, stock, codigo) {
                this.nombre = nombre;
                this.descripcion = descripcion;
                this.precio = precio;
                this.stock = stock;
                this.codigo = codigo;
            }
            static crearProductoDesdeJson(j) {
                const { nombre, descripcion, precio, stock, codigo } = JSON.parse(j);
                return new OtroProducto(nombre, descripcion, Number(precio), Number(stock), codigo);
            }
        }
        const inv = new Inventario(Producto);
        const pJson = JSON.stringify({ nombre: 'Miel', descripcion: 'Dulce', precio: 50, stock: 10, codigo: 'M01' });
        // crear una instancia de otra clase (no es instance of Producto)
        const otraInstancia = OtroProducto.crearProductoDesdeJson(pJson);
        expect(() => inv.agregarProducto(otraInstancia)).toThrow(TypeError);
    });

    it('toJson y cargarDesdeArray integran correctamente', () => {
        const datos = [
            JSON.stringify({ nombre: 'Yerba', descripcion: '50-50', precio: 800, stock: 2, codigo: 'Y01' }),
            JSON.stringify({ nombre: 'Azucar', descripcion: 'Blanca', precio: 120, stock: 5, codigo: 'A01' })
        ];
        const inv = Inventario.crearInventarioDesdeArray(Producto, datos);
        const json = inv.toJson();
        expect(typeof json).toBe('string');
        const arr = JSON.parse(json);
        expect(Array.isArray(arr)).toBe(true);
        expect(arr.length).toBe(2);
        expect(arr.find(x => x.codigo === 'Y01')).toBeTruthy();
        expect(arr.find(x => x.codigo === 'A01')).toBeTruthy();
    });

    it('agregarListadoDesdeJson y toString funcionan correctamente', () => {
        const jsonItems = [
            JSON.stringify({ nombre: 'Cafe', descripcion: 'Molido', precio: 500, stock: 4, codigo: 'C01' }),
            JSON.stringify({ nombre: 'Té', descripcion: 'Negro', precio: 200, stock: 6, codigo: 'T01' })
        ];
        // crear un JSON array de strings (cada elemento es a su vez un string JSON)
        const jsonArray = JSON.stringify(jsonItems);

        const inv = new Inventario(Producto);
        inv.agregarListadoDesdeJson(jsonArray);

        // comprobar que los productos fueron agregados
        expect(inv.listarProductos().length).toBe(2);
        expect(inv.buscarPorCodigo('C01')).toBeTruthy();
        expect(inv.buscarPorCodigo('T01')).toBeTruthy();

        // toString debe contener las representaciones JSON de los productos
        const s = inv.toString();
        expect(typeof s).toBe('string');
        expect(s).toContain('"nombre":"Cafe"');
        expect(s).toContain('"nombre":"Té"');
    });
});
