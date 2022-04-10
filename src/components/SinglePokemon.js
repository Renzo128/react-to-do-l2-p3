import React from "react";
// import "./Styles/SinglePokemon.css";

function SinglePokemon({ pokemon, openModal }) {
  return (
    <>
      <section
        key={pokemon.id}
        className="SinglePokeContainer"

      >
        <p>#0{pokemon.id}</p>
        <img
          onClick={openModal}
          data-id={pokemon.id}
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <p>{pokemon.name}</p>
      </section>
    </>
  );
}

export default SinglePokemon;

