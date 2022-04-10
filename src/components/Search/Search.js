import React, { useState, useEffect } from "react";

import "./Search.css";
import { getPokemon, getPokemonData } from "../functies/pokemons";


const Search = () => {
  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const submitSearch = async (e) => {
    e.preventDefault();
    let response = await getPokemon(
      `https://pokeapi.co/api/v2/pokemon/${input}`
    );
    await setPokemonData({
      name: response.species.name,
      species: response.species.name,
      img: response.sprites.front_default,
      hp: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      defense: response.stats[3].base_stat,
      type: response.types[0].type.name,
    });
}

  return(       
  <div className="form_container">
  <form action="submit" onSubmit={submitSearch}
  className="input_placement"
  >
    <input
    className="unknown"
      type="text"
      name="form"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type ID or Name of Pokémon..."
    />
  </form>
  {
      <img src={pokemonData.img}></img>
  }
</div>
  )
};

export default Search;
