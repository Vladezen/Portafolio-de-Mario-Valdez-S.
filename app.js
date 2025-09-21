// Arreglo global para almacenar los nombres
const nombres = [];

// Referencias directas a los elementos solo una vez
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const btnAgregar = document.getElementById('btnAgregar');
const btnSortear = document.getElementById('btnSortear');

// Añadir eventos de escucha
btnAgregar.addEventListener('click', agregarAmigo);
btnSortear.addEventListener('click', sortearAmigo);

// NUEVO: Capturar nombre también al presionar Enter
inputAmigo.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita envío automático de formulario
        agregarAmigo();
    }
});

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        inputAmigo.focus();
        return;
    }
    // Validar nombres repetidos (insensible a mayúscula/minúscula)
    const yaExiste = nombres.some(n => n.toLowerCase() === nombre.toLowerCase());
    if (yaExiste) {
        alert(`El nombre "${nombre}" ya fue capturado. Por favor, ingresa un nombre diferente.`);
        inputAmigo.value = '';
        inputAmigo.focus();
        return;
    }
    nombres.push(nombre);
    inputAmigo.value = '';
    mostrarLista();
}

// Función para mostrar la lista de nombres en el UL
function mostrarLista() {
    listaAmigos.innerHTML = '';
    const fragment = document.createDocumentFragment();
    nombres.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        fragment.appendChild(li);
    });
    listaAmigos.appendChild(fragment);
}

// Función para sortear un amigo al azar
function sortearAmigo() {
    if (nombres.length === 0) {
        alert('Debes capturar al menos un nombre.');
        return;
    }
    const indice = Math.floor(Math.random() * nombres.length);
    const amigoSecreto = nombres[indice];
    resultado.innerHTML = `<li>Tu amigo secreto es: <b>${amigoSecreto}</b></li>`;
}

