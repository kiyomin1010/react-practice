import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function getAverage(array) {
  return array.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);

  const avgImdbRating = getAverage(
    watchedMovies.map((watched) => watched.imdbRating)
  );
  const avgUserRating = getAverage(
    watchedMovies.map((watched) => watched.userRating)
  );
  const avgRuntime = getAverage(
    watchedMovies.map((watched) => watched.runtime)
  );

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span>🎬</span>
          <h1>SearchMovie</h1>
        </div>
        <input className="search" type="text" placeholder="Search movies..." />
        <p className="num-results">Found X results</p>
      </nav>

      <main className="main">
        <div className="box">
          <button className="btn-toggle">+</button>
          <ul className="list">
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="box">
          <button className="btn-toggle">+</button>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watchedMovies.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}/10</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}/10</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>
          <ul className="list">
            {watchedMovies.map((watched) => (
              <li key={watched.imdbID}>
                <img src={watched.Poster} alt={`${watched.Title} poster`} />
                <h3>{watched.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{watched.imdbRating}/10</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{watched.userRating}/10</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{watched.runtime} min</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
