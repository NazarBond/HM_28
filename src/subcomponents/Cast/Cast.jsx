import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdbApi";
import css from "./Cast.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  if (loading) return <p>Завантаження акторського складу...</p>;
  if (!cast || cast.length === 0)
    return <p>Немає інформації про акторський склад.</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Photo"
            }
            alt={actor.name}
            width={100}
          />
          <p>
            <b>{actor.name}</b>
          </p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
