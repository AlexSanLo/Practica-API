const URLcircuitos = 'https://ergast.com/api/f1/2012.json';

async function fetchcircuitos() {
    const responsecircuitos = await fetch(URLcircuitos);
    const pilotos = await responsecircuitos.json();

};