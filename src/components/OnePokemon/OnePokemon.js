import React from "react";
import "./OnePokemon.css";

function SinglePokemon({ pokemon }) { // display voor iedere pokemon card
  return (
    <>
      <div
        key={pokemon.id}
        className="pokecard"

      >
        
        <img
          data-id={pokemon.id}
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <p>#{pokemon.id}</p>
        <p>{pokemon.name}</p>
      </div>
    </>
  );
}

export default SinglePokemon;

