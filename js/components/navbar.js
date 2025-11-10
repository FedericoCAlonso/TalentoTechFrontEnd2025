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
    }

    render() {
        this.innerHTML = `
    <nav class="nav-bar">
        <img class="logo" src="./assets/images/logo.png" alt="Logo de tienda">
        <h1>Vainilla Helados</h1>
        
        <ul class="menu">
            <li><a href="./index.html" data-page = "index">Inicio</a></li>
            <li><a href="#venta" data-page = "venta">Productos</a></li>
            <li><a href="./pages/contacto.html" data-page = "contacto">Contacto</a></li>
            <li><a href="./pages/carrito.html" data-page = "carrito"><span class="cart-count">0</span>🛒</a></li>
        </ul>
    </nav>
    `;
    }

    /**
     * TODO: Hacer la clase "activa"
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
        const cartCount = this.querySelector('cart-count');
        if(cartCount) {
            cartCount.textContent = count;
        }
    }
}
customElements.define('nav-bar', NavBar);
