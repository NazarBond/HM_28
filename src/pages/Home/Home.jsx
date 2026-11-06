import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/tmdbApi";
import css from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getTrending() {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    }
    getTrending();
  }, []);

  return (
    <div className={css.container}>
      <h2>Trending today</h2>
      {loading && <p>Завантаження...</p>}
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
