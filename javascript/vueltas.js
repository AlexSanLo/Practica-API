const URLvueltas = 'https://ergast.com/api/f1/2011/5/laps/1';

async function fetchvueltas() {
    const responsevueltas = await fetch(URLvueltas);
    const pilotos = await responsevueltas.json();

};

