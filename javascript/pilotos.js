const URLpilotos = 'https://ergast.com/api/f1/drivers.json';

async function fetchpilotos() {
    const responsePilotos = await fetch(URLpilotos);
    const data = await responsePilotos.json(); 


    const pilotos = data.MRData.DriverTable.Drivers;

    let pilotosFiltrados = [];


    for (let piloto of pilotos) {
        let pilotoInfo = {
            driverId: piloto.driverId,
            givenName: piloto.givenName,
            familyName: piloto.familyName,
            dateOfBirth: piloto.dateOfBirth,
            nationality: piloto.nationality
        };
        pilotosFiltrados.push(pilotoInfo);
    }

    console.log(pilotosFiltrados); 
};

fetchpilotos(); 
