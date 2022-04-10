import React from "react";

function SinglePokemon({ pokemon }) { // display voor iedere pokemon card
  return (
    <>
      <div
        key={pokemon.id}
        className="SinglePokeContainer"

      >
        <p>#{pokemon.id}</p>
        <img
          data-id={pokemon.id}
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <p>{pokemon.name}</p>
      </div>
    </>
  );
}

export default SinglePokemon;

