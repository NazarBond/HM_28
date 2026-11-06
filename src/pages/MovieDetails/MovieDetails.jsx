import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdbApi";
import css from "./MovieDetails.module.css";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    async function getDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    getDetails();
  }, [movieId]);

  if (!movie) return <p>Завантаження деталей...</p>;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backBtn}>
        ← Назад
      </Link>

      <div className={css.movieWrapper}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.title}
          width={300}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Додаткова інформація</h3>
        <ul>
          <li>
            <Link to="cast">Акторський склад (Cast)</Link>
          </li>
          <li>
            <Link to="reviews">Огляди (Reviews)</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
