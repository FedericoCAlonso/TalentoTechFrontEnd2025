# Clase 11

## Programación modular con funciones

### Intruduccón a funciones

Conjunto de instrucciones que realizan tareas específicas.

* Organizan el código
    
    Permiten dividir programas complejos en partes más manejables.

* Mejoran la legibilidad

    Hacen que el código sea más fácil de entender u mantener.

*** Ejemplo de funciones ***

Si tuvieras que escribir varias veces un código para calcular el área de un rectángulo, sería mejor crear una función que lo haga por vos:

```JS
function calcularArea(largo, ancho) {
    return largo * ancho;
}

console.log(calcularArea(5, 3)); // devuelve 15

```

en JS, la palabra `function` se usa para declarar una función, además, el js hace hoisting, es decir, se puede llamar antes de ser declararda, no como Python, o C etc...

### Parámetros de entrada.

Son variables que las funciones reciben para operar.

Permiten que las funciones trabajen con diferentes datos cada vez que se llaman.


