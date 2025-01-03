import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedMovieSummary from "./components/WatchedMovieSummary";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // INITIAL STATE ONLY ON INITIAL RENDER, NOT EVERY RENDER
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies"));
    return watchedMovies;
  });

  // DON'T DO THIS: THIS WOULD UPDATE STATE ON EVERY RENDER
  // const [watchedMovies, setWatchedMovies] = useState(localStorage.getItem("watchedMovies"));

  function selectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function closeMovie() {
    setSelectedId(null);
  }

  function AddWatchedMovie(movie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, movie]);
  }

  function deleteWatchedMovie(id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong while fetcing movies.");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found.");

        setMovies(data.Search);
        setErrorMessage("");
      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {!isLoading && !errorMessage && (
            <MovieList movies={movies} onSelectMovie={selectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watchedMovies={watchedMovies}
              onCloseMovie={closeMovie}
              onAddWatchedMovie={AddWatchedMovie}
            />
          ) : (
            <>
              <WatchedMovieSummary watchedMovies={watchedMovies} />
              <WatchedMovieList
                watchedMovies={watchedMovies}
                onDeleteWatchedMovie={deleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
