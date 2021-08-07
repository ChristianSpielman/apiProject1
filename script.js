const pokemonSection = document.getElementById('pokemonCards');

const getData = () => {
    const promises = [];
    for (let i = 1; i <= 12; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((result) => result.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join('/'),
        }));
        displayRecords(pokemon);
    });
};

const displayRecords = (data) => {
    const outputString = data
        .map((pokeman) => `
            <div class="card card-block col-md-4 mb-4 bg-primary" style="width: 18rem;">
                <img src="${pokeman.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${pokeman.name}</h5>
                    <p class="card-text">${pokeman.type}</p>
                </div>
            </div> 
        `).join('');
        pokemonSection.innerHTML = outputString;
};

getData();