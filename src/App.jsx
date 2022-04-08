import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
const App = () => {


  const [pokemon, setPokemon] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);

  useEffect(async () => {
    try{ 
      let response = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
      let data = await response.data.results
      setPokemon(data);
      const pokeName = await axios.get('https://pokeapi.co/api/v2/pokemon/')
      for (let i = 0; i < data.length; i++) {
        const poke = pokeName.data.results[i];
        const pokeImage = await axios.get(poke.url);
        const pokeObj = {
          name: poke.name,
          image: pokeImage.data.sprites.front_default
        }
      console.log(pokeObj);

        setPokemonImage(pokeObj);
      }
    } catch(error) {
       console.error(error.message);
    }
  },[]);

  // useEffect(async() => {
  //   let response = await axios("https://pokeapi.co/api/v2/pokemon/1");
  //   let data = await response.data;
  //   console.log(response);
  //   setPokemonImage(data);
  // })



  return (

    <div >
      {
        console.log(pokemon)
        
      }
       {pokemon.map((pkmn) => { 
        return <h5 key={pkmn.url} id={pkmn.url}>{pkmn.name}</h5>;

      })}  
      <div>
        {
          <img src={pokemonImage.image} ></img>
        }
      </div>

    </div>
  );
};
export default App;
