import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Pokemon from "./components/pokemon";
import Pagination from "./components/pagination";
const App = () => {


  const [pokemon, setPokemon] = useState([]);
  // const [pokemonImage, setPokemonImage] = useState([]);
  const [currentpage, setpage] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const [lastPage,setLastPage] = useState();
  const [nextPage,setNextPage] = useState();
  const number = 0;
  let arr = [];


  const goToLastPage = () =>{
    setpage(lastPage);
    number = number - 20;
  }
  const goToNextPage = () => {
    setpage(nextPage);
    number = number + 20;
  }

  useEffect( () => {
    arr = [];
    axios(currentpage)
    .then((data) => {
      console.log(data.data.results)
    setLastPage(data.data.previous)
    setNextPage(data.data.next)
    setPokemon(data.data.results)
  });

  // for(let i = 1; i< 20; i++){
  //   console.log(`https://pokeapi.co/api/v2/pokemon/${i}`);
  //   axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
  //   .then((data) => {
  //     console.log(data.data)
  //     arr.push(data.data.sprites.back_default);
  // });
  // }

  },[currentpage]);



  return (
    <>
    <div >

          <Pokemon pokemon={pokemon} />
          <Pagination
          next={nextPage ? goToNextPage : null }
          previous={lastPage ? goToLastPage : null}
          
         />

    </div>


    </>
  );
};
export default App;







    // try{ 
    //   arr = [];
    //   let response = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
    //   let data = await response.data.results
    //   setPokemon(data);
    //   const pokeName = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    //   for (let i = 0; i < data.length; i++) {
    //     const poke = pokeName.data.results[i];
    //     const pokeImage = await axios.get(poke.url);
    //     const pokeObj = {
    //       name: poke.name,
    //       image: pokeImage.data.sprites.front_default
    //     }
    //     setPokemonImage(pokeObj);

    //     arr.push(pokeObj);
    //   }

    //   console.log(pokemonImage);
    // } catch(error) {
    //    console.error(error.message);
    // }


          //  pokemon.map((pkmn) => { 
      //   return <h5 key={pkmn.url} id={pkmn.url}>{pkmn.name}</h5>;

      // })}  
      // <div>
      //   {
      //  pokemonImage.map((pkmn) => { 
          
      //   return  <img src={pkmn.image} ></img>
      //   })}  

      // </div>