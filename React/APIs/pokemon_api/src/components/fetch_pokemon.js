import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchPokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  /* useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []); */

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then((response) => {
        setPokemonList(response.data.results);
      });
  }, []);
  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default FetchPokemon;
