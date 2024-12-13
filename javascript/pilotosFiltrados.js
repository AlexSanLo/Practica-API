const URLpilotos = 'https://ergast.com/api/f1/drivers.json';

async function fetchPilotos() {

        const responsePilotos = await fetch(URLpilotos);   // Realiza una petición a la API para obtener la lista de pilotos
        const data = await responsePilotos.json();

        const pilotos = data.MRData.DriverTable.Drivers;   // Extrae los pilotos de la respuesta JSON

        let nacionalidades = new Set();  // Crea un conjunto para almacenar las nacionalidades únicas

        pilotos.forEach(piloto => {
            nacionalidades.add(piloto.nationality.trim());     // Recorre los pilotos y agrega su nacionalidad al conjunto
        });

        cargarNacionalidades(nacionalidades);   // Llama a la función para cargar las nacionalidades

        const container = document.querySelector('#pilotosContainer');  // Contenedor donde se mostrarán las tarjetas

        const plantilla = document.querySelector('#CardPiloto');    // Obtiene la plantilla de tarjeta

        pilotos.forEach(piloto => {       // Recorre los pilotos y crea una tarjeta para cada uno
            const pilotoInfo = {
                driverId: MayusPrimeraLetraId(piloto.driverId),
                givenName: piloto.givenName,
                familyName: piloto.familyName,
                dateOfBirth: piloto.dateOfBirth,     // Prepara la información del piloto
                nationality: piloto.nationality,
                wikiUrl: piloto.url
            };

            const card = createCard(pilotoInfo, plantilla);    // Crea la tarjeta con la información del piloto
            if (card) {
                container.appendChild(card);   // Añade la tarjeta al contenedor
            }
        });

        configurarFiltrado(pilotos, plantilla);   // Llama a la función que configura los filtros
}


function cargarNacionalidades(nacionalidades) {   // Función que carga las nacionalidades en un select

    const select = document.getElementById('OpcionesNacionalidad');  // Obtiene el select

    nacionalidades.forEach(nacionalidad => {
        const option = document.createElement('option'); // Crea un <option>

        option.value = nacionalidad; // Establece el valor de nacionalidad

        option.textContent = nacionalidad; // Establece el texto de la nacionalidad

        select.appendChild(option); // Agrega la opción con el appendChild
    });
}


function MayusPrimeraLetraId(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);    //Funcion para volver mayuscula la primera letra del driverId
}


function createCard(piloto, plantilla) {  //Creo una Card

    const cardClonada = plantilla.cloneNode(true);  //Clono la plantilla

    cardClonada.style.display = 'block';    // Asegura que la Card sea visible

    cardClonada.querySelector('#idPiloto').textContent = `${MayusPrimeraLetraId(piloto.driverId)}`;
    cardClonada.querySelector('#nombre').textContent = `Nombre: ${piloto.givenName} ${piloto.familyName}`;
    cardClonada.querySelector('#fechaNacimiento').textContent = `Fecha Nacimiento: ${piloto.dateOfBirth}`; //Relleno de info la tarjeta
    cardClonada.querySelector('#nacionalidadCard').textContent = `Nacionalidad: ${piloto.nationality}`;
    cardClonada.querySelector('#enlaceWiki').href = piloto.wikiUrl;
    


    return cardClonada;
}


// Función que configura los filtros para buscar pilotos por nombre y nacionalidad
function configurarFiltrado(pilotos, plantilla) {
    const btnFiltrar = document.getElementById('btn-filtrar');
    const selectNacionalidad = document.getElementById('OpcionesNacionalidad');  //Obtiene datos necesarios
    const inputNombre = document.getElementById('filtroNombre');

     // Añade un listener al botón de filtrado
    btnFiltrar.addEventListener('click', () => {
        const nacionalidadSeleccionada = selectNacionalidad.value;
        const nombreBuscado = inputNombre.value.toLowerCase().trim(); //Obtiene lo seleccionado/buscado

        // Filtra los pilotos basándose en el nombre y la nacionalidad seleccionados
        const pilotosFiltrados = pilotos.filter(piloto => {
            const coincideNombre = nombreBuscado === '' || piloto.givenName.toLowerCase().includes(nombreBuscado) || piloto.familyName.toLowerCase().includes(nombreBuscado);  // Verifica si el nombre buscado es vacío o contiene el valor ingresado
            const coincideNacionalidad = nacionalidadSeleccionada === 'Todas' || piloto.nationality.trim() === nacionalidadSeleccionada; /// Verifica si la nacionalidad seleccionada es 'Todas' o alguna en especifico

            return coincideNombre && coincideNacionalidad; //Sera incluido en el array PilotosFiltrados solo si ambas condiciones son verdaderas
        });

        // Carga los pilotos filtrados
        cargarPilotosFiltrados(pilotosFiltrados, plantilla);
    });
}


// Función que carga los pilotos filtrados en el contenedor
function cargarPilotosFiltrados(pilotos, plantilla) {
    const contenedor = document.querySelector('#pilotosContainer');
    contenedor.innerHTML = '';      // Limpia el contenedor antes de cargar los nuevos pilotos filtrados

    pilotos.forEach(piloto => { 
        const pilotoInfo = { 
            driverId: MayusPrimeraLetraId(piloto.driverId), 
            givenName: piloto.givenName, 
            familyName: piloto.familyName, 
            dateOfBirth: piloto.dateOfBirth,     // Prepara la información del piloto, esto lo hice debido 
            nationality: piloto.nationality,    // a que la url de la wiki no me la pillaba bien al filtrar
            wikiUrl: piloto.url
        };

        const tarjeta = createCard(pilotoInfo, plantilla);  // Crea la tarjeta para el piloto
        if (tarjeta) { 
            contenedor.appendChild(tarjeta);  //Añado la tarjeta al contenedor
        } 
    });
}


// Ejecuta la función cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', fetchPilotos);


