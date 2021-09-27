class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }
    restar(num1, num2) {
        return num1 - num2;
    }
    multiplicar(num1, num2) {
        return num1 * num2;
    }
    dividir(num1, num2) {
        if (num2 == 0) {
            return "No se puede dividir entre cero";
        }
        return num1 / num2;
    }
    exponencial(num1, num2) {
        return num1 ** num2;
    }
}