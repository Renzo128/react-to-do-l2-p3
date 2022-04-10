import React, { useState, useEffect } from "react";
import SinglePokemon from "../SinglePokemon/SinglePokemon";
import { getPokemon, getPokemonData } from "../functies/pokemons";
const initialUrl = "https://pokeapi.co/api/v2/pokemon";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [singlePoke, setSinglePoke] = useState([]);
  const [singlePokeSpecies, setSinglePokeSpecies] = useState([]);
  const [singlePokeEvoChain, setSinglePokeEvoChain] = useState([]);
  const [input, setInput] = useState("");

  let tempId = "";


  const fetchSinglePoke = async (value) => {  // data van pokemon ophalen die gezocht wordt in zoek balk
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    const data = await response.json();
    console.log(data)

    setSinglePoke(data);

    return data;
  };

  const fetchSpecieData = async (value) => {  //haal meer informatie op over dezelfde pokemon van fetchSinglePoke
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    const data = await response.json();
    console.log(data)

    setSinglePokeSpecies(data);

    return data;
  };

  const fetchEvoData = async (url) => { // haal evaluatie informatie op van gezochte pokemon
    const response = await fetch(url);
    const data = await response.json();
    setSinglePokeEvoChain(data);
    return data;
  };

  const handleSubmit = async (e) => { // het opzoek verzoek ophalen en informatie ervoor opzoeken
    e.preventDefault();
    if (!input) return;

    if (input) {
      setInput(input.toLowerCase());
      const [singlePoke, specieData] = await Promise.all([
        fetchSinglePoke(input),
        fetchSpecieData(input),
      ]);
      const [singlePokeEvoChain] = await Promise.all([
        fetchEvoData(specieData.evolution_chain.url),
      ]);

      setInput("");
      e.target.reset();
    }
  };


  useEffect(() => { // op pagina inladen de link voor volgende en vorige klaar zetten
    async function fetchData() {
      let response = await getPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadingPokemon = async (data) => {  // alle pokemon data ophalen
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
  };


  const nextPoke = async () => {  // als er op volgende geklikt wordt alle informatie voor volgende actie klaarzetten
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prevPoke = async () => {// als er op vorige geklikt wordt alle informatie voor volgende actie klaarzetten
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <header>
        <p>Pokédex</p>
      </header>
      {loading ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Loading...</h1>
      ) : (
        <div className="container">
          <div className="btn-container">
            <button className="btn" onClick={prevPoke}>
              prev
            </button>
            <button className="btn" onClick={nextPoke}>
              next
            </button>
          </div>

          <div className="form_container">
            <form action="submit" onSubmit={handleSubmit}>
              <input
                className="form"
                type="text"
                name="form"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type ID or Name of Pokémon..."
              />
            </form>
          </div>

          <div className="Pokemon-Container">
            {pokemons.map((poke) => {
              return (
                <>
                  <SinglePokemon key={poke.id} pokemon={poke} />
                </>
              );
            })}
          </div>
          <button className="btn" onClick={prevPoke}>
          prev
        </button>
        <button className="btn" onClick={nextPoke}>
          next
        </button>
        </div>
      )}
    </>
  );
};

export default Pokemon;
