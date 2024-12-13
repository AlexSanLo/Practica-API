const URLCircuitos = 'https://ergast.com/api/f1/2012.json';

async function fetchCircuitos() {
    const responseCircuitos = await fetch(URLCircuitos);
    const data = await responseCircuitos.json();          // Convierte la respuesta en formato JSON

    const circuitos = data.MRData.RaceTable.Races;       // Extraigo la lista de circuitos de los datos

    const container = document.querySelector('#CircuitosContainer'); // Contenedor donde se mostrarán las tarjetas


    circuitos.forEach(circuito => {
        const circuitoInfo = {
            raceName: circuito.raceName,
            circuitName: circuito.Circuit.circuitName,          // Creo un objeto con la información relevante de cada circuito
            locality: circuito.Circuit.Location.locality,
            country: circuito.Circuit.Location.country
        };

        const card = createCardCircuito(circuitoInfo);        // Creo una tarjeta con la información del circuito
        container.appendChild(card);       // Añade la tarjeta al contenedor con appendChild
    });
};

function createCardCircuito(circuito) {                            // Función para crear la tarjeta de cada circuito

    const plantilla = document.querySelector('#CardCircuito');   // Selecciona la plantilla de la tarjeta

    const cardClonada = plantilla.cloneNode(true);   // Clona la plantilla para crear una nueva tarjeta    

    cardClonada.style.display = 'block';  //Muestra la clonada 

    cardClonada.querySelector('#raceName').textContent = `${circuito.raceName}`;
    cardClonada.querySelector('#circuitName').textContent = `Circuito: ${circuito.circuitName}`;
    cardClonada.querySelector('#locality').textContent = `Localidad: ${circuito.locality}`;       // Relleno la tarjeta con los datos del circuito
    cardClonada.querySelector('#country').textContent = `${circuito.country}`;

    return cardClonada;
}

// Ejecuta la función cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', fetchCircuitos);
