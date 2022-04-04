import './App.css';
import React, { useEffect, useState } from "react";


function App() {
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/berry/1/").then(res => res.json()).then( (result) => console.log(result)).catch(console.log("asdf"));
  }, []);
  var item = Math.random()*256;
  var item2 = Math.random()*256;
  var item3 = Math.random()*256;
  var item = Math.random()*255;
  var item2 = Math.random()*255;
  var item3 = Math.random()*255;

  document.body.style.backgroundColor  = "rgb("+item+","+item2+","+item3+")";
  console.log( "rgb("+item+","+item2+","+item3+")")

  return (
 "test"
  );
}
export default App;
