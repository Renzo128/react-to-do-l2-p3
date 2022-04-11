import React, { useState, useEffect } from "react";

import "./Search.css";
import { getPokemon, getPokemonData } from "../functies/pokemons";

const Search = () => {
  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  const submitSearch = async (e) => {
    e.preventDefault();
    let response = await getPokemon(
      `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
    );
    console.log(response);
    await setPokemonData({
      response,
    });
  };

  return (
    <div className="form_container">
      <form action="submit" onSubmit={submitSearch} className="input_placement">
        <input
          className="unknown"
          type="text"
          name="form"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type ID or Name of Pokémon..."
        />
      </form>

      {Object.keys(pokemonData).length
        ? pokemonData.response.moves.map((moves) => <div key={moves.move.name}>{moves.move.name}</div>)
        : ""}

      {Object.keys(pokemonData).length
        ? pokemonData.response.abilities[0].ability.name
        : ""}
      {Object.keys(pokemonData).length ? (
        <img src={pokemonData.response.sprites.front_default}></img>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
