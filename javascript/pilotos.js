const URLpilotos = 'https://ergast.com/api/f1/drivers.json';

async function fetchpilotos() {
    const responsePilotos = await fetch(URLpilotos);
    const data = await responsePilotos.json();


    const pilotos = data.MRData.DriverTable.Drivers;

    let pilotosFiltrados = [];

    const container = document.querySelector('#pilotosContainer');

    pilotos.forEach(piloto => {
        const pilotoInfo = {
            driverId: MayusPrimeraLetraId(piloto.driverId),
            givenName: piloto.givenName,
            familyName: piloto.familyName,
            dateOfBirth: piloto.dateOfBirth,
            nationality: piloto.nationality
        };

        const card = createCard(pilotoInfo);
        container.appendChild(card);
    });
};

function MayusPrimeraLetraId(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1); 
}

function createCard(piloto) {

    const plantilla = document.querySelector('#CardPilotos');
    const cardClonada = plantilla.cloneNode(true);

    cardClonada.style.display = 'block';

    cardClonada.querySelector('#idPiloto').textContent = `${piloto.driverId}`;
    cardClonada.querySelector('#nombre').textContent = `${piloto.givenName} ${piloto.familyName}`;
    cardClonada.querySelector('#fechaNacimiento').textContent = `Fecha Nacimiento: ${piloto.dateOfBirth}`;
    cardClonada.querySelector('#nacionalidadCard').textContent = `Nacionalidad: ${piloto.nationality}`;

    return cardClonada;
}

document.addEventListener('DOMContentLoaded', fetchpilotos);


