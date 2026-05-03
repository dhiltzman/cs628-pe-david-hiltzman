import React, { useState } from "react";
import "./styles.css";

const movies = [
  { title: "Inception", genre: "Sci-Fi", releaseYear: 2010 },
  { title: "The Dark Knight", genre: "Action", releaseYear: 2008 },
  { title: "Interstellar", genre: "Sci-Fi", releaseYear: 2014 },
  { title: "Parasite", genre: "Thriller", releaseYear: 2019 },
  { title: "The Godfather", genre: "Drama", releaseYear: 1972 },
  { title: "Pulp Fiction", genre: "Thriller", releaseYear: 1994 },
  { title: "Get Out", genre: "Horror", releaseYear: 2017 },
  { title: "Mad Max: Fury Road", genre: "Action", releaseYear: 2015 },
  { title: "Arrival", genre: "Sci-Fi", releaseYear: 2016 },
  { title: "Whiplash", genre: "Drama", releaseYear: 2014 },
];

const uniqueGenres = ["All Genres", ...new Set(movies.map((m) => m.genre))];

export default function MovieList() {
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  const filtered =
    selectedGenre === "All Genres"
      ? movies
      : movies.filter((m) => m.genre === selectedGenre);

  const handleMovieClick = (title) => {
    alert(title);
  };

  return (
    <div className="ml-wrapper">
      <header className="ml-header">
        <h1>Movie List</h1>
        <p className="ml-subtitle">Your curated film collection</p>
      </header>

      <div className="ml-controls">
        <label className="ml-label" htmlFor="genre-select">
          Filter by Genre
        </label>
        <select
          id="genre-select"
          className="ml-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <ul className="ml-list">
        {filtered.map((movie) => (
          <li
            key={movie.title}
            className="ml-card"
            onClick={() => handleMovieClick(movie.title)}
          >
            <div className="ml-card-year">{movie.releaseYear}</div>
            <div className="ml-card-info">
              <h2 className="ml-card-title">{movie.title}</h2>
              <span className="ml-card-genre">{movie.genre}</span>
            </div>
            <div className="ml-card-arrow">&#8594;</div>
          </li>
        ))}
      </ul>

      <p className="ml-count">
        {filtered.length} film{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}