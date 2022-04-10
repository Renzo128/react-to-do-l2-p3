import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Pokemon from "./components/Pokemon/Pokemon";
const App = () => {
  return (
    <>
      <div>
        <Pokemon />
      </div>
    </>
  );
};
export default App;