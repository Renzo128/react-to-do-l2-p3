import React from "react";
import "./PokePage.css";
import {  Link } from "react-router-dom";
import Search from "../Search/Search";


function PokePage() { // display voor iedere pokemon card





    return(
        <div>
            <Link to="/">Pokedéx</Link>
            <Search />

        </div>
    )
}

export default PokePage