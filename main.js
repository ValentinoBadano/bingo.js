function generarCarton() {
    const carton = document.getElementById('carton');
    carton.innerHTML = '';
    const numerosGenerados = [];
    const cartonNumeros = cartonVacio();

    for (let i = 0; i < 3; i++) {
        const fila = document.createElement('div');
        fila.classList.add('carton');

            const posicionesOcupadas = [];
            const numerosFila = []; 

            while (posicionesOcupadas.length < 5) {
                const posicion = Math.floor(Math.random() * 9);
                if (!posicionesOcupadas.includes(posicion)) {
                    posicionesOcupadas.push(posicion);
                } else {
                    posicionesOcupadas.pop();
                }
            }

        for (let j = 0; j < 9; j++) {
            if (posicionesOcupadas.includes(j)) {
                let numero;
                do {
                    numero = Math.floor(Math.random() * 9) + 10 * j;
                } while (numerosGenerados.includes(numero) || numero == 0);
                numerosGenerados.push(numero);
                
                // ordena los numeros en una columna
                if ((i == 2) && (cartonNumeros[i - 2][j] > numero)) {
                    [cartonNumeros[i - 2][j], numero] = [numero, cartonNumeros[i - 2][j]];
                } else if (i > 0 && (cartonNumeros[i - 1][j] > numero)) {
                    [cartonNumeros[i - 1][j], numero] = [numero, cartonNumeros[i - 1][j]];
                }
                cartonNumeros[i][j] = numero;
            }
            
        }
    }
    return cartonNumeros;
}

function graficarCarton(cartonNumeros) {
    
    const cartonContainer = document.getElementById('carton');
    cartonContainer.innerHTML = ''; 
    const colores = ['#007bff', '#28a745', '#fd7e14', '#c375ff']; 
    const colorAleatorio  = colores[Math.floor(Math.random() * 4)]

    for (let i = 0; i < cartonNumeros.length; i++) {
        const fila = document.createElement('div');
        fila.classList.add('carton');

        for (let j = 0; j < cartonNumeros[i].length; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');

            if (cartonNumeros[i][j] !== null) {
                celda.textContent = cartonNumeros[i][j];
                celda.style.color = colorAleatorio;
            } else {
                celda.style.backgroundColor = colorAleatorio;
            }

            fila.appendChild(celda);
        }

        cartonContainer.appendChild(fila);
    }
}

function contarNumerosColumna(columna, carton) {
    let contador = 0;
    for (let i = 0; i < 3; i++) {
        if (carton[i][columna]) {
            contador++;
        }
    }
    return contador;
}

function cartonVacio() {
    let filas = 3;
    let columnas = 9;
    let cartonNumeros = [];

    // array bidimensional con valores nulos
    for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            fila.push(null);
        }
        cartonNumeros.push(fila);
    }
    return cartonNumeros;
}

function cartonValido(cartonNumeros) {
    // valida que haya 1 o 2 numeros en una columna
    for (let j = 0; j < 9; j++) {
        const cuenta = contarNumerosColumna(j, cartonNumeros);
        if (cuenta == 0 || cuenta == 3) {
            return false;
        }
    }

    // valida que no haya 3 numeros seguidos en una fila
    for (let i = 0; i < 3; i++) {
        let fila = cartonNumeros[i];
        if (!filaValida(fila)) {
            return false;
        }
    }
    return true;
}

function filaValida(fila) {
    let numerosSeguidos = 0;
    for (let j = 0; j < 9; j++) {
        if (fila[j]) {
            numerosSeguidos++;
        } else {
            numerosSeguidos = 0;
        }
        if (numerosSeguidos == 3) {
            return false;
        }
    }
    return true;
}

function construirCarton() {
    let carton;
    do {
        carton = generarCarton();
    }  while (!cartonValido(carton))

    graficarCarton(carton);
}

construirCarton();
