import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {


  const [pokemon, setPokemon] = useState([]);
//      .catch((error) => {
//  console.log(error);
//});
  // https://pokeapi.co/api/v2/pokemon/5

  useEffect(() => {
    const fetchpokemon = fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => json)

    setPokemon(fetchpokemon);
  }, []);
  return (

    <div>

       {pokemon.map((pkmn) => { 
        return <h5>{pkmn.title}</h5>;
      })}  
    </div>
  );
};
export default App;
