const URLpilotos = 'https://ergast.com/api/f1/drivers.json';

async function fetchpilotos() {
    const responsePilotos = await fetch(URLpilotos);
    const data = await responsePilotos.json();    // Convierte la respuesta en formato JSON


    const pilotos = data.MRData.DriverTable.Drivers; // Extraigo la lista de pilotos de los datos

    const container = document.querySelector('#pilotosContainer');  // Contenedor donde se mostrarán las tarjetas

    pilotos.forEach(piloto => {
        const pilotoInfo = {
            driverId: MayusPrimeraLetraId(piloto.driverId),
            givenName: piloto.givenName,
            familyName: piloto.familyName,           // Creo un objeto con la información relevante de cada Piloto
            dateOfBirth: piloto.dateOfBirth,
            nationality: piloto.nationality
        };

        const card = createCard(pilotoInfo);  // Creo una tarjeta con la información del circuito
        container.appendChild(card);    // Añade la tarjeta al contenedor con appendChild
    });
};

function MayusPrimeraLetraId(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1);  //Funcion para volver mayuscula la primera letra del driverId
}

function createCard(piloto) {       // Función para crear la tarjeta de cada piloto

    const plantilla = document.querySelector('#CardPilotos');   // Selecciona la plantilla de la tarjeta

    const cardClonada = plantilla.cloneNode(true);  // Clona la plantilla para crear una nueva tarjeta

    cardClonada.style.display = 'block'; //Muestra la clonada

    cardClonada.querySelector('#idPiloto').textContent = `${piloto.driverId}`;
    cardClonada.querySelector('#nombre').textContent = `${piloto.givenName} ${piloto.familyName}`;
    cardClonada.querySelector('#fechaNacimiento').textContent = `Fecha Nacimiento: ${piloto.dateOfBirth}`;   // Relleno la tarjeta con los datos del piloto
    cardClonada.querySelector('#nacionalidadCard').textContent = `Nacionalidad: ${piloto.nationality}`;

    return cardClonada;
}

// Ejecuta la función cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', fetchpilotos);


