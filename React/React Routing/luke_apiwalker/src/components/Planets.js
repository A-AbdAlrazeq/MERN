import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Planets = () => {
  const { id } = useParams();
  const [planetData, setPlanetData] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
        setPlanetData(response.data);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    fetchPlanetData();
  }, [id]);

  return (
    <div>
      {isError ? (
        <>
          <img
            src="https://api.time.com/wp-content/uploads/2015/12/star-wars-episode-iii-revenge-of-the-sith-obi-wan.jpg?w=800&quality=85"
            alt=""
          />
          <h3>These aren't the droids you're looking for</h3>
        </>
      ) : (
        <>
          <h1>{planetData.name}</h1>
          <p>Climate: {planetData.climate}</p>
          <p>Terrain: {planetData.terrain}</p>
          <p>Surface Water: {planetData.surface_water}</p>
          <p>Population: {planetData.population}</p>
        </>
      )}
    </div>
  );
};

export default Planets;
