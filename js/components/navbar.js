/**
 * En este archivo, defino el elemento html personalizado para ser reutilizado de modo 
 * de no tener que copiar el html en cada página, así, centralizo el contenido. Si se 
 * modifica acá, se modifica en todos lados. Por lo que estuve viendo, es la manera
 * recomendada de hacerlo. 
 */

/**
 * Para definir un elemento nuevo html debo extender la clase HTMLElement
 * y luego registrarlo con customElements.define(). 
 */
class NavBar extends HTMLElement {
    constructor() {
        // Siempre llamar primero a super en el constructor
        super();
    }

    // Luego, en el html, puedo usar la etiqueta <nav-bar></nav-bar> para que se renderice
    // el contenido definido en este componente.

    /** Método que se llama cuando el elemento se agrega al DOM
     * es parte del ciclo de vida de los Web Components. En este caso
     * se usa para renderizar el contenido del navbar y establecer
     * el enlace activo según la página actual.
     */
    connectedCallback() {
        this.render();
        this.setActiveLink();
        // Renderizar ya con los hrefs calculados para evitar un segundo pase sobre el DOM
        this.setActiveLink();
    }

    render() {
        
        // Calcular prefijo relativo según la ruta actual y construir el HTML
        const prefix = this._getRelativePrefix();
        this.innerHTML = `
    <nav class="nav-bar">
        <img class="logo" src="${prefix}assets/images/logo.png" alt="Logo de tienda">
        <h1>Vainilla Helados</h1>
        
        <ul class="menu">
            <li><a href="${prefix}index.html" data-page="index">Inicio</a></li>
            <li><a href="${prefix}index.html#venta" data-page="venta">Productos</a></li>
            <li><a href="${prefix}pages/contacto.html" data-page="contacto">Contacto</a></li>
            <li><a href="${prefix}pages/carrito.html" data-page="carrito"><span class="cart-count">0</span>🛒</a></li>
        </ul>
    </nav>
    `;
    }

    /**
     * TODO: Hacer la clase "activa" en el CSS
     */

    setActiveLink() {
        const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
        const enlaces = this.querySelectorAll('a');

        enlaces.forEach(enlace => {
            const pagina = enlace.getAttribute("data-page");
            if (paginaActual.includes(pagina)) {
                enlace.classList.add("activa");
            }
        });

    }
    updateCartCount(count) {
        const cartCount = this.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    /**
     * Calcula un prefijo relativo ("../" repetido) según la profundidad
     * de la ruta actual, de modo que los enlaces del navbar funcionen
     * desde la raíz o desde subcarpetas como ./pages/
     */
    _getRelativePrefix() {
        // pathname p. ej. '/pages/contacto.html' o '/index.html' o '/'
        const pathname = window.location.pathname || '';
        // Quitar query y hash (aunque pathname no los contiene normalmente)
        const cleaned = pathname.split('?')[0].split('#')[0];
        const parts = cleaned.split('/').filter(Boolean);
        // Si el último segmento parece un archivo (contiene un punto), no contamos ese segmento
        let depth = parts.length;
        console.log(depth)
        const last = parts[parts.length - 1] || '';
        if (last.includes('.')) depth = parts.length - 1;
        if (depth <= 0) return './';
        return '../'.repeat(depth);
    }

}
customElements.define('nav-bar', NavBar);
