import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Planets = () => {
  const { id } = useParams();
  console.log(id);
  const [apiData, setApiData] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/planets/${id}`)
      .then((response) => {
        setIsError(false);
        console.log(response.data);
        setApiData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [id]);
  if (!isError) {
    return (
      <div>
        <h1>{apiData.name}</h1>
        <p>Climate: {apiData.climate}</p>
        <p>Terrain: {apiData.terrain}</p>
        <p>Surface_Water: {apiData.surface_water}</p>
        <p>Population: {apiData.population}</p>
      </div>
    );
  } else {
    return (
      <>
        <img
          src="https://api.time.com/wp-content/uploads/2015/12/star-wars-episode-iii-revenge-of-the-sith-obi-wan.jpg?w=800&quality=85"
          alt=""
        />
        <h3>These aren't the droids you're looking for</h3>
      </>
    );
  }
};

export default Planets;
