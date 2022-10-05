import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import AuthContext from "../context/AuthContext";

interface Note {
  body: string;
  id: number;
}

interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  orignal_title: string;
  orignal_laguange: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

const HomePage = () => {
  const { user, AuthTokens, LogoutUser, BEARER_TOKEN } =
    useContext(AuthContext);
  const [Notes, setNotes] = useState([]);
  const [Movies, setMovies] = useState([]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  const GetNotes = async () => {
    const url = "http://127.0.0.1:8000/api/notes/";

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(AuthTokens.access),
      },
    });

    let data = await response.json();
    if (response.ok) setNotes(data);
    else if (response.statusText === "Unauthorized") LogoutUser();
  };

  const GetTrendingMovies = async (
    media: "movie" | "tv" | "person" | "all",
    timeFrame: "day" | "week",
    page: number
  ) => {
    const url = `https://api.themoviedb.org/3/trending/${media}/${timeFrame}?page=${page}`;

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + BEARER_TOKEN,
      },
    });

    let data = await response.json();
    if (response.ok) setMovies(movies => movies.concat(data.results));
  };

  useEffect(() => {
    GetNotes();
    setMovies([]);
    GetTrendingMovies("movie", "day", 1);
    GetTrendingMovies("movie", "day", 2);
  }, []);

  return (
    <div className='homepage-container container'>
      <h1 style={{ color: "#eaeaea" }}>Movies for {user.username}</h1>
      <div className='card-container container'>
        {Movies.map((movie: Movie) => (
          <Card key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
