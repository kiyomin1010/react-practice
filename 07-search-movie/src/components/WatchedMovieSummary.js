function getAverage(array) {
  return array.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

export default function WatchedMovieSummary({ watchedMovies }) {
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
