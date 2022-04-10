import React, { useState, useEffect } from "react";
import SinglePokemon from "./SinglePokemon";
import "./Styles/Pokelist.css";
import { getPokemon, getPokemonData } from "./util/pokemon";
/* import SearchForm from "./SearchForm"; */

const initialUrl = "https://pokeapi.co/api/v2/pokemon";

const Pokelist = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [singlePoke, setSinglePoke] = useState([]);
  const [singlePokeSpecies, setSinglePokeSpecies] = useState([]);
  const [singlePokeEvoChain, setSinglePokeEvoChain] = useState([]);
  const [input, setInput] = useState("");

  let tempId = "";





  //Functions

  const fetchSinglePoke = async (value) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    const data = await response.json();
    setSinglePoke(data);

    return data;
  };

  const fetchSpecieData = async (value) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    const data = await response.json();
    setSinglePokeSpecies(data);

    return data;
  };

  const fetchEvoData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setSinglePokeEvoChain(data);
    return data;
  };



  /* handle Submit  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    if (input) {
      setInput(input.toLowerCase());
      const [singlePoke, specieData] = await Promise.all([
        fetchSinglePoke(input),
        fetchSpecieData(input),
      ]);
      //fetch evo Data with the URL that is is sitting in SpecieData
      const [singlePokeEvoChain] = await Promise.all([
        fetchEvoData(specieData.evolution_chain.url),
      ]);

      setInput("");
      e.target.reset();
    }
  };

  /* End handle Sumbit */

  useEffect(() => {
    async function fetchData() {
      let response = await getPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
  };

  //next 20 Pokemon
  const nextPoke = async () => {
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  // previous 20 Pokemon
  const prevPoke = async () => {
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

          {/* FORM Beginn hier */}
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
          {/* FORM Ende hier */}


          <div className="Pokemon-Container">
            {pokemons.map((poke) => {
              return (
                <>
                  <SinglePokemon
                    key={poke.id}
                    pokemon={poke}
                  />
                </>
              );
            })}
          </div>
          {/* <button className="btn" onClick={prevPoke}>
            prev
          </button>
          <button className="btn" onClick={nextPoke}>
            next
          </button> */}
        </div>
      )}
    </>
  );
}

export default Pokelist;