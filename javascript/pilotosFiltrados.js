const URLpilotos = 'https://ergast.com/api/f1/drivers.json';

async function fetchPilotos() {

        const responsePilotos = await fetch(URLpilotos);
        const data = await responsePilotos.json();

        const pilotos = data.MRData.DriverTable.Drivers;

        let nacionalidades = new Set();

        pilotos.forEach(piloto => {
            nacionalidades.add(piloto.nationality.trim());
        });

        cargarNacionalidades(nacionalidades);

        const container = document.querySelector('#pilotosContainer');
        const plantilla = document.querySelector('#CardPiloto');

        pilotos.forEach(piloto => {
            const pilotoInfo = {
                driverId: MayusPrimeraLetraId(piloto.driverId),
                givenName: piloto.givenName,
                familyName: piloto.familyName,
                dateOfBirth: piloto.dateOfBirth,
                nationality: piloto.nationality,
                wikiUrl: piloto.url
            };

            const card = createCard(pilotoInfo, plantilla);
            if (card) {
                container.appendChild(card);
            }
        });

        configurarFiltrado(pilotos, plantilla);
}


function cargarNacionalidades(nacionalidades) {
    const select = document.getElementById('OpcionesNacionalidad');

    nacionalidades.forEach(nacionalidad => {
        const option = document.createElement('option'); // Crea un <option>

        option.value = nacionalidad; // Establece el valor de nacionalidad

        option.textContent = nacionalidad; // Establece el texto de la nacionalidad

        select.appendChild(option); // Agrega la opción con el appendChild
    });
}


function MayusPrimeraLetraId(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function createCard(piloto, plantilla) {

    const cardClonada = plantilla.cloneNode(true);
    cardClonada.style.display = 'block';

    cardClonada.querySelector('#idPiloto').textContent = `${MayusPrimeraLetraId(piloto.driverId)}`;
    cardClonada.querySelector('#nombre').textContent = `Nombre: ${piloto.givenName} ${piloto.familyName}`;
    cardClonada.querySelector('#fechaNacimiento').textContent = `Fecha Nacimiento: ${piloto.dateOfBirth}`;
    cardClonada.querySelector('#nacionalidadCard').textContent = `Nacionalidad: ${piloto.nationality}`;
    cardClonada.querySelector('#enlaceWiki').href = piloto.wikiUrl;
    


    return cardClonada;
}


function configurarFiltrado(pilotos, plantilla) {
    const btnFiltrar = document.getElementById('btn-filtrar');
    const selectNacionalidad = document.getElementById('OpcionesNacionalidad');
    const inputNombre = document.getElementById('filtroNombre');

    btnFiltrar.addEventListener('click', () => {
        const nacionalidadSeleccionada = selectNacionalidad.value;
        const nombreBuscado = inputNombre.value.toLowerCase().trim();

        const pilotosFiltrados = pilotos.filter(piloto => {
            const coincideNombre = nombreBuscado === '' || piloto.givenName.toLowerCase().includes(nombreBuscado) || piloto.familyName.toLowerCase().includes(nombreBuscado);
            const coincideNacionalidad = nacionalidadSeleccionada === 'Todas' || piloto.nationality.trim() === nacionalidadSeleccionada;

            return coincideNombre && coincideNacionalidad;
        });

        console.log('Pilotos filtrados:', pilotosFiltrados);

        cargarPilotosFiltrados(pilotosFiltrados, plantilla);
    });
}


function cargarPilotosFiltrados(pilotos, plantilla) {
    const contenedor = document.querySelector('#pilotosContainer');
    contenedor.innerHTML = ''; 

    pilotos.forEach(piloto => { 
        const pilotoInfo = { 
            driverId: MayusPrimeraLetraId(piloto.driverId), 
            givenName: piloto.givenName, 
            familyName: piloto.familyName, 
            dateOfBirth: piloto.dateOfBirth, 
            nationality: piloto.nationality, 
            wikiUrl: piloto.url
        };

        const tarjeta = createCard(pilotoInfo, plantilla); 
        if (tarjeta) { 
            contenedor.appendChild(tarjeta); 
        } 
    });
}


document.addEventListener('DOMContentLoaded', fetchPilotos);


