import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Pokemon from "./components/Pokemon/Pokemon";
import PokePage from "./components/PokePage/PokePage";
const App = () => {
  return (
    <>
      <div>
        {
          <Routes>
            <Route path="PokePage" element={<PokePage />}></Route>
            <Route path="/" element={<Pokemon />}></Route>
          </Routes>
        }
      </div>
    </>
  );
};
export default App;
