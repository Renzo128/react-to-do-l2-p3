import React, { useState, useEffect } from "react";
import SinglePokemon from "../OnePokemon/OnePokemon";
import { getPokemon, getPokemonData } from "../functies/pokemons";
import "./Pokemon.css";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

const initialUrl = "https://pokeapi.co/api/v2/pokemon";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // op pagina inladen de link voor volgende en vorige klaar zetten
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
    // alle pokemon data ophalen
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemons(_pokemonData);
  };

  const nextPoke = async () => {
    // volgende set pokemon inladen
    setLoading(true);
    let data = await getPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prevPoke = async () => {
    // vorige set pokemon inladen
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
        <h1>Pokédex</h1>
      </header>
      <div></div>
      {loading ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Loading...</h1>
      ) : (
        <div className="container">
          <Link to="PokePage">Pokemon</Link>

          <div className="button">
            <button className="button-style-left" onClick={prevPoke}>
              Vorige
            </button>
            <button className="button-style-right" onClick={nextPoke}>
              Volgende
            </button>
          </div>


          <div className="Container">
            {pokemons.map((poke) => {
              return (
                <>
                  <SinglePokemon key={poke.id} pokemon={poke} />
                </>
              );
            })}
          </div>
          <div className="button">
            <button className="button-style-left" onClick={prevPoke}>
            Vorige
            </button>
            <button className="button-style-right" onClick={nextPoke}>
              Volgende
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemon;
