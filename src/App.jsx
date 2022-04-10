import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Pokemon from "./components/Pokemon/Pokemon";
import PokePage from "./components/PokePage/PokePage";
const App = () => {
  return (
    <>
      <div>
{ <Routes>
   <Route path="PokePage" element={<PokePage />}></Route>
   <Route path="/" element={<Pokemon />}></Route>

</Routes> }



{/* <Pokemon/> */}


      </div>
    </>
  );
};
export default App;