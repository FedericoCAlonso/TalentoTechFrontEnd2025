import { Producto } from './Producto.js';

export class Carrito {
    #items = []; // { producto: Producto, cantidad: number }
    #ProductoClass;

    constructor(ProductoClass = Producto) {
        this.#ProductoClass = ProductoClass;
        this._load();
    }

    _load() {
        const raw = localStorage.getItem('carrito');
        if (!raw) return;
        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return;
            this.#items = parsed.map(({ producto, cantidad }) => ({
                producto: this.#ProductoClass.crearProductoDesdeJson(producto),
                cantidad: Number(cantidad)
            }));
        } catch (e) {
            console.error('Error cargando carrito desde localStorage', e);
            this.#items = [];
        }
    }

    _save() {
        const serializable = this.#items.map(it => ({
            producto: JSON.parse(it.producto.toJson()),
            cantidad: it.cantidad
        }));
        localStorage.setItem('carrito', JSON.stringify(serializable));
    }

    agregarProducto(producto, cantidad = 1) {
        const existente = this.#items.find(it => it.producto.codigo === producto.codigo);
        if (existente) {
            existente.cantidad = Math.min(existente.cantidad + cantidad, producto.stock);
        } else {
            this.#items.push({ producto, cantidad: Math.min(cantidad, producto.stock) });
        }
        this._save();
    }

    actualizarCantidad(codigo, cantidad) {
        const item = this.#items.find(it => it.producto.codigo === codigo);
        if (!item) return;
        cantidad = Number(cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
            this.eliminarProducto(codigo);
            return;
        }
        item.cantidad = Math.min(cantidad, item.producto.stock);
        this._save();
    }

    eliminarProducto(codigo) {
        this.#items = this.#items.filter(it => it.producto.codigo !== codigo);
        this._save();
    }

    limpiar() {
        this.#items = [];
        this._save();
    }

    listarItems() {
        // devolver copia para no exponer referencias internas
        return this.#items.map(it => ({ producto: it.producto, cantidad: it.cantidad }));
    }

    total() {
        return this.#items.reduce((s, it) => s + it.producto.precio * it.cantidad, 0);
    }

    cantidadTotal() {
        return this.#items.reduce((s, it) => s + it.cantidad, 0);
    }
}

export default Carrito;
