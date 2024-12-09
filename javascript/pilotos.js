const URLpilotos = 'https://ergast.com/api/f1/drivers';

async function fetchpilotos() {
    const responsePilotos = await fetch(URLpilotos);
    const pilotos = await responsePilotos.json();

};