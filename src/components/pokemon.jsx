import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokemon = ({pokemon}) =>{
    console.log(pokemon)
  const [pokemonImage, setPokemonImage] = useState([]);



    return (
    <div>
        {pokemon.map((p) =>
        <div key={p.url}>{p.name}</div>)}
    </div>
)
}

export default Pokemon;
