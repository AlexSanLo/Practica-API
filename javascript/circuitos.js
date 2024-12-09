const URLCircuitos = 'https://ergast.com/api/f1/2012.json';

async function fetchCircuitos() {
    const responseCircuitos = await fetch(URLCircuitos);
    const data = await responseCircuitos.json();

    const circuitos = data.MRData.RaceTable.Races;

    let circuitosFiltrados = [];

    const container = document.querySelector('#CircuitosContainer');

    circuitos.forEach(circuito => {
        const circuitoInfo = {
            raceName: circuito.raceName,
            circuitName: circuito.Circuit.circuitName,
            locality: circuito.Circuit.Location.locality,
            country: circuito.Circuit.Location.country
        };

        const card = createCardCircuito(circuitoInfo);
        container.appendChild(card);
    });
};

function createCardCircuito(circuito) {
    const plantilla = document.querySelector('#CardCircuito'); 
    const cardClonada = plantilla.cloneNode(true);

    cardClonada.style.display = 'block';

    cardClonada.querySelector('#raceName').textContent = `${circuito.raceName}`;
    cardClonada.querySelector('#circuitName').textContent = `Circuito: ${circuito.circuitName}`;
    cardClonada.querySelector('#locality').textContent = `Localidad: ${circuito.locality}`;
    cardClonada.querySelector('#country').textContent = `${circuito.country}`;

    return cardClonada;
}

document.addEventListener('DOMContentLoaded', fetchCircuitos);
