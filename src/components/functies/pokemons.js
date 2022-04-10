export async function getPokemon(url) { // haal 20 pokemons op
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }
  
  export async function getPokemonData(url) { // haal iedere pokemon apart op van de 20 van getPokemon
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }