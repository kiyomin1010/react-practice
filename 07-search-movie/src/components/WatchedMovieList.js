import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({
  watchedMovies,
  onDeleteWatchedMovie,
}) {
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
