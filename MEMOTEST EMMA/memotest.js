const imagenes = [
    './imagenes/gato.jpeg', 
    './imagenes/sombrero.jpeg', 
    './imagenes/zapatos.jpeg',
    './imagenes/fantasma.jpeg', 
    './imagenes/calabaza.jpeg', 
    './imagenes/murcielagos.jpeg',
    './imagenes/brujita.jpeg', 
    './imagenes/pocion.jpeg', 
    './imagenes/bruja.jpeg'
];

const fichas = document.querySelectorAll('.ficha');
const imagenesDobles = [...imagenes, ...imagenes];

function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

mezclar(imagenesDobles);

fichas.forEach((ficha, index) => {
    ficha.dataset.imagen = imagenesDobles[index];
});

let primeraFicha = null;
let segundaFicha = null;
let bloqueado = false;

fichas.forEach(ficha => {
    ficha.addEventListener('click', function() {
        if (bloqueado || ficha === primeraFicha || ficha.classList.contains('volteada')) return;

        ficha.innerHTML = `<img src="${ficha.dataset.imagen}" alt="imagen">`;
        ficha.classList.add('volteada');
        
        if (!primeraFicha) {
            primeraFicha = ficha;
        } else {
            segundaFicha = ficha;
            verificarCoincidencia();
        }
    });
});

function verificarCoincidencia() {
    let esCoincidencia = primeraFicha.dataset.imagen === segundaFicha.dataset.imagen;

    if (esCoincidencia) {
        resetearTablero();
        setTimeout(verificarGanador, 200);
    } else {
        desvoltearFichas();
    }
}

function desvoltearFichas() {
    bloqueado = true;
    setTimeout(() => {
        primeraFicha.innerHTML = '';
        segundaFicha.innerHTML = '';
        primeraFicha.classList.remove('volteada');
        segundaFicha.classList.remove('volteada');
        resetearTablero();
    }, 2000);
}

function resetearTablero() {
    [primeraFicha, segundaFicha, bloqueado] = [null, null, false];
}

function verificarGanador() {
    const todasVolteadas = [...fichas].every(ficha => ficha.classList.contains('volteada'));
    if (todasVolteadas) {
        const fichasContainer = document.querySelector('#fichas-container');
        const body = document.body;

        // Eliminar el contenedor de fichas
        fichasContainer.remove();

        // Crear y añadir el mensaje de "¡Ganaste!"
        const mensajeGanaste = document.createElement('div');
        mensajeGanaste.textContent = '¡GANASTE EMMA!';
        mensajeGanaste.style.fontSize = '150px';
        mensajeGanaste.style.textAlign = 'center';
        mensajeGanaste.style.marginTop = '50vh';
        mensajeGanaste.style.color = "pink";

        body.appendChild(mensajeGanaste);
    }
}