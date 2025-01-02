import { useState, useEffect } from "react";
import StarRating from "./StarRating";

function getAverage(array) {
  return array.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong while fetcing movies.");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found.");

        setMovies(data.Search);
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
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
  }, [query]);

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

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span>🎬</span>
      <h1>SearchMovie</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔{message}⛔</span>
    </p>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => {
        onSelectMovie(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({
  selectedId,
  watchedMovies,
  onCloseMovie,
  onAddWatchedMovie,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  // const watchedUserRating = watchedMovies.find(
  //   (movie) => movie.imdbID === selectedId
  // )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  function addWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: title,
      year: year,
      poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: userRating,
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
          );

          if (!res.ok)
            throw new Error(
              "Something went wrong while fetcing movie details."
            );

          const data = await res.json();

          if (data.Response === "False")
            throw new Error("Movie details not found.");

          setMovieDetails(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie | ${title}`;

      return function () {
        document.title = "SearchMovie";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                IMDB Rating: <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addWatchedMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You've already watched and rated this movie.</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Actors: {actors}</p>
            <p>Director: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedMovieSummary({ watchedMovies }) {
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
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watchedMovies, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watchedMovies?.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => {
            onDeleteWatchedMovie(movie.imdbID);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
}
