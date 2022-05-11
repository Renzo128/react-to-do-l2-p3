import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Pokemon from "./components/Pokemon/Pokemon";
import Search from "./components/Search/Search.tsx";
const App = () => {
  return (
    <>
      <div>
        {
          <Routes>
            <Route path="PokePage" element={<Search />}></Route>
            <Route path="/" element={<Pokemon />}></Route>
          </Routes>
        }
      </div>
    </>
  );
};
export default App;
