import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useMovies() {
  const [moviesItems, setMoviesItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getMoviesFromApi() {
      const data = await fetch(`http://localhost:8000/movie`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const movies = await data.json();
      console.log(movies);
      setMoviesItems(movies);
    }

    if (accessToken) {
      getMoviesFromApi();
    }
  }, [accessToken]);

  return [moviesItems, setMoviesItems];
}
