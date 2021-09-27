class Display {
    constructor(displayValorActual, displayValorAnterior) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calc = new Calculadora();
        this.tipoOperacion = undefined;
        this.operador = '';
        this.valorActual = '0';
        this.valorAnterior = '';
        this.resultado = '';
        this.limpiar = false;
        this.limpiarTodo = false;
        this.signos = {
            sumar: '+',
            restar: '-',
            dividir: '÷',
            multiplicar: '×',
            exponencial: '^',
            igual: '='
        }
    }

    borrar() {
        if ((this.valorAnterior !== '' && this.tipoOperacion === 'igual') || this.valorActual === "No se puede dividir entre cero") {
            this.borrarTodo();
            return;
        }
        this.valorActual = '0';
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '0';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        this.operador = tipo;
        if (this.valorAnterior === '' && tipo === 'igual') return

        if (this.valorActual.endsWith('.')) {
            this.valorActual = this.valorActual.slice(0, -1);
        }

        if (this.tipoOperacion === undefined) {
            this.valorAnterior = this.valorActual;
            this.limpiar = true;
            this.tipoOperacion = tipo;
        } else {
            if (this.tipoOperacion !== 'igual') {
                this.calcular();
                this.limpiar = true;
                this.tipoOperacion = tipo;
            }
        }

        this.imprimirValores();
    }

    signoNegativo(signo) {
        if (this.valorActual.includes('-') || this.valorActual === '0') return
        this.valorActual = signo.toString() + this.valorActual.toString();
        this.imprimirValores();
    }

    agregarNumero(num) {
        if (this.valorActual === '0' && num === '0') return;
        if (this.limpiar === true) {
            this.valorActual = '0';
            this.limpiar = false;
        }
        if (this.limpiarTodo === true) {
            this.borrarTodo();
            this.limpiarTodo = false;
        }
        if (this.valorActual.length >= 13) return;
        if (num === '.' && this.valorActual.includes('.')) return;
        if (num !== '.' && this.valorActual === '0') this.valorActual = '';

        this.valorActual = this.valorActual.toString() + num.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        if (this.valorActual.length > 13) {
            this.displayValorActual.style.fontSize = '1.5em';
            this.displayValorAnterior.style.fontSize = '.9em';
        }
        if (this.valorActual.length < 12) {
            this.displayValorActual.style.fontSize = '2em';
            this.displayValorAnterior.style.fontSize = '1.5em';
        }
        this.displayValorActual.textContent = this.valorActual;
        console.log(this.valorActual.length)
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if (isNaN(valorActual) || isNaN(valorAnterior)) return

        this.valorActual = this.calc[this.tipoOperacion](valorAnterior, valorActual);
        this.valorActual = String(this.valorActual);

        if (this.operador === 'igual' || this.valorActual === "No se puede dividir entre cero") {
            this.valorAnterior = `${valorAnterior} ${this.signos[this.tipoOperacion]} ${valorActual}`;
            this.limpiarTodo = true;
        } else {
            this.valorAnterior = this.valorActual;
        }
    }
}