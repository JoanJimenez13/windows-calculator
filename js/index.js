const displayValorActual = document.getElementById('valor-actual');
const displayValorAnterior = document.getElementById('valor-anterior');
const btnNumeros = document.querySelectorAll('.numero');
const btnOperadores = document.querySelectorAll(".operador");
const singoN = document.querySelector('.negativo');
const borrar = document.querySelector('.borrar');
const borrarTodo = document.querySelector('.borrarTodo');

const display = new Display(displayValorActual, displayValorAnterior);

btnNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.textContent));
});

btnOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value));
});

singoN.addEventListener('click', () => display.signoNegativo(singoN.value));
borrar.addEventListener('click', () => display.borrar());
borrarTodo.addEventListener('click', () => display.borrarTodo());