import { describe, it, expect } from 'vitest';
import { Producto, ConfigProducto } from '../js/productos.js';

describe('Clase Producto', () => {
    it('crea un producto desde JSON y verifica getters y toJson', () => {
        const json = JSON.stringify({ nombre: 'Pan', descripcion: 'Pan recién hecho', precio: 10, stock: 5, codigo: 'PAN001' });
        const p = Producto.crearProductoDesdeJson(json);
        expect(p.nombre).toBe('Pan');
        expect(p.descripcion).toBe('Pan recién hecho');
        expect(p.precio).toBe(10);
        expect(p.stock).toBe(5);
        expect(p.codigo).toBe('PAN001');
        // toJson produce un string con los campos
        const js = p.toJson();
        expect(typeof js).toBe('string');
        expect(js).toContain('"nombre":"Pan"');
    });

    it('usa el operador numérico y string (Symbol.toPrimitive)', () => {
        const json = JSON.stringify({ nombre: 'Leche', descripcion: 'Entera', precio: 55.5, stock: 2, codigo: 'LEC01' });
        const p = Producto.crearProductoDesdeJson(json);
        // número
        expect(+p).toBeCloseTo(55.5);
        // string
        expect(String(p)).toContain('"nombre":"Leche"');
    });

    it('lanza error si el nombre es muy corto', () => {
        const badJson = JSON.stringify({ nombre: 'a', descripcion: 'desc', precio: 1, stock: 0, codigo: 'C' });
        expect(() => Producto.crearProductoDesdeJson(badJson)).toThrow(RangeError);
    });

    it('lanza TypeError si se invoca el constructor sin la llave (constructor protegido)', () => {
        // intentar llamar al constructor directamente debe fallar por el chequeo de llave
        expect(() => new Producto('NombreValido', 'Desc', 10, 1, 'X')).toThrow(TypeError);
    });

    it('lanza RangeError si el precio es menor al mínimo', () => {
        const badJson = JSON.stringify({ nombre: 'Producto', descripcion: 'Desc', precio: 0, stock: 1, codigo: 'X' });
        expect(() => Producto.crearProductoDesdeJson(badJson)).toThrow(RangeError);
    });

});
