import React, { useState, useEffect } from "react";

const Fetch_Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
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
export default Fetch_Pokemon;
