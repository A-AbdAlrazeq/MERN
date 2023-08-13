import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const People = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  const [homeworld, setHomeworld] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        setApiData(response.data);

        const homeworldRes = await axios.get(response.data.homeworld);
        setHomeworld(homeworldRes.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    fetchPersonData();
  }, [id]);

  return (
    <div>
      {!isError ? (
        <>
          <h1>{apiData.name}</h1>
          <p>Height: {apiData.height}</p>
          <p>Hair Color: {apiData.hair_color}</p>
          <p>Eye Color: {apiData.eye_color}</p>
          <p>Skin Color: {apiData.skin_color}</p>
          {homeworld.name ? (
            <>
              <p>Homeworld: {homeworld.name}</p>
              <Link to={`/planets/${homeworld.url.split("/")[5]}`}>
                homeworld
              </Link>
            </>
          ) : (
            <p>Homeworld: Loading...</p>
          )}
        </>
      ) : (
        <>
          <img
            src="https://api.time.com/wp-content/uploads/2015/12/star-wars-episode-iii-revenge-of-the-sith-obi-wan.jpg?w=800&quality=85"
            alt=""
          />
          <h3>These aren't the droids you're looking for</h3>
        </>
      )}
    </div>
  );
};

export default People;
