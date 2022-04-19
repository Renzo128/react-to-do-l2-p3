import React, { useState, useEffect } from "react";
import SinglePokemon from "../OnePokemon/OnePokemon";
import "./Pokemon.css";
import { Link } from "react-router-dom";

const initialUrl = "https://pokeapi.co/api/v2/pokemon";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    // op pagina inladen de link voor volgende en vorige klaar zetten
    async function fetchData() {
      let response = await getPokemonData(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
    }

    fetchData();
  }, []);

  const getPokemonData = async (url) => {
    // haal data op van api
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

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
    let data = await getPokemonData(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  const prevPoke = async () => {
    // vorige set pokemon inladen
    if (!prevUrl) return;
    let data = await getPokemonData(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  };

  return (
    <>
      <header>
        <h1>Pokédex</h1>
      </header>
      <div></div>
      { (
        <div className="container">
          <button className="moveButton">
            <Link to="PokePage" style={{ textDecoration: 'none', color: 'black' }}>Pokemon</Link>
          </button>

          <div className="button">
            {prevUrl ? (
              <button className="button-style-left" onClick={prevPoke}>
                Vorige
              </button>
            ) : null}
            {nextUrl ? (
              <button className="button-style-right" onClick={nextPoke}>
                Volgende
              </button>
            ) : null}
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
            {prevUrl ? (
              <button className="button-style-left" onClick={prevPoke}>
                Vorige
              </button>
            ) : null}
            {nextUrl ? (
              <button className="button-style-right" onClick={nextPoke}>
                Volgende
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemon;
