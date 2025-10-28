# Resumen Organizado: Clase Virtual de JavaScript sobre DOM, Eventos y POO

Este documento compila y organiza las consultas realizadas durante una conversación sobre JavaScript, enfocándose en DOM, eventos y prácticas de Programación Orientada a Objetos para desarrollar una aplicación de ventas.

---

## 1. Fundamentos del DOM (Document Object Model)

### ¿Qué es el DOM?
El DOM es una interfaz de programación que representa la estructura de un documento HTML/XML como un árbol jerárquico de nodos, permitiendo a JavaScript manipular la estructura, estilo y contenido de las páginas web.

### Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Estructura de Árbol** | Organiza elementos HTML en una jerarquía de nodos (documento, elementos, texto, atributos) |
| **Selección de Elementos** | `getElementById()`, `querySelector()` (primer match), `querySelectorAll()` (todos los matches) |
| **Manipulación de Contenido** | `textContent` (solo texto), `innerHTML` (incluye HTML) |
| **Manipulación de Atributos** | `setAttribute()`, `classList.add()`, `style.property` |
| **Creación de Elementos** | `createElement()`, `appendChild()` |

---

## 2. Eventos en JavaScript

### ¿Qué son los Eventos?
Acciones o sucesos que ocurren en el navegador (clics, teclas presionadas, carga de página) a los que JavaScript puede responder dinámicamente.

### Elementos Principales

| Concepto | Explicación |
|----------|-------------|
| **Event Listener** | `elemento.addEventListener('tipoEvento', funcionCallback)` |
| **Objeto Evento (e)** | Información detallada del evento. Propiedad clave: `e.target` (elemento origen) |
| **Control de Flujo** | `e.preventDefault()` (detiene acción predeterminada), `e.stopPropagation()` (detiene propagación) |
| **Bubbling** | El evento "burbujea" desde el elemento interno hacia arriba |
| **Capturing** | El evento viaja desde la raíz hacia el elemento objetivo |

---

## 3. Programación Orientada a Objetos con Clases

### Declaración de Clases (ES6+)

```javascript
class Producto {
    constructor(nombre, precio, stock, codigo) {
        // Validación de tipos
        if (typeof nombre !== 'string') {
            throw new TypeError('El nombre debe ser una cadena de texto.');
        }
        if (typeof precio !== 'number' || precio <= 0) {
            throw new TypeError('El precio debe ser un número positivo.');
        }
        
        this._nombre = nombre;
        this._precio = precio;
        this._stock = stock;
        this._codigo = codigo;
    }
    
    // Métodos de instancia
    actualizarStock(cantidad) {
        if (this._stock + cantidad < 0) {
            throw new RangeError('Stock insuficiente.');
        }
        this._stock += cantidad;
    }
    
    estaAgotado() {
        return this._stock === 0;
    }
    
    calcularPrecioConIVA(tasaIVA) {
        return this._precio * (1 + tasaIVA);
    }
    
    aplicarDescuento(porcentaje) {
        return this._precio * (1 - porcentaje / 100);
    }
    
    generarTarjetaHTML() {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto-card';
        tarjeta.innerHTML = `
            <h3>${this._nombre}</h3>
            <p>Precio: $${this._precio.toFixed(2)}</p>
            <p>Stock: ${this._stock}</p>
        `;
        return tarjeta;
    }
}
```

### Getters y Setters

Los getters y setters permiten encapsulamiento y validación. Se acceden como propiedades, no como métodos.

```javascript
class Producto {
    // ... constructor ...
    
    // GETTER - devuelve valor calculado
    get precioFormato() {
        return `$${this._precio.toFixed(2)}`;
    }
    
    // SETTER - valida antes de asignar
    set nombre(nuevoNombre) {
        if (nuevoNombre.length < 3) {
            throw new Error('El nombre es muy corto.');
        }
        this._nombre = nuevoNombre;
    }
}

// Uso
const item = new Producto('Laptop', 1250.99, 5, 'LAP001');
console.log(item.precioFormato); // "$1250.99"
item.nombre = "MacBook Pro"; // Usa el setter
```

### Métodos Estáticos

Pertenecen a la clase, no a instancias individuales. Útiles para utilidades y funciones fábrica.

```javascript
class Producto {
    // ... otros métodos ...
    
    // Método de fábrica para crear desde JSON
    static crearDesdeJSON(datosJson) {
        const { nombre, precio, stock, codigo } = JSON.parse(datosJson);
        return new Producto(nombre, precio, stock, codigo);
    }
    
    // Método de utilidad
    static formatoMoneda(precio) {
        return `$${precio.toFixed(2)}`;
    }
}

// Uso
const productoJSON = '{"nombre": "Teclado", "precio": 50, "stock": 10, "codigo": "TEC001"}';
const producto = Producto.crearDesdeJSON(productoJSON);
```

---

## 4. Símbolos Conocidos: Symbol.toPrimitive

JavaScript no permite sobrecarga de operadores, pero `Symbol.toPrimitive` controla cómo un objeto se convierte a primitivo al usar operadores.

```javascript
class Producto {
    // ... constructor y métodos ...
    
    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            // Para operaciones matemáticas
            return this._precio;
        }
        // Para concatenación de strings
        return `Producto: ${this._nombre} - Precio: $${this._precio.toFixed(2)}`;
    }
}

const p = new Producto("Zapatillas", 80, 5, "ZAP001");
console.log(p + 20); // 100 (80 + 20)
console.log("Artículo: " + p); // "Artículo: Producto: Zapatillas - Precio: $80.00"
```

---

## 5. Manejo de Errores y Validación

### Verificación de Tipos con `typeof` e `instanceof`

```javascript
// Validar tipos primitivos
if (typeof nombre !== 'string') {
    throw new TypeError('El nombre debe ser string.');
}

// Validar instancias de clases
if (!(producto instanceof Producto)) {
    throw new Error('Debe ser una instancia de Producto.');
}
```

### Tipos de Errores

| Error | Uso |
|-------|-----|
| `TypeError` | Tipo de dato incorrecto |
| `RangeError` | Valor fuera de rango aceptable |
| `Error` | Errores generales |

---

## 6. Sistema de Módulos ES6

### Estructura de Archivos Recomendada

```
proyecto/
├── index.html
├── Producto.js
├── Inventario.js
└── main.js
```

### Exportación (Producto.js)

```javascript
export class Producto {
    // ... definición de la clase ...
}

export const TASA_IVA = 0.21;
```

### Importación (Inventario.js)

```javascript
import { Producto } from './Producto.js';

export class Inventario {
    constructor() {
        this._productos = [];
    }
    
    agregarProducto(producto) {
        if (!(producto instanceof Producto)) {
            throw new TypeError('Debe ser una instancia de Producto.');
        }
        this._productos.push(producto);
    }
    
    obtenerProductoPorCodigo(codigo) {
        return this._productos.find(p => p._codigo === codigo);
    }
    
    filtrarPorPrecio(precioMax) {
        return this._productos.filter(p => p._precio <= precioMax);
    }
    
    calcularValorTotal() {
        return this._productos.reduce((total, p) => total + (p._precio * p._stock), 0);
    }
    
    renderizarInventario(contenedorDOM) {
        contenedorDOM.innerHTML = '';
        this._productos.forEach(producto => {
            const tarjeta = producto.generarTarjetaHTML();
            contenedorDOM.appendChild(tarjeta);
        });
    }
}
```

### Uso en main.js

```javascript
import { Inventario } from './Inventario.js';
import { TASA_IVA } from './Producto.js';

const inventario = new Inventario();
const producto1 = Producto.crearDesdeJSON('{"nombre":"Monitor","precio":300,"stock":5,"codigo":"MON001"}');
inventario.agregarProducto(producto1);
```

### Configuración en HTML (CRÍTICO)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tienda JS</title>
</head>
<body>
    <h1>Mi Tienda</h1>
    <div id="contenedor-productos"></div>
    
    <!-- type="module" es OBLIGATORIO para usar import/export -->
    <script type="module" src="main.js"></script>
</body>
</html>
```

---

## 7. Mejores Prácticas y Patrones de Diseño

### Principio de Responsabilidad Única (SRP)

- **Una clase = Una responsabilidad**
- `Producto.js`: Modela un ítem individual
- `Inventario.js`: Gestiona la colección de productos
- `main.js`: Orquesta la aplicación

### Patrón de Fábrica (Factory Pattern)

**¿Cuándo usar métodos estáticos de fábrica en lugar del constructor?**

| Escenario | Solución |
|-----------|----------|
| Datos simples | Constructor directo: `new Producto(...)` |
| Validación compleja | Método estático: `Producto.crearDesdeJSON(...)` |
| Fuentes externas (API, JSON) | Método estático de fábrica |
| Decisión de subclases | Abstract Factory Pattern |

**Ventajas de las fábricas:**
- Centralizan la lógica de creación
- Permiten validación antes de la construcción
- Pueden decidir qué clase instanciar
- Facilitan el manejo de datos externos

---

## 8. Herramientas de Desarrollo: VS Code

### Atajo para Comentarios JSDoc

1. Coloca el cursor encima de una función o clase
2. Escribe `/**`
3. Presiona `Enter` o `Tab`

VS Code generará automáticamente:

```javascript
/**
 * 
 * @param {number} precio 
 * @param {number} iva 
 * @returns {number}
 */
function calcularPrecioFinal(precio, iva) {
    return precio * (1 + iva);
}
```

---

## Resumen de Conceptos Clave

1. **DOM**: Interfaz para manipular la estructura HTML como árbol de nodos
2. **Eventos**: Sistema de listeners para responder a acciones del usuario
3. **Clases ES6**: Blueprint para crear objetos con constructor, métodos y propiedades
4. **Getters/Setters**: Encapsulamiento y validación de propiedades
5. **Métodos Estáticos**: Utilidades que pertenecen a la clase, no a instancias
6. **Validación de Tipos**: `typeof` para primitivos, `instanceof` para objetos
7. **Symbol.toPrimitive**: Controla conversión a primitivos (alternativa a sobrecarga de operadores)
8. **Módulos ES6**: `export`/`import` para organizar código en archivos separados
9. **Patrón Factory**: Métodos estáticos para crear instancias con lógica compleja
10. **SRP**: Una clase, una responsabilidad (separar `Producto` de `Inventario`)

---

## Ejemplo Completo: Aplicación de Ventas

Este flujo muestra cómo todos los conceptos se integran en una aplicación práctica:

1. **Producto.js** → Define el modelo de un ítem
2. **Inventario.js** → Gestiona la colección de productos
3. **main.js** → Carga datos, maneja eventos del DOM, renderiza la interfaz
4. **index.html** → Estructura de la página con `<script type="module">`

Esta arquitectura modular permite escalar la aplicación, mantener código limpio y aplicar principios sólidos de POO en JavaScript vanilla.