import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

interface props{
  response: any | null;
}
const Search: React.FC<props> = () => {

  const [input, setInput] = useState("");
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  const submitSearch = async (e) => {
    e.preventDefault();
    let response = await getPokemonData(
      `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
    );
    await setPokemonData({
      response,
    });
  };

  const getPokemonData = async (url) => {
    // haal data op van api
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  return (
    <div>
          <header>
        <h1>Pokédex</h1>
      </header>
    <div className="form_container containerSearchPage">
      <div></div>
      <div>
      <button className="moveButtonPokedex">
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Pokedéx</Link>
      </button>
        <form
          action="submit"
          onSubmit={submitSearch}
          className="input_placement"
        >
          <input
            className="unknown"
            type="text"
            name="form"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type ID or Name of Pokémon..."
          />
        </form>

        <div className="center border">
          <h2>Afbeelding</h2>
          <div className="center">
            {Object.keys(pokemonData).length ? (
              <img
                src={pokemonData.response.sprites.front_default}
                alt="front_default"
              ></img>
            ) : (
              ""
            )}

            {Object.keys(pokemonData).length ? (
              <img
                src={pokemonData.response.sprites.back_default}
                alt="back_default"
              ></img>
            ) : (
              ""
            )}
          </div>
          <div className="center">
            {Object.keys(pokemonData).length ? (
              <img
                src={pokemonData.response.sprites.front_shiny}
                alt="front_shiny"
              ></img>
            ) : (
              ""
            )}
            {Object.keys(pokemonData).length ? (
              <img
                src={pokemonData.response.sprites.back_shiny}
                alt="back_shiny"
              ></img>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="grid movedown">
          <div className="center border">
            <h2>Naam</h2>

            {Object.keys(pokemonData).length ? (
              <div className="pokemon">
                <h3>{pokemonData.response.name} </h3>{" "}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="center border">
            <h2>Pokédex nr. </h2>
            {Object.keys(pokemonData).length ? (
              <div className="pokemon">
                <h3>#{pokemonData.response.id} </h3>{" "}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="center border">
            <h2>Abilities</h2>

            {Object.keys(pokemonData).length ? (
              <div className="pokemon nextLine">
                <h4>
                  {" "}
                  {pokemonData.response.abilities &&
                    pokemonData.response.abilities
                      .map((abilityObject) => abilityObject.ability.name)
                      .join("\n")}
                </h4>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="center border">
            <h2>Statistieken</h2>
            {Object.keys(pokemonData).length ? (
              <div className="pokemon nextLine">
                <h4>
                  {" "}
                  {Object.keys(pokemonData).length ? (
                    <div className="pokemon">
                      {pokemonData.response.stats[0].stat.name} :{" "}
                      {pokemonData.response.stats[0].base_stat}
                      <br></br>
                      {pokemonData.response.stats[1].stat.name} :{" "}
                      {pokemonData.response.stats[1].base_stat}
                      <br></br>
                      {pokemonData.response.stats[2].stat.name} :{" "}
                      {pokemonData.response.stats[2].base_stat}
                      <br></br>
                      {pokemonData.response.stats[3].stat.name} :{" "}
                      {pokemonData.response.stats[3].base_stat}
                      <br></br>
                      {pokemonData.response.stats[4].stat.name} :{" "}
                      {pokemonData.response.stats[4].base_stat}
                      <br></br>
                      {pokemonData.response.stats[5].stat.name} :{" "}
                      {pokemonData.response.stats[5].base_stat}{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </h4>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="center movedown">
          <div style={{ padding: "5px" }} className="border">
            <h2>Aanvallen</h2>

            <div className="grid movedown ">
              {Object.keys(pokemonData).length
                ? pokemonData.response.moves.map((moves) => (
                    <div className="center border" key={moves.move.name}>
                      <b>
                      {moves.move.name}
                      </b>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Search;
